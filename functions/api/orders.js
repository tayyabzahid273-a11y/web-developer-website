export async function onRequest(context) {
  const { request } = context;
  
  // Vercel backend ka URL
  const backendUrl = "https://web-developer-website-gvw9.vercel.app/api/orders";

  // Request ko Vercel ki taraf forward karein
  const modifiedRequest = new Request(backendUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  const response = await fetch(modifiedRequest);
  
  // CORS headers add karein taake browser block na kare
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  newHeaders.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
}