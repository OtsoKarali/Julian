import pandas as pd
import numpy as np
from pydantic import BaseModel
import abc

class Feature(BaseModel, abc.ABC):
    @abc.abstractmethod
    def compute(self, df: pd.DataFrame) -> pd.DataFrame:
        pass

class RollReturn(Feature):
    def compute(self, df: pd.DataFrame) -> pd.DataFrame:
        df['roll_return'] = df['Close'].pct_change(21)
        return df

class ZScore(Feature):
    def compute(self, df: pd.DataFrame) -> pd.DataFrame:
        df['zscore'] = (df['Close'] - df['Close'].rolling(20).mean()) / df['Close'].rolling(20).std()
        return df

class ATR(Feature):
    def compute(self, df: pd.DataFrame) -> pd.DataFrame:
        high_low = df['High'] - df['Low']
        high_close = np.abs(df['High'] - df['Close'].shift())
        low_close = np.abs(df['Low'] - df['Close'].shift())
        ranges = pd.concat([high_low, high_close, low_close], axis=1)
        df['atr'] = ranges.max(axis=1).rolling(14).mean()
        return df

class RSI(Feature):
    def compute(self, df: pd.DataFrame) -> pd.DataFrame:
        delta = df['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(14).mean()
        rs = gain / loss
        df['rsi'] = 100 - (100 / (1 + rs))
        return df 