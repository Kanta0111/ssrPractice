import express, { Request, Response } from 'express';
require('dotenv').config();
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import ssrLoger from './middleware/ssrLoger';
import { StaticRouter, matchPath } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import bodyParser from 'body-parser';
import { ServerStyleSheets as MaterialStyleSheets } from '@material-ui/core/styles';
const Fetchr = require('fetchr');
import session from 'express-session';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

import BFFConst from './const';
import render from './components/HTML';
import { initializeStore } from '../src/shared/redux/store';
import longosService from './services/longosService';
import loginService from './services/loginService';
import App from '../src/shared/components/pages/App';
import routes from '../src/shared/routes/routes';
import sessionConfig from './modules/sessionConfig';
import storeTokenMiddleware from './middleware/storeTokenMiddleware';
import adminApp from './modules/firebaseAdmin';
import ssAuth from './modules/ssAuth';
import { promiseStartLogin } from '../src/shared/redux/modules/login';
import loginResponseFormatter from './modules/loginResponseFormatter';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(cookieParser()); // for csurf
app.use(csrf({ cookie: true }));

app.use(ssrLoger);
app.use(express.static(__dirname + '/public'));

app.post(BFFConst.API_ENDPOINT, storeTokenMiddleware);
app.use(BFFConst.API_ENDPOINT, Fetchr.middleware({
  responseFormatter: (req: Request, res: Response, data: any) => {
    loginResponseFormatter(req, res, data);
    return data;
  },
}));
Fetchr.registerService(longosService);
Fetchr.registerService(loginService);

app.get('*', (req: Request, res: Response) => {
    console.log("start request",req.body);
    const history = createMemoryHistory({
        initialEntries: [req.url],
        initialIndex: 0,
    })
    const store = initializeStore(history);
    const prepare = async () => {
        // From official example
        // See: https://reacttraining.com/react-router/web/guides/server-rendering
      
        // cookieにトークンがある場合はSS認証を行う
        const authPromise = async () => {
          const result = await ssAuth(req);
          console.log("afterAuth");
          if (result.isAuthed && result.userInfo) {
            await promiseStartLogin(result.userInfo, store.dispatch);
            console.log("promiseStartLogin");
          }
        }
        await authPromise();
        const authResult = store.getState().login;
        console.log("afterAuthPropmise", authResult);

        const promisses: any = [];
        // promisses.push(authPromise());
        const a = routes.some(async route => {
            const match = matchPath(req.path, route);
            if (match) promisses.push(route.loadData(store, match));
            console.log("after loadData");
            return match;
        })
        return Promise.all(promisses);
    }
    
    const materialStyles = new MaterialStyleSheets()
    const sheet = new ServerStyleSheet();
    let content = "";
    let styleTags = "";

    prepare().catch(
      (error) => { 
        console.log(error)
        res.clearCookie(BFFConst.TOKEN_COOKIE)
      }
    ).then(() => {
        console.log("start render", store.getState())
        try {
            content = renderToString(materialStyles.collect(sheet.collectStyles(
                <StaticRouter location={req.url} context={{}}>
                    <App store={store} history={history} />
                </StaticRouter>
            )));
            styleTags = sheet.getStyleTags();
        }catch (error) {
            console.log("server.tsx", error);
        } finally {
            sheet.seal();
        }
       res.send(render(content, styleTags, materialStyles.toString() ,store.getState(), req.csrfToken()));
    })
});

app.listen(
    port,
    () => {
        console.log("app is listening on port 3000")
    }
)
