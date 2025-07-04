# quant-platform

A production-ready research platform for event-driven backtests, ML/RL signals, and portfolio analytics.

## Features
- Event-driven back-tests (Backtrader)
- DuckDB + Parquet feature store
- yfinance/Polygon data pipelines (Prefect)
- ML (Scikit-Learn/XGBoost), RL (Stable-Baselines 3)
- Portfolio allocation (PyPortfolioOpt)
- Performance analytics (empyrical, CVaR)
- Streamlit dashboard with SHAP explainers

## Quickstart
1. Clone the repo and install dependencies with Poetry
2. Run Prefect flows for data ingestion
3. Launch the Streamlit dashboard

See `/docs` for full documentation and tutorials.