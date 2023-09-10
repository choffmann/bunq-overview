export interface BunqApiResponse {
    Response: object[]
    Error?: {
        error_description: string,
        error_description_translated: string
    }
}