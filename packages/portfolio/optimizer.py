import pandas as pd
from pypfopt import EfficientFrontier, HRPOpt

def allocate(returns: pd.DataFrame, method: str = "hrp") -> pd.Series:
    mu = returns.mean()
    S = returns.cov()
    if method == "mv":
        ef = EfficientFrontier(mu, S)
    elif method == "hrp":
        ef = HRPOpt(returns)
    else:
        raise ValueError("Unknown method")
    return pd.Series(ef.clean_weights()) 