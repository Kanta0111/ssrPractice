import axios from '../modules/axiosConfig';

export type Longo = {
    text: string,
    meaning: string,
    comment: string,
};

export type Longos = Longo[];


export type updateParams = {
    id: string,
}

export type deleteParams = {
    id: string,
}

export default {
    name: 'Longos',
    read: async (req :Express.Request, resource :any, params :any, config :any, callback :any) => {
        const meta = {
            headers: {},
            statusCode: 200,
        };
        const result = await axios.get<Longos>("")
        console.log("Longos Service Get", result.data);
        callback(null, result.data, meta);
    },
    create: async (req: Express.Request, resource: any, params: any, body: Longo, config: any, callback: any) => {
        const meta = {
            headers: {},
            statusCode: 200,
        };
        const result = await axios.post<Longo>("", body);

        console.log("Longos Service Post", result.data);
        callback(null, result.data, meta);
    },
    update: async (req: Express.Request, resource: any, params: updateParams, body: any, config: any, callback: any) => {
        const meta = {
            headers: {},
            statusCode: 200,
        };

        const result = await axios.patch<Longo>("", body)
    },

    delete: async (req: Express.Request, resource: any, params: any, config: any, callback: any) => {

    },
}