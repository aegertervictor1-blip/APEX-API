# APEX API — envoi automatique des mails de confirmation (Vercel)

Fonction serverless qui envoie un mail de confirmation (design APEX) au client
dès qu'il réserve, + une notification à toi. Hébergée **gratuitement sur Vercel**,
disponible en permanence, sans mise en veille. Le mot de passe Gmail reste
**côté serveur** (variable Vercel), jamais dans le site public.

## Structure
```
api/reservation.js   -> POST : envoie les mails (le cœur)
api/index.js         -> GET  : route de santé ("APEX API OK")
emailTemplate.js     -> le mail HTML APEX
package.json         -> dépendance nodemailer
```

---

## 🔐 ÉTAPE 0 — Sécurité (à faire en premier)

1. https://myaccount.google.com/apppasswords
2. **Supprime** l'ancien mot de passe d'application (il a fuité dans un chat).
3. **Crée-en un nouveau** ("APEX API") → 16 lettres → tu les colleras **sans espaces**.
4. Ce mot de passe ne va **que** dans Vercel (étape 3). Jamais dans le code.

---

## 💻 ÉTAPE 1 — Mettre à jour GitHub

Le code a changé (passage en serverless). Dans le Terminal, depuis `apex-api/` :

```bash
git add .
git commit -m "Version serverless pour Vercel"
git push
```

---

## ▲ ÉTAPE 2 — Déployer sur Vercel

1. Va sur https://vercel.com → **Sign up / Log in with GitHub**.
2. **Add New… → Project** → importe le dépôt **APEX-API**.
3. Ne touche à rien (pas de build à configurer) → clique **Deploy**.

Vercel détecte tout seul le dossier `api/` et crée les endpoints.

---

## 🔑 ÉTAPE 3 — Mettre tes secrets dans Vercel (JAMAIS dans le code)

Projet Vercel → **Settings → Environment Variables** → ajoute :

| Nom | Valeur |
|-----|--------|
| `GMAIL_USER` | `aegertervictor1@gmail.com` |
| `GMAIL_APP_PASSWORD` | ton **nouveau** mot de passe d'appli (16 lettres, sans espaces) |
| `OWNER_EMAIL` | `aegertervictor1@gmail.com` |
| `ALLOWED_ORIGIN` | `*` (tu mettras l'URL de ton site plus tard) |

Puis onglet **Deployments → … → Redeploy** pour que les variables soient prises en compte.

---

## 🌐 ÉTAPE 4 — Ton URL d'API

Vercel te donne une URL du type :
```
https://apex-api.vercel.app
```
- Test santé : ouvre `https://apex-api.vercel.app/api` → tu dois voir **"APEX API OK"**. ✅
- L'endpoint de réservation est : `https://apex-api.vercel.app/api/reservation`

---

## 🔗 ÉTAPE 5 — Brancher le site sur l'API

Dans le formulaire d'inscription du site :

```html
<script>
async function reserverApex(e) {
  e.preventDefault();
  const payload = {
    prenom:   document.querySelector("#prenom").value,
    email:    document.querySelector("#email").value,
    formule:  document.querySelector("#formule").value,   // ex. "Standard 499 €"
    manche:   document.querySelector("#manche").value,    // ex. "Manche 1 - CKB Autoreille"
    equipage: document.querySelector("#equipage").value,  // ex. "2 pilotes"
    montant:  document.querySelector("#montant").value    // ex. "499"
  };
  const r = await fetch("https://apex-api.vercel.app/api/reservation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await r.json();
  if (data.ok) alert("Réservation confirmée ! Vérifie tes mails 🏁 (réf " + data.reference + ")");
  else alert("Oups : " + (data.error || "réessaie plus tard"));
}
</script>
```

> Quand ton site aura une URL publique, remplace `ALLOWED_ORIGIN=*`
> par cette URL dans Vercel (plus sécurisé), puis Redeploy.

---

## 🧪 (Optionnel) Tester l'endpoint

```bash
curl -X POST https://apex-api.vercel.app/api/reservation \
  -H "Content-Type: application/json" \
  -d '{"prenom":"Victor","email":"ton-email@gmail.com","formule":"Standard 499 €","montant":"499"}'
```
Tu dois recevoir le mail de confirmation. ✅
