import {MonetaryAccountDto} from "../../model-api-client/bunq/MonetaryAccountDto.ts";
import {Payment} from "../../model-api-client/bunq/PaymentDto.ts";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

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