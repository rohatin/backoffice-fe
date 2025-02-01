import { IConnection } from "backoffice-api-sdk";

export const baseConnection: IConnection = {
  host: import.meta.env.VITE_API_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY
  }
}