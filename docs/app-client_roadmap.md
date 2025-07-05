# frontend/roadmap.md

## Etape dezvoltare frontend

### 1. Setup inițial

- [x] Creare proiect React și TypeScript
- [x] Instalare Minimal Free MUI Theme + configurare layout de bază
- [x] Integrare Apollo Client (GraphQL)
- [x] Configurare .env.local cu endpoint GraphQL

### 2. Autentificare

- [x] Layout de bază (header, meniu lateral)
- [ ] Layout de bază (footer, protecție rute)
- [x] Pagina de login
- [x] Pagina de register
- [x] Salvare JWT in localStorage + injectare in headers Apollo Client
- [ ] Redirecționare automata dupa login/register
- [ ] Context global pentru user autentificat

### 3. Pagini și rute pe roluri

- [ ] Pagina `/jobs` cu listare joburi (cu paginare)
- [ ] Pagină individuală job (`/jobs/[id]`)
- [ ] Filtrare joburi: tip, locație, companie, cuvânt cheie
- [ ] Dashboard candidat (cu joburi recomandate/aplicate)
- [ ] Dashboard companie (cu joburi postate și aplicații primite)
- [ ] Dashboard recruiter (pipeline joburi + candidați)
- [ ] Dashboard admin (moderare și statistici)

### 4. Funcții candidat

- [ ] Pagina `/profile` cu datele candidatului logat
- [ ] Completare profil + upload CV
- [ ] Buton descărcare CV
- [ ] Listare joburi + filtrare
- [ ] Aplicație la job
- [ ] Pagina `/applications` cu aplicațiile mele
- [ ] Afișare joburi salvate de utilizator (`/bookmarks`)
- [ ] Adăugare/ștergere bookmark din listă

### 5. Funcții companie

- [ ] Adăugare job nou
- [ ] Listare joburi proprii
- [ ] Vizualizare aplicații pentru joburi

### 6. Funcții recruiter

- [ ] Intake joburi
- [ ] Căutare candidați + potrivire
- [ ] Adăugare note + status aplicații

### 7. Funcții admin

- [ ] Dashboard general cu statistici
- [ ] Moderare conturi/utilizatori

### 8. Calitate și UX

- [ ] Tema dark/light
- [ ] Loader global și feedback
- [ ] Notificări (snackbar/toast)
- [ ] Validări UI coerente

### 9. Testare & deploy

- [ ] Testare locală completă pe roluri
- [ ] Deploy final (posibil Vercel / Netlify (frontend))

### Extra (opțional MVP)

- [ ] Responsive full (mobile/tablet)
- [ ] Pagina custom 404
- [ ] Redirect automat după login/logout
- [ ] Logout cu ștergere token

## 🔄 Integrare API

Toate datele sunt preluate de pe backendul `app-server` prin GraphQL:

- Queries: `me`, `getJobs`, `getApplicationsByCandidate`, etc.
- Mutations: `register`, `login`, `createApplication`, `uploadCV`, etc.
