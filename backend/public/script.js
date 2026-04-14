const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

/**
 * Appends a message to the chat window with optional Markdown rendering
 */
function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;
    
    if (role === 'ai') {
        // Render Markdown if the library loaded correctly in index.html
        if (typeof marked !== 'undefined') {
            msgDiv.innerHTML = marked.parse(text);
        } else {
            msgDiv.innerText = text;
        }
        
        // Apply syntax highlighting to any code blocks found in the AI response
        if (typeof hljs !== 'undefined') {
            msgDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    } else {
        // User messages are kept as plain text for security/simplicity
        msgDiv.innerText = text;
    }
    
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/**
 * Handles sending the message to the local Express proxy
 */
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';
    sendBtn.disabled = true;
    
    try {
        // Using relative path '/chat' works because index.html is served from the same origin
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        if (data.reply) {
            appendMessage('ai', data.reply);
        } else {
            appendMessage('ai', "Error: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Fetch error:", error);
        appendMessage('ai', "❌ Fatal Error: Could not connect to the local server.");
    } finally {
        sendBtn.disabled = false;
        userInput.focus();
    }
}

// --- Event Listeners ---

// Handle Click
sendBtn.addEventListener('click', sendMessage);

// Handle Enter Key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});