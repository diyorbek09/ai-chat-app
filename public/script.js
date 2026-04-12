const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;
    
    if (role === 'ai') {
        // Only use marked if it is loaded, otherwise fallback to plain text
        if (typeof marked !== 'undefined') {
            msgDiv.innerHTML = marked.parse(text);
        } else {
            msgDiv.innerText = text;
        }
        
        // Only use hljs if it is loaded
        if (typeof hljs !== 'undefined') {
            msgDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    } else {
        msgDiv.innerText = text;
    }
    
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    console.log("Attempting to send:", message); // Debug log

    appendMessage('user', message);
    userInput.value = '';
    
    sendBtn.disabled = true;
    
    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        console.log("Data received:", data);

        if (data.reply) {
            appendMessage('ai', data.reply);
        } else {
            appendMessage('ai', "Error: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Fetch error:", error);
        appendMessage('ai', "❌ Fatal Error: Could not connect to backend.");
    } finally {
        sendBtn.disabled = false;
        userInput.focus();
    }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});