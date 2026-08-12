# APEX API — envoi automatique des mails de confirmation

Petit serveur qui envoie un mail de confirmation (design APEX) au client
dès qu'il réserve, + une notification à toi. Le mot de passe Gmail reste
**côté serveur** (variable Railway), jamais dans le site public.

---

## 🔐 ÉTAPE 0 — Sécurité (à faire en premier)

1. Va sur https://myaccount.google.com/apppasswords
2. **Supprime** l'ancien mot de passe d'application (il a fuité dans un chat).
3. **Crée-en un nouveau** (nom : "APEX API"). Google donne 16 lettres type
   `abcd efgh ijkl mnop` → tu les colleras **sans les espaces** : `abcdefghijklmnop`.
4. Ce nouveau mot de passe ne va **que** dans Railway (étape 3). Jamais dans le code, jamais renvoyé dans un chat.

---

## 💻 ÉTAPE 1 — Pousser le projet sur GitHub

Ouvre un terminal dans ce dossier `apex-api/` :

```bash
git init
git add .
git commit -m "APEX API - envoi mail de confirmation"
```

Crée le dépôt sur GitHub (via le site github.com → New repository → nom `apex-api`,
laisse-le **vide**, pas de README). Puis relie et pousse :

```bash
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/apex-api.git
git push -u origin main
```

> `.gitignore` empêche déjà `node_modules/` et `.env` de partir sur GitHub. ✅

---

## 🚂 ÉTAPE 2 — Déployer sur Railway

1. Va sur https://railway.app → connecte-toi avec GitHub.
2. **New Project** → **Deploy from GitHub repo** → choisis `apex-api`.
3. Railway détecte Node.js et lance `npm start` tout seul.

---

## 🔑 ÉTAPE 3 — Mettre tes secrets dans Railway (JAMAIS dans le code)

Dans ton projet Railway → onglet **Variables** → ajoute :

| Nom | Valeur |
|-----|--------|
| `GMAIL_USER` | `aegertervictor1@gmail.com` |
| `GMAIL_APP_PASSWORD` | ton **nouveau** mot de passe d'appli (16 lettres, sans espaces) |
| `OWNER_EMAIL` | `aegertervictor1@gmail.com` |
| `ALLOWED_ORIGIN` | `*` (tu remplaceras par l'URL de ton site plus tard) |

Railway redéploie automatiquement après l'ajout des variables.

---

## 🌐 ÉTAPE 4 — Récupérer l'URL publique de l'API

Dans Railway → onglet **Settings** → **Networking** → **Generate Domain**.
Tu obtiens une URL du type :

```
https://apex-api-production.up.railway.app
```

Teste-la : ouvre-la dans le navigateur → tu dois voir **"APEX API OK"**. ✅

---

## 🔗 ÉTAPE 5 — Brancher le site sur l'API

Dans le formulaire d'inscription du site, remplace l'envoi par un appel à l'API.
Exemple minimal (à adapter à tes champs) :

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
  const r = await fetch("https://TON-URL-RAILWAY.up.railway.app/api/reservation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await r.json();
  if (data.ok) {
    alert("Réservation confirmée ! Vérifie tes mails 🏁 (réf " + data.reference + ")");
  } else {
    alert("Oups : " + (data.error || "réessaie plus tard"));
  }
}
</script>
```

> Quand ton site aura une URL publique, remplace `ALLOWED_ORIGIN=*` par cette URL
> dans Railway (plus sécurisé).

---

## 🧪 (Optionnel) Tester en local avant de déployer

```bash
npm install
cp .env.example .env      # puis colle ton mot de passe dans .env
npm start
```

Puis dans un autre terminal :

```bash
curl -X POST http://localhost:3000/api/reservation \
  -H "Content-Type: application/json" \
  -d '{"prenom":"Victor","email":"ton-email@gmail.com","formule":"Standard 499 €","montant":"499"}'
```

Tu dois recevoir le mail de confirmation. ✅
