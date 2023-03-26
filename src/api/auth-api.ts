import {instance, ResponseType} from "./instans-api";


export type dataLoginType = {
    email:string
    password:string
    rememberMe:boolean
}

export type dataMeType = {
    email:string
    id: number
    login:string
}

export const authApi = {
    login(data:dataLoginType){
        return instance.post<ResponseType<{userId:number}>>("/auth/login", data)
    },
    me(){
        return instance.get<ResponseType<dataMeType>>("/auth/me")
    },
    logOut(){
        return instance.delete<ResponseType>("/auth/login")
    }
}