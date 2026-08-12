// Petite route de santé : GET /api  ->  "APEX API OK"
export default function handler(_req, res) {
  res.status(200).send("APEX API OK");
}
