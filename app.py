from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
import re

app = Flask(__name__)

def extract_video_id(url):
    match = re.search(r"(?:v=|youtu.be/)([\w-]{11})", url)
    return match.group(1) if match else None

@app.route('/api/transcript', methods=['POST'])
def get_transcript():
    data = request.get_json()
    url = data.get('url')
    video_id = extract_video_id(url)

    if not video_id:
        return jsonify({'error': 'Invalid YouTube URL'}), 400

    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        text = "\n".join(line['text'] for line in transcript_list)
        return jsonify({'transcript': text})
    except Exception as e:
        import traceback
        print('ERROR:', e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

def format_transcript_markdown(transcript_list):
    def seconds_to_timestamp(seconds):
        m, s = divmod(int(seconds), 60)
        return f"{m:02}:{s:02}"
    lines = []
    for segment in transcript_list:
        timestamp = seconds_to_timestamp(segment['start'])
        text = segment['text']
        lines.append(f"- **[{timestamp}]** {text}")
    return "\n".join(lines)

@app.route('/api/transcript_markdown', methods=['POST'])
def get_transcript_markdown():
    data = request.get_json()
    url = data.get('url')
    video_id = extract_video_id(url)

    if not video_id:
        return jsonify({'error': 'Invalid YouTube URL'}), 400

    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        markdown = format_transcript_markdown(transcript_list)
        return jsonify({'transcript_markdown': markdown})
    except Exception as e:
        import traceback
        print('ERROR:', e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
