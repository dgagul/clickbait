from transformers import pipeline


class ClickbaitClassifier:
    def __init__(self):
        self.classifier = pipeline(task="text-classification", model="Stremie/roberta-base-clickbait")

    def predict(self, headline):
        return self.classifier(headline)


