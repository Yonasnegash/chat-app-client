# Chat Application Frontend

This is the frontend code for a chat application that allows users to send text messages and upload files. The frontend is built with React.js and interacts with the backend server using WebSocket for real-time messaging and REST API for file uploads.

## Features

- Real-time messaging using WebSocket
- File uploads with FormData and fetch API
- Displays chat history and uploaded files
- Allows users to send messages and upload files

## Prerequisites

- Node.js
- Backend server running (Ensure your backend server is running on `http://localhost:5000`)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Yonasnegash/chat-app-client.git
   cd chat-app-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend development server:**

   ```bash
   npm start
   ```

   The development server will start on `http://localhost:3000`.

4. **Ensure backend server is running:**

   Make sure your backend server is running on `http://localhost:5000`. If it's running on a different port or address, update the `fetch` URL in `App.js` accordingly.

## Usage

1. **Open the application:**

   Open `http://localhost:3000` in your web browser.

2. **Chat Interface:**

   - Type a message in the input field and click "Send" to send a text message.
   - Click on the file input to select a file for upload. Once selected, click "Send" to upload the file.

3. **Viewing Messages:**

   - Sent messages will appear in the chat history.
   - Uploaded files will display as links in the chat history. Click on the link to open the file in a new tab.
