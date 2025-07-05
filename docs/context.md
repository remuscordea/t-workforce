# Today Workforce – Context Proiect

## Scopul aplicației

Today Workforce este o platformă de recrutare care conectează candidați cu angajatori și recrutori. Aplicația este organizată pe patru roluri majore:

- **Candidat**: crearea contului, completarea profilului, încărcarea CV-ului, aplicarea la joburi, urmărirea statusului aplicațiilor
- **Client (Companie)**: crearea contului de firmă, adăugarea de joburi, vizualizarea aplicațiilor primite
- **Recruiter**: intake de joburi, gestionarea portofoliului de clienți, pipeline de candidați, atribuirea acestora
- **Admin**: dashboard general, moderare utilizatori/conținut, control global

## Backend implementat (MVP)

- Node.js cu Express.js
- Apollo Server (GraphQL)
- MongoDB + Mongoose
- JWT Auth și roluri: `admin`, `recruiter`, `client`, `candidate`
- Validare input cu Zod
- Upload CV (fișiere PDF/DOC)
- Structura de foldere organizată: `models/`, `resolvers/`, `typeDefs/`, `validators/`, `utils/`
- Funcționalități acoperite:
  - autentificare (register/login)
  - profil user, companie, candidat
  - crearea/aplicarea joburilor
  - bookmark joburi
  - listare aplicații

## Frontend planificat

- Framework: React
- Tehnologii: TypeScript, MUI (Minimal Free Theme), GraphQL Apollo Client
- Structura de foldere: //TODO
- Paginile planificate:
  - Login / Register
  - Dashboard (diferit pentru fiecare rol)
  - Profil utilizator (editabil)
  - Listă joburi (cu filtre)
  - Pagina unui job + aplicație
  - Listă aplicații (per candidat și per companie)
  - Upload CV pentru useri logati cu rol de 'candidate'

## Obiectiv client

Soluție web de recrutare personalizată, modernă, care permite interacțiunea eficientă între candidați și companii, cu funcționalități MVP complete și opțiuni de extindere ulterioară.
