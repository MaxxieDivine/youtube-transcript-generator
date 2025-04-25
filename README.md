# YouTube Transcript Generator

A web app to extract and download YouTube video transcripts, with both plain text and Markdown output. Built with a Flask backend and a React frontend.

---

## Features
- Extracts transcripts from YouTube videos using the [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api)
- Returns transcripts as plain text or Markdown (with timestamps)
- Modern React frontend with Markdown preview and copy button

---

## Local Setup Instructions

### 1. Clone the repository
```sh
git clone https://github.com/MaxxieDivine/youtube-transcript-generator.git
cd youtube-transcript-generator
```

### 2. Set up the Python backend
```sh
python -m venv .venv
.venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python app.py
```
This will start the Flask server at http://127.0.0.1:5000

### 3. Set up the React frontend
```sh
cd frontend
npm install
npm start
```
The React app will run at http://localhost:3000 and proxy API requests to the Flask backend.

---

## Usage
- Paste a YouTube URL and click "Get Transcript"
- Toggle between plain text and Markdown output
- Copy or download the transcript as needed

---

## Deployment
- For production, use a WSGI server (e.g., Gunicorn) for Flask
- Deploy the frontend to Vercel, Netlify, or similar

---

## License
MIT
