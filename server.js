import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { confirmationEmail } from "./emailTemplate.js";

const app = express();
app.use(express.json());

// --- CORS : autorise ton site à appeler l'API ---
// Mets l'URL de ton site dans la variable ALLOWED_ORIGIN sur Railway.
// Par défaut on autorise tout (pratique au début, à restreindre ensuite).
const allowed = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: allowed }));

// --- Transport Gmail : les identifiants viennent des variables d'env Railway ---
// GMAIL_USER            = ton adresse Gmail (ex. aegertervictor1@gmail.com)
// GMAIL_APP_PASSWORD    = ton mot de passe d'application (16 lettres, SANS espaces)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Où sont envoyées les notifications de nouvelle réservation (par défaut = toi)
const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.GMAIL_USER;

// Petite référence unique du type APEX-7F3K9
function makeRef() {
  return "APEX-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

function isEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Santé (Railway ping cette route)
app.get("/", (_req, res) => res.send("APEX API OK"));

// --- Réservation ---
app.post("/api/reservation", async (req, res) => {
  try {
    const { prenom, email, formule, manche, equipage, montant } = req.body || {};

    // Validation minimale
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

    // 1) Mail de confirmation au client (design APEX)
    await transporter.sendMail({
      from: `"APEX Racing Expérience" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `✅ Réservation confirmée — APEX (${reference})`,
      html: confirmationEmail(data),
    });

    // 2) Notification à toi (le propriétaire)
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

    return res.json({ ok: true, reference });
  } catch (err) {
    console.error("Erreur envoi mail:", err);
    return res.status(500).json({ ok: false, error: "Envoi impossible pour le moment." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`APEX API en écoute sur le port ${PORT}`));
