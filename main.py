from flask import Flask, request, render_template, json, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('model_js/model.json', 'r') as myfile:
    data = myfile.read()

@app.route("/")
def main():
    return render_template('index.html')
  
@app.route('/model')
def model():
  json_data = json.load(open("./model_js/model.json"))
  return jsonify(json_data)


@app.route('/<path:path>')
def load_shards(path):
    return send_from_directory('model_js', path)


if __name__ == "__main__":
  app.run(debug=True)