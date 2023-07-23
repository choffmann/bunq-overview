import {MonetaryAccountDto} from "../model/MonetaryAccountDto.ts";
import {Payment} from "../model/PaymentDto.ts";

const BASE_URL = "http://localhost:8080/api"

export function fetchBunqAccount(): Promise<MonetaryAccountDto> {
    return fetch(`${BASE_URL}/account`)
        .then((res: Response) => res.json())
}

export function fetchBunqPayments(): Promise<Payment[]> {
    return fetch(`${BASE_URL}/payments`)
        .then((res: Response) => res.json())
}

export function fetchBunqAttachment(uuid: string, contentType: string): Promise<Blob> {
    return fetch(`${BASE_URL}/attachment/${uuid}`, {
        headers: {
            "Content-Type": contentType
        }
    })
        .then((res: Response) => res.arrayBuffer())
        .then((buffer: ArrayBuffer) => new Blob([buffer], {type: contentType}))
}