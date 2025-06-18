from fastapi import FastAPI, WebSocket, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import json

template = Jinja2Templates(directory="templates")

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def get_app(request: Request):
    return template.TemplateResponse("index.html", {"request": request, "app_name" : "Chat APP"})

active_connections = []

async def broadcast(message: str):
    for conn, _ in active_connections:
        await conn.send_text(message)

async def broadcast_system(message: str):
    await broadcast(json.dumps({"user": "System", "message": message}))

async def broadcast_user_list():
    users = [user for _, user in active_connections]
    await broadcast(json.dumps({"type": "user_list", "users": users}))


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    username = None

    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)

            if username is None:
                # First message must include username
                username = message_data["user"]
                active_connections.append((websocket, username))
                await broadcast_system(f"{username} joined the chat.")
                await broadcast_user_list()
            else:
                await broadcast(data)
    except:
        if username:
            active_connections[:] = [(ws, user) for ws, user in active_connections if ws != websocket]
            await broadcast_system(f"{username} left the chat.")
            await broadcast_user_list()




