

# SilentWatch – Phase 1 Documentation

Goal: Prepare a realistic test environment with silent UI workflow failures for future integration of the SilentWatch detection tool.

---

##  Project Overview

This is a simulation app designed to help detect silent UI failures in common user workflows: login, contact form, and checkout. At this stage, the app mimics realistic frontend behavior with a connected backend, but contains *intentional silent failures* (e.g., forms not submitting correctly) for detection later via SilentWatch.

---

## Tech Stack

* **Frontend:** React + Tailwind CSS
* **Backend:** Flask + Flask-CORS
* **Environment:** Localhost (React: `5173`, Flask: `5000`)

---

##  Project Structure

```
mainProject/
│
├── backend/
│   └── app.py               # Flask API with dummy GET & POST routes
│
└── frontend/
    ├── src/
    │   ├── App.jsx          # Integrates Login, ContactForm, and Checkout
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── ContactForm.jsx
    │   │   └── Checkout.jsx
```

---

## Workflows Implemented (With Silent Failures)

1. Login

   * Form UI is shown.
   * Submit button logs a message but **doesn't trigger any backend call**.
   * No success/error message is shown (silent failure).

2. Contact Form

   * Accepts user input.
   * Submit button logs to console only, **no fetch call or user feedback**.
   * Simulates an unnoticeable failure to submit data.

3. Checkout

   * UI displays total and payment options.
   * Button click does not communicate with backend or show result.
   * Represents a classic silent transaction failure.

---

## Backend Routes

* `GET /api/data` → Returns `{ message: "Hello from Flask backend!" }`
* `POST /api/submit` → Receives data and responds with `{ status: "success", data: ... }`

> These routes are working and tested, but none of the frontend components currently call them.


