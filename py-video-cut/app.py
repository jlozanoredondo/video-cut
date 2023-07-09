from flask import Flask, request, jsonify
from flask_cors import CORS
from moviepy.editor import VideoFileClip
import os
import subprocess
import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "/home/jonathan/video-cut/videos"

def seconds_to_time_str(seconds):
    return str(datetime.timedelta(seconds=seconds))

def cut_video(video_file_path, start_time, end_time, output_file_path):
    start_time_str = seconds_to_time_str(start_time)
    end_time_str = seconds_to_time_str(end_time)

    command = ['ffmpeg', 
               '-i', video_file_path, 
               '-ss', start_time_str, 
               '-to', end_time_str, 
               '-c', 'copy', 
               output_file_path]

    subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

@app.route('/api/upload', methods=['POST'])
def upload_video():
    video_file = request.files['file']
    video_file_path = os.path.join(UPLOAD_FOLDER, video_file.filename)
    video_file.save(video_file_path)
    
    clip = VideoFileClip(video_file_path)
    duration = clip.duration
    clip.close()

    return jsonify({"duration": duration, "video_file_path": video_file_path})

@app.route('/api/cut-video', methods=['POST'])
def cut_video_endpoint():
    video_file_path = request.json['video_file_path']
    start_time = request.json['start']
    end_time = request.json['end']

    output_file_path = os.path.join(UPLOAD_FOLDER, f"cut_{os.path.basename(video_file_path)}")

    cut_video(video_file_path, start_time, end_time, output_file_path)

    return {"file_path": output_file_path}

if __name__ == "__main__":
    app.run(debug=True)
