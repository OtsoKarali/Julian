import xgboost as xgb
import shap

class GBMModel:
    def __init__(self):
        self.model = xgb.XGBClassifier()
        self.explainer = None

    def fit(self, X, y):
        self.model.fit(X, y)
        self.explainer = shap.Explainer(self.model, X)

    def predict(self, X):
        return self.model.predict(X)

    def shap_values(self, X):
        if self.explainer is None:
            self.explainer = shap.Explainer(self.model, X)
        return self.explainer(X) 