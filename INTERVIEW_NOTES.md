cat > INTERVIEW_NOTES.md << 'EOF'
# Notițe pentru interviu — Fitness Tracker App

## De ce Django + React?

**Django REST Framework** — structură solidă din start (ORM, admin panel gratuit, autentificare ușor de extins). DRF face construirea unui API REST organizat și rapid (serializers, viewsets, routers), fără să reinventez logica de bază.

**React** — separare clară frontend/backend, arhitectură standard în industrie. Am putut exersa hooks, state management (Zustand) și routing pe un proiect real, nu doar tutorial.

## Decizii tehnice cheie

### JWT vs sesiuni Django clasice
Am ales JWT pentru că e standardul modern pentru API-uri consumate de aplicații SPA (Single Page App) sau mobile — e stateless (serverul nu ține evidența sesiunilor active), se potrivește natural cu arhitectura frontend/backend separate pe care am ales-o.

### PostgreSQL (Neon) vs SQLite în producție
SQLite a fost perfect pentru dezvoltare locală (zero configurare), dar nu persistă corect pe hosting-uri ca Render — sistemul de fișiere se resetează la fiecare redeploy, ceea ce ar șterge toate datele. PostgreSQL pe Neon oferă o bază de date permanentă, gratuită, separată de infrastructura de deploy.

### pipenv vs pip + requirements.txt
pipenv gestionează automat mediul virtual și generează un lockfile (`Pipfile.lock`) cu versiuni exacte — garantează reproductibilitate (mediul de pe Render/CI e identic cu cel local), spre deosebire de `requirements.txt`, care nu blochează automat versiunile transitive (dependențele dependențelor).

## Provocări tehnice reale întâmpinate

- **Device Guard (Windows) blocând executabile Python** — politica de securitate a sistemului bloca rularea directă a `.exe`-urilor din `Scripts/` (pipenv, django-admin). Soluție: rulare prin `python -m <modul>`, care ocolește problema fiindcă nu lansează un `.exe` separat, ci execută cod prin Python (deja aprobat).

- **`.env` urcat accidental pe GitHub** — am învățat diferența dintre `.gitignore` (valabil doar pentru fișiere neurmărite încă de Git) și `git rm --cached` (necesar pentru fișiere deja commise anterior). Am rotit imediat SECRET_KEY-ul expus.

- **JWT expirat fără refresh automat** — userii erau delogați brusc după 60 de minute (durata access token-ului). Am implementat un response interceptor în Axios care, la orice 401, folosește automat refresh token-ul pentru a obține un access token nou și reia cererea originală — cu o coadă de request-uri, ca să nu declanșeze refresh de mai multe ori simultan dacă mai multe cereri pică deodată.

- **Discrepanță versiune Python (local vs CI vs Render)** — pipenv verifică strict `python_version` din `Pipfile` la instalare (`--deploy`); am aliniat versiunile explicit în workflow-ul CI și în variabila `PYTHON_VERSION` pe Render.

## Ce aș face diferit la o versiune 2.0

- Rate limiting pe endpoint-urile de autentificare (protecție împotriva brute-force)
- Editare seturi existente (momentan doar creare/ștergere, fără update)
- Notificări/reminder-e pentru antrenamente programate
- Upload de poze pentru progres vizual (before/after)
- Aplicație mobilă (React Native/Expo), cu același backend

## Arhitectură pe scurt
React (Vercel) → Django REST API (Render) → PostgreSQL (Neon)