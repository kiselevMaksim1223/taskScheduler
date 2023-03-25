import axios from "axios";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials:true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY
    }
})

export type ResponseType<T = {}> = { //дженерик тип
    fieldsErrors:string[]
    messages:string[]
    resultCode:number
    data: T
}