let username = "";
let socket;

// Bootstrap modal
const usernameModal = new bootstrap.Modal(document.getElementById('usernameModal'));
usernameModal.show();

document.getElementById('joinChat').addEventListener('click', () => {
    const input = document.getElementById('usernameInput');
    username = input.value.trim();
    if (!username) return;

    usernameModal.hide();
    document.getElementById('chat-container').classList.remove('d-none');

    startWebSocket();
});

function startWebSocket() {
    socket = new WebSocket("wss://cb61-124-109-47-110.ngrok-free.app/ws");

    socket.onopen = () => {
        console.log("Connected to WebSocket");
        socket.send(JSON.stringify({ user: username, message: `${username} joined the chat.` }));
    };

    socket.onmessage = (event) => {
        const chatBox = document.getElementById("chat-box");
        const data = JSON.parse(event.data);

        if (data.type === "user_list") {
            updateUserList(data.users);
            return;
        }

        const msgDiv = document.createElement("div");

        if (data.user === "System") {
            msgDiv.className = "text-center text-muted small";
            msgDiv.textContent = data.message;
        } else {
            msgDiv.className = "chat-message " + (data.user === username ? "me" : "other");
            msgDiv.textContent = `${data.user}: ${data.message}`;
        }

        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    function updateUserList(users) {
        const userList = document.getElementById("userList");
        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.className = "list-inline-item badge bg-secondary me-1";
            li.textContent = user;
            userList.appendChild(li);
        });
    }

}

document.getElementById("sendBtn").addEventListener("click", () => {
    const msgInput = document.getElementById("message");
    const message = msgInput.value.trim();
    if (message && socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ user: username, message }));
        msgInput.value = "";
    }
});

document.getElementById("message").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        document.getElementById("sendBtn").click();
    }
});
