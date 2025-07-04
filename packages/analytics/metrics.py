import empyrical as emp
import numpy as np
import pandas as pd

def sharpe(returns):
    return emp.sharpe_ratio(returns)

def sortino(returns):
    return emp.sortino_ratio(returns)

def max_drawdown(returns):
    return emp.max_drawdown(returns)

def alpha_beta(returns, factor_returns):
    alpha, beta = emp.alpha_beta(returns, factor_returns)
    return alpha, beta

def cvar(returns, alpha=0.05):
    return returns[returns <= returns.quantile(alpha)].mean()

def rolling_sharpe(returns, window=63):
    return returns.rolling(window).apply(emp.sharpe_ratio) 