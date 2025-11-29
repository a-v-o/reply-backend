# Tweet Reply Generator API

A simple Express API that generates witty and engaging tweet replies using Google's Generative AI.

## Features

- ✅ Receives tweet text via POST request
- ✅ Generates intelligent, contextual replies using Google GenAI
- ✅ Maintains 280-character tweet limit
- ✅ Error handling and validation
- ✅ Environment configuration support

## Prerequisites

- Node.js (v14 or higher)
- Google API Key for Generative AI

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```
GOOGLE_API_KEY=your_google_api_key_here
PORT=3000
```

To get your Google API key:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy it and paste into the `.env` file

### 3. Start the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Generate Tweet Reply

**POST** `/generate-reply`

**Request Body:**

```json
{
  "text": "Just finished my first marathon! Feeling exhausted but proud 🏃‍♂️"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "originalText": "Just finished my first marathon! Feeling exhausted but proud 🏃‍♂️",
  "reply": "That's an incredible achievement! Your dedication paid off. Now rest well and celebrate this amazing milestone! 🎉"
}
```

**Error Response (400):**

```json
{
  "error": "Invalid input",
  "message": "Please provide a non-empty text field"
}
```

### Health Check

**GET** `/health`

**Response:**

```json
{
  "status": "Server is running"
}
```

## Example Usage

Using cURL:

```bash
curl -X POST http://localhost:3000/generate-reply \
  -H "Content-Type: application/json" \
  -d '{"text": "Learning TypeScript for the first time"}'
```

Using JavaScript/Fetch:

```javascript
const response = await fetch("http://localhost:3000/generate-reply", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Your tweet here" }),
});

const data = await response.json();
console.log(data.reply);
```

## Technologies Used

- **Express.js** - Web framework
- **@google/generative-ai** - Google's Generative AI SDK
- **dotenv** - Environment variable management
- **Nodemon** - Development server (auto-reload)
