import pandas as pd
from pydantic import BaseModel
import abc

class Feature(BaseModel, abc.ABC):
    @abc.abstractmethod
    def compute(self, df: pd.DataFrame) -> pd.DataFrame:
        pass

class TwitterPolarity(Feature):
    def compute(self, df: pd.DataFrame) -> pd.DataFrame:
        # Placeholder: Ingest Twitter sentiment into DuckDB
        df['twitter_polarity'] = 0.0
        return df 