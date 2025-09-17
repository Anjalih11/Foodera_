# 🍴 Foodera App

Foodera is a **full-stack web application** where users can:

* Register & Login securely (with hashed passwords)
* Submit their own recipes
* View random food facts

The app is built with **HTML, CSS, JavaScript (frontend)**, **Node.js + Express (backend)**, and **MySQL (database)**.
Frontend is hosted on **GitHub Pages**, and backend is deployed on **Render** with a MySQL database hosted on **Railway**.

---

## ⚙️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript (vanilla JS, `script.js`)
* **Backend:** Node.js, Express.js
* **Database:** MySQL (hosted on Railway)
* **Deployment:**

  * Frontend → GitHub Pages
  * Backend → Render

---

## 🚀 Features

* **User Authentication:**

  * Register with username, email, and password
  * Login with password verification (bcrypt hashing)

* **Chef Recipes:**

  * Users can submit recipes with name and details
  * Stored in the MySQL `recipes` table

* **Food Facts:**

  * Random fact is fetched from `food_facts` table
  * Shown dynamically on the frontend

---

## 📂 Project Structure

```
Foodera_/
├── frontend/
│   ├── index.html        # Main UI
│   ├── script.js         # Handles register, login, recipe & fact fetch
│   ├── style.css         # Styling
└── backend/
    ├── server.js         # Express server with routes
    ├── package.json      # Dependencies
    └── .env              # DB credentials (not pushed to GitHub)
```

---

## 🗄️ Database Setup (MySQL on Railway)

Created tables:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  recipe TEXT NOT NULL
);

CREATE TABLE food_facts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fact TEXT NOT NULL
);
```

---

## 🔑 Backend Routes (Express + MySQL)

* **POST /register** → Create new user (hashed password)
* **POST /login** → Validate user login
* **POST /ask-chef** → Save recipe in DB
* **POST /add-fact** → Add food fact in DB
* **GET /food-facts** → Return random food fact

---

## 🖥️ Frontend (script.js)

* Shows Register & Login modals
* Handles form submissions with `fetch()` calls to backend:

  ```javascript
  const res = await fetch("https://pleasant-enchantment.onrender.com/register", {...});
  const res = await fetch("https://pleasant-enchantment.onrender.com/login", {...});
  const res = await fetch("https://pleasant-enchantment.onrender.com/ask-chef", {...});
  const res = await fetch("https://pleasant-enchantment.onrender.com/food-facts");
  ```
* Dynamically updates UI (login/logout buttons, recipe confirmation, random fact display)

---

## 🌍 Deployment

* **Backend:**

  * Hosted on Render with `.env` variables set (`DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT`)
  * Runs `npm install && node server.js`

* **Frontend:**

  * Hosted on GitHub Pages → `/frontend` folder
  * All `fetch()` URLs updated to Render backend domain

---

✅ Final Result: A **working full-stack food app** where users can register, login, add recipes, and explore food facts!

