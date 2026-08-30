# API Endpoints — Fitness App

## Autentificare
- `POST /api/register/` — înregistrare user nou
- `POST /api/token/` — login (returnează access + refresh token)
- `POST /api/token/refresh/` — reîmprospătare access token

## Exerciții
- `GET /api/exercises/` — listă exerciții
- `POST /api/exercises/` — creare exercițiu
- `GET /api/exercises/{id}/` — detalii exercițiu
- `PUT /api/exercises/{id}/` — actualizare completă
- `PATCH /api/exercises/{id}/` — actualizare parțială
- `DELETE /api/exercises/{id}/` — ștergere exercițiu

## Antrenamente (Workouts)
- `GET /api/workouts/` — lista antrenamentelor userului curent
- `POST /api/workouts/` — creare antrenament nou
- `GET /api/workouts/{id}/` — detalii antrenament (include seturile)
- `PUT /api/workouts/{id}/` — actualizare completă
- `PATCH /api/workouts/{id}/` — actualizare parțială
- `DELETE /api/workouts/{id}/` — ștergere antrenament

## Seturi (Workout Sets)
- `GET /api/workout-sets/` — lista seturilor userului curent
- `POST /api/workout-sets/` — creare set nou
- `GET /api/workout-sets/{id}/` — detalii set
- `PUT /api/workout-sets/{id}/` — actualizare completă
- `PATCH /api/workout-sets/{id}/` — actualizare parțială
- `DELETE /api/workout-sets/{id}/` — ștergere set

## Statistici
- `GET /api/progress/` — total antrenamente + grupare pe dată

## Documentație interactivă
- `GET /api/docs/` — Swagger UI
- `GET /api/schema/` — schema OpenAPI brută (JSON)

## Autentificare pe request-uri protejate
Toate endpoint-urile (exceptând `register`, `token`, `token/refresh`) necesită header:
