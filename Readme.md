# 💬 FastAPI WebSocket Chat Room

A real-time chat room built using FastAPI, WebSockets, Bootstrap, and JavaScript. Users can join the chat by entering their name, send messages in real time, and see who is currently online.

---

## 🚀 Features

- Real-time messaging via WebSockets
- Bootstrap UI with mobile responsiveness
- Join modal for name entry
- Active users list
- "User left" notifications

---

## 📁 Project Structure

```
.
├── main.py                  # FastAPI backend
├── templates/
│   └── index.html           # Frontend HTML (Jinja2)
├── static/
│   └── js/
│       └── script.js        # WebSocket + UI logic
├── requirements.txt
└── README.md
```

---

## 💠 Installation

### 1. Clone the repository

```bash
git clone https://github.com/JahanzebKhan796/FastAPI-Chat-room.git
cd FastAPI-Chat-room
```

### 2. Create a virtual environment (optional but recommended)

```bash
python -m venv venv
source venv/bin/activate       # Linux/macOS
venv\Scripts\activate          # Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Running the App

### 1. Start the FastAPI server

```bash
uvicorn main:app --reload
```

The app will be available at:\
🔗 **http\://127.0.0.1:8000**

---

## 🌐 Expose Publicly (Optional)

Use [ngrok](https://ngrok.com/) to expose your localhost:

```bash
ngrok http 8000
```

Copy the forwarded HTTPS URL and share with others to join your chat room.

---

> **Important:** In `static/js/script.js`, replace this line:
>
> ```js
> const socket = new WebSocket("wss://cb61-124-109-47-110.ngrok-free.app/ws");
> ```
>
> With:
>
> ```js
> const socket = new WebSocket("wss://your-new-ngrok-url.ngrok-free.app/ws");
> ```
>
> Or, if you're running locally:
>
> ```js
> const socket = new WebSocket("ws://localhost:8000/ws");
> ```

---

