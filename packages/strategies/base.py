import backtrader as bt

class BaseStrategy(bt.Strategy):
    def log(self, txt, dt=None):
        dt = dt or self.datas[0].datetime.date(0)
        print(f'%s, %s' % (dt.isoformat(), txt))

    def __init__(self):
        pass 