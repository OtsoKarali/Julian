import backtrader as bt
from sklearn.base import BaseEstimator

class MLFactorStrategy(bt.Strategy):
    def __init__(self, model: BaseEstimator):
        self.model = model

    def next(self):
        # Placeholder: use model.predict_proba to generate signals
        pass 