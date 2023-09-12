export interface BunqApiResponse {
    Response: object[]
    Error?: ErrorResponse
    Pagination?: Pagination
}

export interface ErrorResponse {
    error_description: string,
    error_description_translated: string
}

export interface Pagination {
    future_url: string
    newer_url: any
    older_url: any
}