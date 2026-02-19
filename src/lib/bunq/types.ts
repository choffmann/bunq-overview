export interface BunqTokens {
  privateKey: string;
  publicKey: string;
  installationToken: string;
  deviceId: number;
}

export interface BunqSession {
  sessionToken: string;
  userId: number;
  expiryTime: Date;
}

export interface BunqApiResponse {
  Response: object[];
  Error?: BunqErrorResponse;
  Pagination?: {
    future_url: string;
    newer_url: unknown;
    older_url: unknown;
  };
}

export interface BunqErrorResponse {
  error_description: string;
  error_description_translated: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: BunqErrorResponse;
}

export interface SessionResponse {
  Id: { id: number };
  Token: { id: number; created: string; updated: string; token: string };
  UserPerson: {
    id: number;
    session_timeout: number;
    [key: string]: unknown;
  };
}

export interface InstallationResponse {
  Token: { token: string };
}

export interface DeviceServerResponse {
  Id: { id: number };
}
