from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load("best_model.pkl")

# ADD THIS: Homepage route
@app.route("/", methods=["GET"])
def home():
    return "<h2>Employee Salary Prediction API is running!</h2>"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if isinstance(data, list):
        df = pd.DataFrame(data)
        preds = model.predict(df)
        return jsonify({"predictions": preds.tolist()})
    else:
        df = pd.DataFrame([data])
        pred = model.predict(df)[0]
        return jsonify({"prediction": str(pred)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
