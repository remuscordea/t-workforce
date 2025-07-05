# frontend/roadmap.md

## Etape dezvoltare frontend

### 1. Setup inițial
- [x] Creare proiect Next.js cu App Router și TypeScript
- [x] Instalare Berry MUI Theme + configurare layout de bază
- [x] Integrare Apollo Client (GraphQL)
- [x] Configurare .env.local cu endpoint GraphQL

### 2. Autentificare
- [x] Pagina de login
- [x] Pagina de register
- [x] Salvare JWT in localStorage + injectare in headers Apollo Client
- [ ] Redirecționare automata dupa login/register
- [ ] Context global pentru user autentificat

### 3. Pagini și rute pe roluri
- [ ] Dashboard candidat (cu joburi recomandate/aplicate)
- [ ] Dashboard companie (cu joburi postate și aplicații primite)
- [ ] Dashboard recruiter (pipeline joburi + candidați)
- [ ] Dashboard admin (moderare și statistici)

### 4. Funcții candidat
- [ ] Completare profil + upload CV
- [ ] Listare joburi + filtrare
- [ ] Aplicație la job
- [ ] Vizualizare aplicații proprii

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
- [ ] Deploy pe Vercel / Netlify (frontend)

