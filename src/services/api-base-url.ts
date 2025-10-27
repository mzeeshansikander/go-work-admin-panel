const IS_LIVE = true;

// Local URL

const LOCAL_URL = "http://localhost:8000" as string;

// Deployed URL
const LIVE_URL = "https://staging-api-gowork.zenkoders.com/" as string;

export const BASE_URL = IS_LIVE ? LIVE_URL : LOCAL_URL;

export const URL = {};
