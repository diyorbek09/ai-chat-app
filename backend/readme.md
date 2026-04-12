1. Navigate to Project Directory
Open your terminal and enter your project folder:
```bash
cd ai-chat-app

2. Install Dependencies

Initialize the project environment and install the necessary backend packages (Express, Dotenv, and CORS):
Bash

npm init -y
npm install express dotenv cors

3. Configure Environment Variables

Create the .env file to store your credentials. Replace your_actual_groq_api_key with your key from the Groq console:
Bash

echo "GROQ_API_KEY=your_actual_groq_api_key" > .env
echo "PORT=3000" >> .env

4. Organize Frontend Files

The backend is configured to serve static files from a folder named public. If your files are currently in the root or a different folder, move them as follows:
Bash

mkdir -p public
mv index.html style.css script.js public/

5. Start the Application

Launch the Node.js server:
Bash

node server.js

6. Access the Interface

Once the terminal displays "Server running on http://localhost:3000", open your web browser and navigate to:
Plaintext

http://localhost:3000