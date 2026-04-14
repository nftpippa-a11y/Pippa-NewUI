export const PI_NETWORK_CONFIG = {
  SDK_URL: "https://sdk.minepi.com/pi-sdk.js",
  SANDBOX: true,
} as const;

export const BACKEND_CONFIG = {
  BLOCKCHAIN_BASE_URL: "https://api.testnet.minepi.com",
} as const;

export const PI_BLOCKCHAIN_URLS = {
  GET_TRANSACTION: (txid: string) =>
    `${BACKEND_CONFIG.BLOCKCHAIN_BASE_URL}/transactions/${txid}/effects`,
} as const;
