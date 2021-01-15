import { RootState } from "../../src/shared/redux/store"

export default (content: string, materialStyles: string, state: RootState, csrfToken: string) => {
    return `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="google-signin-client_id" content="805207857372-mvidod983ikggvreggm255q90spc06e4.apps.googleusercontent.com">
            <meta name="google-signin-cookiepolicy" content="single_host_origin">
            <meta name="google-signin-scope" content="profile email">
            <style id="jss-server-side">${materialStyles}</style>
            <link rel="icon" href="static/img/favicon.ico">
            <title>Suebot Management Console</title>
        </head>
        <body>
            <div id="root">${content}</div>
            <script>
                window.INITIAL_STATE = ${JSON.stringify(state)}
                window._csrf = "${csrfToken}"
            </script>
            <script type="text/javascript" charset="utf-8" src="static/js/bundle.js"></script>
        </body>
    </html>
    `
}
