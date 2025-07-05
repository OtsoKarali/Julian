from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import json

app = FastAPI()

# Allow all CORS for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Julian Quant API is running!"}

@app.get("/health")
def health():
    return {"status": "ok"}

# Analytics endpoints
@app.get("/api/analytics/performance")
def get_performance_metrics():
    return {
        "sharpe": 1.87,
        "sortino": 2.34,
        "maxDrawdown": -0.032,
        "alpha": 0.021,
        "beta": 0.89,
        "cvar": -0.045
    }

@app.get("/api/analytics/equity-curve")
def get_equity_curve():
    return {
        "x": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "y": [100, 110, 120, 115, 130, 140]
    }

@app.get("/api/analytics/drawdown")
def get_drawdown():
    return {
        "x": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "y": [0, -0.02, -0.01, -0.032, -0.015, 0]
    }

@app.get("/api/analytics/shap-features")
def get_shap_features():
    return [
        {"feature": "Momentum", "importance": 0.45, "direction": "positive"},
        {"feature": "Volatility", "importance": 0.32, "direction": "negative"},
        {"feature": "Sentiment", "importance": 0.28, "direction": "positive"},
        {"feature": "Volume", "importance": 0.15, "direction": "negative"}
    ]

# Backtesting endpoints
@app.get("/api/backtesting/strategies")
def get_backtesting_strategies():
    return [
        {"id": "momentum", "name": "Dual EMA Momentum", "description": "Breakout strategy using dual exponential moving averages"},
        {"id": "pairs", "name": "Pairs Trading", "description": "Mean reversion strategy using Kalman filter"},
        {"id": "ml_factor", "name": "ML Factor Model", "description": "Machine learning based factor model"},
        {"id": "mean_reversion", "name": "Mean Reversion", "description": "Simple mean reversion strategy"}
    ]

@app.post("/api/backtesting/run")
def run_backtest(request: Dict[str, Any]):
    # Mock backtest execution
    return {
        "strategy": request.get("strategy", "momentum"),
        "period": f"{request.get('startDate', '2023-01-01')} to {request.get('endDate', '2024-01-01')}",
        "metrics": {
            "totalReturn": 0.156,
            "sharpeRatio": 1.87,
            "maxDrawdown": -0.032,
            "winRate": 0.68,
            "profitFactor": 2.34
        },
        "equityCurve": {
            "x": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "y": [100, 105, 112, 108, 115, 122, 118, 125, 132, 128, 135, 142]
        },
        "trades": [
            {"date": "2023-01-15", "symbol": "AAPL", "side": "BUY", "quantity": 100, "price": 150.25, "pnl": 1250},
            {"date": "2023-02-20", "symbol": "GOOGL", "side": "SELL", "quantity": 50, "price": 2800.50, "pnl": -500},
            {"date": "2023-03-10", "symbol": "MSFT", "side": "BUY", "quantity": 75, "price": 320.75, "pnl": 1875}
        ]
    }

# Models endpoints
@app.get("/api/models")
def get_models():
    return [
        {
            "id": "gbm_momentum",
            "name": "Gradient Boosted Momentum",
            "type": "ML",
            "status": "trained",
            "accuracy": 0.78,
            "lastUpdated": "2024-01-15",
            "features": ["price_momentum", "volume_ratio", "volatility", "sentiment"],
            "performance": {
                "trainAccuracy": 0.82,
                "testAccuracy": 0.78,
                "precision": 0.75,
                "recall": 0.73,
                "f1Score": 0.74
            },
            "trainingHistory": {
                "x": ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
                "y": [0.65, 0.72, 0.76, 0.78, 0.78]
            }
        },
        {
            "id": "ppo_allocator",
            "name": "PPO Portfolio Allocator",
            "type": "RL",
            "status": "training",
            "accuracy": 0.71,
            "lastUpdated": "2024-01-14",
            "features": ["portfolio_weights", "market_conditions", "risk_metrics"],
            "performance": {
                "trainAccuracy": 0.74,
                "testAccuracy": 0.71,
                "precision": 0.68,
                "recall": 0.72,
                "f1Score": 0.70
            },
            "trainingHistory": {
                "x": ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
                "y": [0.58, 0.64, 0.68, 0.70, 0.71]
            }
        }
    ]

@app.post("/api/models/{model_id}/train")
def train_model(model_id: str):
    # Mock training process
    return {"status": "training_started", "model_id": model_id}

# Data endpoints
@app.get("/api/data/sources")
def get_data_sources():
    return [
        {
            "id": "yfinance",
            "name": "Yahoo Finance",
            "status": "active",
            "lastUpdate": "2024-01-15 09:30:00",
            "symbols": 500,
            "dataPoints": "2.5M",
            "updateFrequency": "Daily"
        },
        {
            "id": "polygon",
            "name": "Polygon.io",
            "status": "active",
            "lastUpdate": "2024-01-15 09:15:00",
            "symbols": 300,
            "dataPoints": "1.8M",
            "updateFrequency": "Real-time"
        },
        {
            "id": "twitter",
            "name": "Twitter Sentiment",
            "status": "active",
            "lastUpdate": "2024-01-15 08:45:00",
            "symbols": 100,
            "dataPoints": "500K",
            "updateFrequency": "Hourly"
        }
    ]

@app.get("/api/data/feature-store")
def get_feature_store():
    return {
        "status": "healthy",
        "totalFeatures": 45,
        "activeFeatures": 42,
        "lastComputed": "2024-01-15 10:00:00",
        "storageUsed": "2.3GB",
        "storageTotal": "10GB",
        "featureGroups": [
            {"name": "Technical Indicators", "count": 15, "status": "active"},
            {"name": "Sentiment Features", "count": 8, "status": "active"},
            {"name": "Market Microstructure", "count": 12, "status": "active"},
            {"name": "Alternative Data", "count": 10, "status": "processing"}
        ]
    }

@app.get("/api/data/pipelines")
def get_pipelines():
    return [
        {
            "id": "daily_prices",
            "name": "Daily Price Pipeline",
            "status": "completed",
            "lastRun": "2024-01-15 09:30:00",
            "duration": "15m",
            "successRate": 0.98,
            "nextRun": "2024-01-16 09:30:00"
        },
        {
            "id": "feature_computation",
            "name": "Feature Computation",
            "status": "running",
            "lastRun": "2024-01-15 10:00:00",
            "duration": "45m",
            "successRate": 0.95,
            "nextRun": "2024-01-15 11:00:00"
        },
        {
            "id": "sentiment_analysis",
            "name": "Sentiment Analysis",
            "status": "completed",
            "lastRun": "2024-01-15 08:45:00",
            "duration": "30m",
            "successRate": 0.92,
            "nextRun": "2024-01-15 09:45:00"
        }
    ]

# Existing endpoints (keeping for compatibility)
@app.get("/api/strategies")
def get_strategies():
    return [
        {"id": 1, "name": "Momentum Strategy", "description": "Dual EMA momentum strategy", "performance": "+15.2%"},
        {"id": 2, "name": "Mean Reversion", "description": "Pairs trading mean reversion", "performance": "+8.7%"},
        {"id": 3, "name": "ML Factor Model", "description": "Machine learning factor model", "performance": "+12.4%"}
    ]

@app.get("/api/portfolio")
def get_portfolio():
    return {
        "allocations": [
            {"asset": "AAPL", "weight": 25.5},
            {"asset": "GOOGL", "weight": 20.3},
            {"asset": "MSFT", "weight": 18.7},
            {"asset": "TSLA", "weight": 15.2},
            {"asset": "NVDA", "weight": 20.3}
        ],
        "exposures": ["Technology", "Growth", "Large Cap"],
        "risk": [
            {"label": "Sharpe Ratio", "value": "1.87"},
            {"label": "Max Drawdown", "value": "-3.2%"},
            {"label": "Beta", "value": "0.89"}
        ]
    }

@app.get("/api/trades")
def get_trades():
    return [
        {"id": 1, "time": "2024-01-15 09:30", "asset": "AAPL", "side": "BUY", "quantity": 100, "price": 150.25, "status": "filled"},
        {"id": 2, "time": "2024-01-15 10:15", "asset": "GOOGL", "side": "SELL", "quantity": 50, "price": 2800.50, "status": "filled"},
        {"id": 3, "time": "2024-01-15 11:00", "asset": "MSFT", "side": "BUY", "quantity": 75, "price": 320.75, "status": "pending"}
    ] 