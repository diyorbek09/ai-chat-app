This is the properly formatted Markdown code for your `README.md`. It uses clean headers, code blocks for copy-pasting, and a clear project structure overview.

```markdown
# Minimal AI Chat Interface

A secure, responsive web application that interfaces with the Groq Llama-3.1 API. This project demonstrates a full-stack integration of a Node.js backend and a Vanilla JavaScript frontend, focusing on security, performance, and clean UI/UX.

---

## Getting Started

Follow these terminal commands step-by-step to install and run the application on your local machine.

### 1. Navigate to Project Directory
Open your terminal and enter your project folder:
```bash
cd ai-chat-app
```

### 2. Install Dependencies
Initialize the project environment and install the necessary backend packages:
```bash
npm init -y
npm install express dotenv cors
```

### 3. Configure Environment Variables
Create the `.env` file to store your credentials. Replace `your_actual_groq_api_key` with your key from the Groq console:
```bash
echo "GROQ_API_KEY=your_actual_groq_api_key" > .env
echo "PORT=3000" >> .env
```

### 4. Organize Frontend Files
The backend is configured to serve static files from a folder named `public`. Move your frontend assets into this directory:
```bash
mkdir -p public
mv index.html style.css script.js public/
```

### 5. Start the Application
Launch the Node.js server:
```bash
node server.js
```

### 6. Access the Interface
Once the terminal displays "Server running on http://localhost:3000", open your web browser and navigate to:
`http://localhost:3000`

---

## Project Structure

```text
.
├── server.js           # Express server and API proxy logic
├── package.json        # Node.js dependencies and scripts
├── .env                # Private API keys (ignored by Git)
├── .gitignore          # Rules to exclude sensitive files from Git
└── public/             # Static frontend assets served by Express
    ├── index.html      # Main UI structure
    ├── style.css       # Custom dark-mode styling
    └── script.js       # Client-side logic and Markdown rendering
```

---

## Technical Features
- **Security**: All API communication is handled server-side to prevent API key exposure.
- **Markdown Rendering**: Uses Marked.js to convert AI responses into formatted HTML.
- **Syntax Highlighting**: Integrated Highlight.js for professional code block presentation.
- **Error Handling**: Provides clear feedback for connection failures or API issues.
- **Responsive Design**: Optimized for a consistent experience across desktop and mobile devices.

---

## Submission Info
This project was developed for the Private AI System Case Study.
```
