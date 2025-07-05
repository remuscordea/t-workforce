# TWF – Platformă Web de Recrutare

Aceasta este o aplicație web completă pentru recrutare, care conectează candidați, companii și recrutori într-un ecosistem modern, intuitiv și scalabil.

## 📝 Funcționalități cheie

- Autentificare și înregistrare cu JWT
- Gestionare utilizatori: candidați, recrutori, companii, admini
- Creare și vizualizare joburi
- Aplicare la joburi și gestionare aplicații
- Salvare joburi (bookmarks)
- Upload CV în format PDF, DOC sau DOCX
- Protecție cu roluri (admin / recruiter / candidate)
- Validare date cu `zod`
- API GraphQL structurat
- UI responsiv (frontend în lucru)

---

## 📂 Structura proiectului

```
├── app-client        # Frontend (React, MUI)
├── app-server        # Backend (Node.js, Express, MongoDB, GraphQL)
├── docs              # Documentație proiect
│   ├── context.md
│   ├── graphql-schema.md
│   ├── app-server_roadmap.md
│   └── app-client_roadmap.md
├── uploads           # Fișiere CV încărcate
└── README.md         # Readme general (this)
```

---

## 🚀 Instalare & rulare locală

### 1. Clonează proiectul

```bash
git clone https://github.com/<user>/today-workforce.git
cd today-workforce
```

### 2. Rulează backend-ul

```bash
cd app-server
cp .env.example .env  # adaugă variabilele de mediu necesare
npm install
npm run dev
```

### 3. Rulează frontend-ul

```bash
cd ../app-client
cp .env.example .env
npm install
npm run dev
```

---

## 🧪 Testare API (GraphQL)

Accesează:\
[`http://localhost:4000/graphql`](http://localhost:4000/graphql) – folosește [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer) pentru testare.\
Consultă schema și exemple în [`docs/graphql-schema.md`](docs/graphql-schema.md)

---

## 🛠 Tehnologii principale

- **Backend:** Node.js, Express, MongoDB, GraphQL (Apollo Server), Zod
- **Frontend:** React, TypeScript, Material UI, Template: Minimal UI Free (https://github.com/minimal-ui-kit/material-kit-react)
- **Autentificare:** JWT
- **Upload fișiere:** Multer
- **Validare input:** Zod
- **Stilizare & UI:** MUI (cu Minimal UI Template)

---

## 📄 Documentație

Vezi folderul [`docs/`](docs/) pentru:

- Contextul aplicației (`context.md`)
- Schema GraphQL (`graphql-schema.md`)
- Roadmap-ul dezvoltării aplicatiei de frontend (`app-client_roadmap.md`)
- Roadmap-ul dezvoltării aplicatiei de backend (`app-server_roadmap.md`)

---

## ✅ Status

✅ MVP backend finalizat\
🛠 Frontend în curs de dezvoltare (`app-client`)\
🔜 Integrare funcțională completă

---
