import {instance, ResponseType} from "./instans-api";


type dataLoginType = {
    email:string
    password:string
    rememberMe:boolean
}

export const authApi = {
    login(data:dataLoginType){
        return instance.post<ResponseType<{userId:number}>>("/auth/login", data)
    },
}