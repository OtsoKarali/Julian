import backtrader as bt

class MomentumStrategy(bt.Strategy):
    def __init__(self):
        self.ema_fast = bt.ind.EMA(period=12)
        self.ema_slow = bt.ind.EMA(period=26) 