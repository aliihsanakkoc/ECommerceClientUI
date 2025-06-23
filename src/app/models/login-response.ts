import { AccessToken } from "./access-token";

export interface LoginResponse{
    accessToken:AccessToken,
    requiredAuthenticatorType:string
}