export const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.FRONTEND_STORE_URL || "",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
