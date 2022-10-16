from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from model import ClickbaitClassifier
from deep_translator import GoogleTranslator


from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch



classifier = ClickbaitClassifier()


app = Flask(__name__)
cors = CORS(app)
cors.init_app(app, resources={r"*": {"origins": "*"}})

statistics = {}


@app.route('/', methods=['GET'])
@cross_origin()
def get_statistics():
    return jsonify(statistics)


@app.route('/', methods=['POST'])
@cross_origin()
def get_prediction():
    req = request.get_json()
    website = req["website"]
    headlineTexts = req["headlineTexts"]

    if website == "20 Minuten" or website == "Blick":
         headlineTexts = [GoogleTranslator(source='de', target='en').translate(hl) for hl in headlineTexts]

    predictions = []
    for headline in headlineTexts:
        prediction = classifier.predict(headline)
        prediction[0]["score"] = int(str(prediction[0]["score"]*100)[0:2])
        if website not in statistics.keys():
            statistics[website] = [0,0]
        if prediction[0]["label"] == "Clickbait":
            statistics[website][0] += 1
        statistics[website][1] += 1
        predictions.append(prediction)

    return jsonify(predictions)
