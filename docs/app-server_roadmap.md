# Backend Roadmap – Today Workforce

Acest document descrie planul de dezvoltare backend pentru aplicația Today Workforce, marcând ce este deja finalizat și ce urmează opțional sau recomandat pentru scalabilitate, securitate și mentenabilitate.

---

## ✅ Finalizat

### 🔐 Autentificare & autorizare

- [x] Autentificare JWT cu login/register
- [x] Middleware pentru extragerea utilizatorului din token
- [x] Protejare acces bazat pe roluri (admin, recruiter, candidate)

### 👤 User management

- [x] Model `User`
- [x] Înregistrare utilizator cu rol
- [x] Login, validare, returnare token + date utilizator

### 🧑‍💼 Candidate

- [x] Model `Candidate`
- [x] Legare userId → candidate
- [x] CV upload + cvUrl
- [x] Resolvere candidate (create, getAll, getByUser etc.)

### 🏢 Company

- [x] Model `Company`
- [x] Legare userId → company
- [x] Resolvere pentru create/get etc.

### 💼 Joburi

- [x] Model `Job`
- [x] Creare job de către recruiter/admin
- [x] Listare, filtrare, getById, getByCompany

### 📝 Aplicații

- [x] Model `Application`
- [x] Aplicare la job de către candidat
- [x] Actualizare status (admin/recruiter)
- [x] Get by job / candidate / all

### ⭐ Bookmarks

- [x] Model `Bookmark`
- [x] Adăugare / ștergere bookmark job
- [x] Resolvere get by candidate

### 📂 Upload CV

- [x] Endpoint `POST /api/upload`
- [x] Salvare fișier în `/uploads`
- [x] Legare la `cvUrl` în modelul `Candidate`

### 🧪 Validare input

- [x] Schema Zod pentru toate mutațiile
- [x] Utilizare `safeParse` + helper `validateAgainstSchema`

### 🗂 Structurare modulară

- [x] Validators, models, resolvers pe entitate
- [x] Utilitare generale: auth.ts, validation.ts

---

## 🔜 Imbunatatiri (next steps)

### 📄 Pagination & filtering

- [ ] Paginare pentru: getJobs, getCandidates, getApplications
- [ ] Sortare și filtrare după status/job/location

### 🔍 Protecție suplimentară

- [ ] Validare strictă ca doar compania care a creat jobul să vadă aplicațiile aferente
- [ ] Validare ca userul logat nu aplică de 2x la același job

### 📑 Logs / debug

- [ ] Integrare Winston pentru loguri backend (info, warnings, errors)
- [ ] Loguri evenimente autentificare / mutații critice

### 📬 Notificări (opțional)

- [ ] Webhooks sau email la schimbare status aplicație

### 📁 CDN / S3 pentru CV-uri (scalare)

- [ ] Mutare upload de fișiere din sistem local în S3 sau altă soluție cloud
- [ ] URL semnat, expirabil pentru securitate

---

## ❗ De revalidat la frontend

- [ ] Toate mutațiile care implică autentificare să verifice token + role
- [ ] Header `Authorization: Bearer <token>` să fie trimis corect

---

## 🧾 Observație

Acest roadmap este actualizat în funcție de progresul real din repo. Dacă apare funcționalitate nouă sau modificări de business logic, vom extinde secțiunea `Imbunatatiri`.
