import { signal } from "@angular/core";
import { AccessToken } from "./models/access-token";

export const accessTokenSignal = signal<AccessToken|null>(getAccessTokenFromSession());
function getAccessTokenFromSession():AccessToken|null{
    if(typeof window === 'undefined') return null;
    const json = sessionStorage.getItem("accessToken");
    return json ? JSON.parse(json) as AccessToken : null;
}