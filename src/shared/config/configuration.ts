export const configuration = () => ({
  PORT: parseInt(process.env.PORT, 10) || 8080,
  URL_API: process.env.URL_API,
  MONGO_DB_URI: process.env.MONGO_DB_URI,

  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_APP_NAME: process.env.FIREBASE_APP_NAME,
});
