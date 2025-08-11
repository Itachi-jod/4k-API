// api/endpoint.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).json({ error: "Missing 'url' query parameter" });
    }

    // Upscale API endpoint
    const upscaleAPI = `https://kaiz-apis.gleeze.com/api/upscale?imageUrl=${encodeURIComponent(imageUrl)}&apikey=7eac9dce-b646-4ad1-8148-5b58eddaa2cc`;

    // Fetch the image from the upscale API
    const response = await fetch(upscaleAPI);
    if (!response.ok) {
      throw new Error(`Upscale API Error: ${response.statusText}`);
    }

    // Stream the image directly to the client
    res.setHeader("Content-Type", response.headers.get("content-type") || "image/jpeg");
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
