
# Prescripto

Prescripto is an online appointment booking application.


## 🚀 Demo

<a href='https://prescripto-by-karan.vercel.app'> 
    <img src='./demo.png'>
    </img>
</a>

## ✨ Features

- User can book an appointment
- Doctor dashboard for appointments
- Admin dashboard for adding new doctor
- doctor can make then unavailable for appointment booking
- Admin can track users / doctors


## 💻 Tech Stack

**Client:** React, TailwindCSS,

**Server:** Node, Express

**Database:** MongoDB


## 🛠️ Installation

Installation with npm

```bash
  cd backend
  npm install
  nodemon index.js
```

```bash
  cd frontend
  cd user
  npm install
  npm run dev
``` 

```bash
  cd frontend
  cd admin
  npm install
  npm run dev
```  


## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your .env file (backend)

`PORT = ...`

`DB_URL = ...`

`JWT_SECRET = ...`

`CLOUDINARY_CLOUD_NAME = ...` 

`CLOUDINARY_API_KEY = ...` 

`CLOUDINARY_API_SECRET = ...`

`ADMIN_EMAIL = ...`

`ADMIN_PASSWORD = ...`

`ADMIN_ID = ...`