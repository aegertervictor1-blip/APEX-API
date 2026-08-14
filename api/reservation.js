// Fonction serverless Vercel : POST /api/reservation
// Envoie le mail de confirmation au client + une notif au propriétaire.
// Les identifiants Gmail viennent des variables d'environnement Vercel.
import nodemailer from "nodemailer";
import { confirmationEmail } from "../emailTemplate.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.GMAIL_USER;

function makeRef() {
  return "APEX-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}
function isEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default async function handler(req, res) {
  // CORS : autorise ton site à appeler l'API
  const origin = process.env.ALLOWED_ORIGIN || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, error: "Méthode non autorisée." });

  try {
    const { prenom, email, formule, manche, equipage, montant } = req.body || {};

    if (!prenom || !isEmail(email) || !formule) {
      return res.status(400).json({ ok: false, error: "Champs manquants ou email invalide." });
    }

    const reference = makeRef();
    const data = {
      prenom,
      formule,
      manche: manche || "À définir",
      equipage: equipage || "À compléter",
      montant: montant || "—",
      reference,
    };

    // 1) Confirmation au client (design APEX)
    await transporter.sendMail({
      from: `"APEX Racing Expérience" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `✅ Réservation confirmée — APEX (${reference})`,
      html: confirmationEmail(data),
    });

    // 2) Notification à toi
    await transporter.sendMail({
      from: `"APEX Réservations" <${process.env.GMAIL_USER}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `🏁 Nouvelle réservation — ${prenom} (${formule})`,
      text:
        `Nouvelle réservation APEX\n\n` +
        `Réf : ${reference}\nPrénom : ${prenom}\nEmail : ${email}\n` +
        `Formule : ${formule}\nManche : ${data.manche}\n` +
        `Équipage : ${data.equipage}\nMontant : ${data.montant} €\n`,
    });

    return res.status(200).json({ ok: true, reference });
  } catch (err) {
    console.error("Erreur envoi mail:", err);
    return res.status(500).json({ ok: false, error: "Envoi impossible pour le moment." });
  }
}
