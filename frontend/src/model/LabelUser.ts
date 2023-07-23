import {Avatar} from "./Avatar.ts";

export interface LabelUser {
    uuid?: string;
    display_name: string;
    country: string;
    public_nick_name: string;
    avatar?: Avatar;
}