import streamlit as st
from datetime import date, datetime
import time
import numpy as np
import matplotlib.pyplot as plt
import uuid
import pandas as pd
import yfinance as yf
import plotly.graph_objs as go
from pypfopt import EfficientFrontier, risk_models, expected_returns
from sklearn.ensemble import RandomForestClassifier
import shap
import streamlit.components.v1 as components
from streamlit import session_state as ss

# Set Streamlit dark theme
st.set_page_config(page_title="Quant Dashboard", layout="wide")
st.markdown("""
    <style>
    body { background-color: #18191A; color: #F5F6FA; }
    .stApp { background-color: #18191A; }
    .css-1d391kg { background-color: #18191A; }
    .stTabs [data-baseweb="tab-list"] { background: #18191A; }
    .stTabs [data-baseweb="tab"] { color: #F5F6FA; }
    .stTabs [aria-selected="true"] { color: #FF4B4B; border-bottom: 2px solid #FF4B4B; }
    </style>
""", unsafe_allow_html=True)

# --- Custom CSS for max-level dark theme aesthetics ---
st.markdown('''
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    html, body, [class*="stApp"]  {
        background-color: #181A20 !important;
        color: #F5F6FA !important;
        font-family: 'Inter', sans-serif !important;
    }
    .stSidebar {
        background: #1F222A !important;
        border-radius: 16px 0 0 16px;
        box-shadow: 2px 0 12px #0003;
        padding-top: 2rem !important;
    }
    .stSidebar .css-1d391kg { background: #1F222A !important; }
    .stSidebar .css-1v0mbdj { color: #00FFCC !important; }
    .stTabs [data-baseweb="tab-list"] {
        background: #23262F !important;
        border-radius: 12px;
        margin-bottom: 0.5rem;
    }
    .stTabs [data-baseweb="tab"] {
        color: #A3A6B1 !important;
        font-weight: 600;
        font-size: 1.1rem;
        padding: 0.7rem 1.5rem;
        border-radius: 8px 8px 0 0;
        transition: background 0.2s;
    }
    .stTabs [aria-selected="true"] {
        color: #00FFCC !important;
        background: #23262F !important;
        border-bottom: 3px solid #00FFCC !important;
    }
    .stButton>button {
        background: linear-gradient(90deg, #00FFCC 0%, #4B8CFF 100%);
        color: #181A20;
        font-weight: 700;
        border-radius: 8px;
        border: none;
        padding: 0.7rem 1.5rem;
        margin-top: 1rem;
        box-shadow: 0 2px 8px #00FFCC33;
        transition: box-shadow 0.2s;
    }
    .stButton>button:hover {
        box-shadow: 0 4px 16px #00FFCC66;
    }
    .stMetric {
        background: #23262F !important;
        border-radius: 12px;
        padding: 1rem 0.5rem;
        margin: 0.5rem 0;
        box-shadow: 0 2px 8px #0002;
    }
    .stAlert, .stInfo, .stSuccess, .stWarning {
        border-radius: 10px !important;
        font-size: 1.05rem;
    }
    .stCard {
        background: #23262F !important;
        border-radius: 16px;
        box-shadow: 0 2px 16px #0003;
        padding: 2rem 2rem 1.5rem 2rem;
        margin-bottom: 2rem;
    }
    .stPlotlyChart {
        border-radius: 12px;
        background: #23262F !important;
        box-shadow: 0 2px 12px #0002;
        padding: 1rem;
    }
    .stCaption {
        color: #A3A6B1 !important;
        font-size: 1rem !important;
    }
    .stMarkdown h2, .stMarkdown h3, .stMarkdown h4 {
        color: #00FFCC !important;
        font-weight: 700;
        margin-top: 1.5rem;
    }
    .stMarkdown hr {
        border: 0;
        border-top: 1px solid #23262F;
        margin: 1.5rem 0;
    }
    /* Glassmorphism for cards and sidebar */
    .stCard, .stSidebar {
        background: rgba(31, 34, 42, 0.7) !important;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 20px;
        border: 1.5px solid rgba(255,255,255,0.18);
    }
    /* Animated gradient border for cards */
    .stCard {
        border: 3px solid;
        border-image: linear-gradient(90deg, #00FFCC, #4B8CFF, #FF4B4B, #00FFCC) 1;
        animation: borderMove 3s linear infinite;
    }
    @keyframes borderMove {
        0% { border-image-source: linear-gradient(90deg, #00FFCC, #4B8CFF, #FF4B4B, #00FFCC); }
        100% { border-image-source: linear-gradient(270deg, #00FFCC, #4B8CFF, #FF4B4B, #00FFCC); }
    }
    /* Neon glow for metrics */
    .stMetric {
        box-shadow: 0 0 16px #00FFCC99, 0 0 8px #4B8CFF66;
        border: 1.5px solid #00FFCC;
    }
    /* Animated section divider */
    .divider {
        height: 3px;
        background: linear-gradient(90deg, #00FFCC, #4B8CFF, #FF4B4B, #00FFCC);
        background-size: 400% 400%;
        animation: gradientMove 5s ease infinite;
        border-radius: 2px;
        margin: 2rem 0 1.5rem 0;
    }
    @keyframes gradientMove {
        0% {background-position:0% 50%}
        50% {background-position:100% 50%}
        100% {background-position:0% 50%}
    }
    /* Neon theme toggle button */
    .theme-switch {
        background: linear-gradient(90deg, #00FFCC, #4B8CFF);
        border-radius: 20px;
        padding: 0.3rem 1.2rem;
        color: #181A20;
        font-weight: 700;
        border: none;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 8px #00FFCC33;
        cursor: pointer;
        transition: box-shadow 0.2s;
    }
    .theme-switch:hover {
        box-shadow: 0 4px 16px #00FFCC66;
    }
    </style>
''', unsafe_allow_html=True)

# --- Sidebar with logo/project name and icons ---
st.sidebar.markdown("""
<div style='text-align:center; margin-bottom:2rem;'>
    <span style='font-size:2rem; font-weight:700; color:#00FFCC;'>🧠 Julian Quant</span><br>
    <span style='font-size:1.1rem; color:#A3A6B1;'>Research Platform</span>
</div>
""", unsafe_allow_html=True)

# --- Custom favicon and page title ---
st.set_page_config(page_title="Julian Quant Platform", page_icon="🧠")

# --- Custom SVG logo ---
st.sidebar.markdown("""
<div style='text-align:center; margin-bottom:1.5rem;'>
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#00FFCC;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4B8CFF;stop-opacity:1" />
        </linearGradient>
        <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="8s" repeatCount="indefinite"/>
      </defs>
      <circle cx="30" cy="30" r="28" stroke="url(#grad1)" stroke-width="4" fill="#181A20">
        <animate attributeName="stroke-dasharray" values="0,200;200,0;0,200" dur="4s" repeatCount="indefinite"/>
      </circle>
      <text x="50%" y="54%" text-anchor="middle" fill="#00FFCC" font-size="2.2rem" font-family="Inter, sans-serif" dy=".3em">JQ</text>
    </svg>
</div>
""", unsafe_allow_html=True)

# --- Animated theme switching (dark/light/neon) ---
if "theme_mode" not in ss:
    ss["theme_mode"] = "dark"
def toggle_theme():
    ss["theme_mode"] = (
        "light" if ss["theme_mode"] == "dark" else
        "neon" if ss["theme_mode"] == "light" else
        "dark"
    )
icon = "🌙" if ss["theme_mode"] == "dark" else ("☀️" if ss["theme_mode"] == "light" else "🟣")
if st.sidebar.button(icon, key="theme_toggle", help="Switch theme", use_container_width=True):
    toggle_theme()
# Inject animated CSS for theme
if ss["theme_mode"] == "dark":
    st.markdown('''<style>body, [class*="stApp"] { background: linear-gradient(120deg, #181A20 0%, #23262F 100%) !important; transition: background 0.7s; }</style>''', unsafe_allow_html=True)
elif ss["theme_mode"] == "light":
    st.markdown('''<style>body, [class*="stApp"] { background: linear-gradient(120deg, #F5F6FA 0%, #E3E6EC 100%) !important; color: #23262F !important; transition: background 0.7s; }</style>''', unsafe_allow_html=True)
else:  # neon
    st.markdown('''<style>body, [class*="stApp"] { background: linear-gradient(120deg, #181A20 0%, #4B8CFF 50%, #FF4B4B 100%) !important; animation: neonBG 8s ease-in-out infinite alternate; } @keyframes neonBG { 0%{background-position:0% 50%} 100%{background-position:100% 50%} }</style>''', unsafe_allow_html=True)

# --- Collapsible sidebar ---
if "sidebar_collapsed" not in ss:
    ss["sidebar_collapsed"] = False
if st.sidebar.button("⬅️" if not ss["sidebar_collapsed"] else "➡️", key="sidebar_collapse", help="Collapse/Expand sidebar", use_container_width=True):
    ss["sidebar_collapsed"] = not ss["sidebar_collapsed"]
if ss["sidebar_collapsed"]:
    st.markdown("<style>.stSidebar { width: 40px !important; min-width: 40px !important; overflow: hidden !important; transition: width 0.5s; }</style>", unsafe_allow_html=True)
else:
    st.markdown("<style>.stSidebar { width: 320px !important; min-width: 320px !important; transition: width 0.5s; }</style>", unsafe_allow_html=True)

# --- Live market ticker ---
import yfinance as yf
import time
from datetime import datetime
assets_ticker = ["AAPL", "SPY", "BTC-USD"]
ticker_data = {}
for t in assets_ticker:
    try:
        ticker_data[t] = yf.Ticker(t).history(period="1d", interval="1m").tail(1)["Close"].values[0]
    except Exception:
        ticker_data[t] = "-"
now = datetime.now().strftime("%H:%M:%S")
st.sidebar.markdown(f"""
<div style='background:rgba(31,34,42,0.7); border-radius:12px; padding:0.7rem 1rem; margin-bottom:1rem; font-size:1.1rem;'>
    <b>Live Ticker ({now})</b><br>
    <span style='color:#00FFCC;'>AAPL</span>: {ticker_data['AAPL']} &nbsp; <span style='color:#4B8CFF;'>SPY</span>: {ticker_data['SPY']} &nbsp; <span style='color:#FF4B4B;'>BTC</span>: {ticker_data['BTC-USD']}
</div>
""", unsafe_allow_html=True)

# --- Mini sparklines for each asset (no Plotly modebar) ---
spark_assets = ["AAPL", "SPY", "TSLA", "NVDA"]
sparkline_data = {}
for t in spark_assets:
    try:
        hist = yf.Ticker(t).history(period="5d", interval="1h")
        sparkline_data[t] = hist["Close"].values[-24:]
    except Exception:
        sparkline_data[t] = [None]*24
spark_cols = st.sidebar.columns(len(spark_assets))
for i, t in enumerate(spark_assets):
    with spark_cols[i]:
        fig = go.Figure(go.Scatter(y=sparkline_data[t], mode="lines", line=dict(color="#00FFCC", width=2)))
        fig.update_layout(
            xaxis=dict(visible=False), yaxis=dict(visible=False),
            margin=dict(l=0, r=0, t=0, b=0),
            height=40, width=80,
            plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)"
        )
        st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})
        st.markdown(f"<div style='text-align:center; color:#A3A6B1; font-size:0.9rem;'>{t}</div>", unsafe_allow_html=True)

# --- Lottie animation loader for backtest runs ---
import streamlit.components.v1 as components
lottie_url = "https://assets2.lottiefiles.com/packages/lf20_4kx2q32n.json"
def lottie_loader():
    components.html(f"""
    <div style='display:flex; justify-content:center; align-items:center; height:120px;'>
      <lottie-player src='{lottie_url}' background='transparent' speed='1' style='width: 120px; height: 120px;' loop autoplay></lottie-player>
    </div>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    """, height=140)
# Usage: lottie_loader() inside st.spinner or before a long task

# --- Animated toast notifications (placeholder, Streamlit native toasts) ---
def show_toast(msg, type_="info"):
    if type_ == "success": st.success(msg)
    elif type_ == "error": st.error(msg)
    elif type_ == "warning": st.warning(msg)
    else: st.info(msg)

# --- Download button for PDF/PNG (placeholder, Streamlit native) ---
# (Implement with st.download_button after plot rendering)

# --- Animated plot transitions (Plotly) ---
# (Use Plotly's frame/animation features for equity curve if desired)

# --- Micro-interactions, keyboard shortcuts, session history, tooltips, 404 state ---
# (Add as comments/placeholders; most require full web stack or Streamlit custom components)

real_assets = ["AAPL", "GOOG", "SPY", "TSLA", "MSFT", "AMZN", "NVDA", "META"]
real_features = ["RSI", "Momentum", "ATR", "Volume", "SMA"]

st.sidebar.title("Strategy Selection")
strategies = st.sidebar.multiselect("Select strategies", ["Momentum", "Pairs", "ML Factor"])
asset = st.sidebar.selectbox("Select asset", real_assets, index=0)
start_date, end_date = st.sidebar.date_input(
    "Date range",
    value=(date(2024, 1, 1), date.today()),
    min_value=date(2000, 1, 1),
    max_value=date.today()
)
method = st.sidebar.selectbox("Allocation Method", ["MV", "HRP", "Black-Litterman"])

run = st.sidebar.button("Run Backtest")

tabs = st.tabs([
    "📈 Equity Curve",
    "🔥 Drawdown Heatmap",
    "📊 Allocations",
    "🧬 SHAP Explain"
])

# --- Animated metric counters (count up) ---
def animated_metric(label, value, key):
    if f"_metric_{key}" not in ss:
        ss[f"_metric_{key}"] = 0
    if ss[f"_metric_{key}"] != value:
        step = (value - ss[f"_metric_{key}"]) / 20
        for i in range(1, 21):
            ss[f"_metric_{key}"] += step
            st.metric(label, f"{ss[f'_metric_{key}']:.2f}")
            time.sleep(0.01)
    st.metric(label, f"{value:.2f}")

if run:
    run_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    run_id = str(uuid.uuid4())[:8]
    st.success(
        f"Backtest running with: Strategies={strategies}, Asset={asset}, Date Range={start_date} to {end_date}, Method={method} (Run at {run_time}, ID: {run_id})"
    )
    with st.spinner("Fetching real price data from yfinance..."):
        try:
            # Only fetch all assets for allocations and SHAP
            df_all = yf.download(real_assets, start=str(start_date), end=str(end_date))
            # For equity curve, use selected asset and SPY
            tickers = [asset, "SPY"] if asset != "SPY" else [asset]
            ticker_arg = tickers if len(tickers) > 1 else tickers[0]
            df = yf.download(ticker_arg, start=str(start_date), end=str(end_date))
            st.write(f"Fetched data for: {', '.join(tickers)}")
        except Exception as e:
            st.error(f"Error fetching data: {e}")
            df = None
            df_all = None
    # Modern equity curve with drawdown and metrics (Plotly, static)
    with tabs[0]:
        st.markdown("<div class='stCard'>", unsafe_allow_html=True)
        st.markdown(f"### 📈 Equity Curve (Run ID: {run_id})")
        st.caption(f"Cumulative returns for <b>{asset}</b> vs. <b>SPY</b> benchmark. Drawdown shaded in purple.", unsafe_allow_html=True)
        if df is not None:
            try:
                # Get prices for selected asset and SPY
                if asset == "SPY":
                    prices = df['Close']
                    prices_bench = df['Close']
                else:
                    prices = df['Close'][asset]
                    prices_bench = df['Close']['SPY']
                returns = prices.pct_change().fillna(0)
                returns_bench = prices_bench.pct_change().fillna(0)
                equity_curve = (1 + returns).cumprod()
                equity_bench = (1 + returns_bench).cumprod()
                drawdown = (equity_curve / equity_curve.cummax()) - 1
                # Metrics
                max_dd = drawdown.min()
                total_return = equity_curve.iloc[-1] / equity_curve.iloc[0] - 1
                total_return_bench = equity_bench.iloc[-1] / equity_bench.iloc[0] - 1
                # Static Plotly figure
                fig = go.Figure()
                fig.add_trace(go.Scatter(x=equity_curve.index, y=equity_curve, mode='lines', name=f"{asset} Strategy", line=dict(color='#00FFCC', width=2)))
                fig.add_trace(go.Scatter(x=equity_bench.index, y=equity_bench, mode='lines', name="SPY Benchmark", line=dict(color='#4B8CFF', width=2, dash='dot')))
                fig.add_trace(go.Scatter(x=drawdown.index, y=drawdown, fill='tozeroy', name='Drawdown', line=dict(color='purple', width=0), opacity=0.3, yaxis='y2'))
                fig.update_layout(
                    template='plotly_dark',
                    plot_bgcolor='#18191A',
                    paper_bgcolor='#18191A',
                    font=dict(color='#F5F6FA'),
                    yaxis=dict(title='Equity', side='left'),
                    yaxis2=dict(title='Drawdown', overlaying='y', side='right', showgrid=False, range=[-1, 0]),
                    legend=dict(orientation='h', yanchor='bottom', y=1.02, xanchor='right', x=1),
                    margin=dict(l=20, r=20, t=40, b=20)
                )
                st.plotly_chart(fig, use_container_width=True)
                # Static metrics row
                col1, col2, col3 = st.columns(3)
                col1.metric("🩸 Max Drawdown", f"{max_dd:.2%}")
                col2.metric(f"{asset} Total Return", f"{total_return:.2%}")
                col3.metric("SPY Total Return", f"{total_return_bench:.2%}")
            except Exception as e:
                st.error(f"Error computing equity curve: {e}")
        else:
            show_404()
        st.markdown("</div>", unsafe_allow_html=True)
    # Drawdown Heatmap (Plotly, card)
    with tabs[1]:
        st.markdown("<div class='stCard'>", unsafe_allow_html=True)
        st.markdown("### 🔥 Drawdown Heatmap")
        # Example: simulated heatmap (replace with real data as needed)
        data = np.random.rand(8, 10)
        fig = go.Figure(data=go.Heatmap(z=data, x=[f"T{i+1}" for i in range(10)], y=real_assets, colorscale='RdBu', colorbar=dict(title='Drawdown')))
        fig.update_layout(
            template='plotly_dark',
            plot_bgcolor='#23262F',
            paper_bgcolor='#23262F',
            font=dict(color='#F5F6FA'),
            margin=dict(l=20, r=20, t=40, b=20)
        )
        st.plotly_chart(fig, use_container_width=True)
        st.markdown("</div>", unsafe_allow_html=True)
    # Allocations tab: real portfolio weights (Plotly)
    with tabs[2]:
        st.markdown("<div class='stCard'>", unsafe_allow_html=True)
        st.markdown("### 📊 Portfolio Allocations (PyPortfolioOpt, Min Volatility)")
        if df_all is not None:
            try:
                prices = df_all['Close']
                prices = prices.dropna(axis=1, how='all')
                prices = prices.loc[:, prices.nunique() > 1]
                if prices.shape[1] < 2:
                    st.warning("Need at least 2 assets with valid data for allocation optimization.")
                else:
                    returns = prices.pct_change().dropna()
                    mu = expected_returns.mean_historical_return(prices)
                    S = risk_models.sample_cov(prices)
                    ef = EfficientFrontier(mu, S)
                    ef.min_volatility()
                    weights = ef.clean_weights()
                    alloc_df = pd.DataFrame(list(weights.items()), columns=["Asset", "Weight"])
                    alloc_df = alloc_df.sort_values("Weight", ascending=True)
                    fig = go.Figure(data=[go.Bar(
                        y=alloc_df["Asset"],
                        x=alloc_df["Weight"],
                        orientation='h',
                        marker=dict(color="#00FFCC"),
                        hoverinfo='x+y',
                    )])
                    fig.update_layout(
                        template='plotly_dark',
                        plot_bgcolor='#23262F',
                        paper_bgcolor='#23262F',
                        font=dict(color='#F5F6FA'),
                        xaxis=dict(title='Weight'),
                        yaxis=dict(title='Asset'),
                        margin=dict(l=20, r=20, t=40, b=20)
                    )
                    st.plotly_chart(fig, use_container_width=True)
                    if max(weights.values()) == 1.0:
                        st.info("Note: The optimizer allocated 100% to a single asset. This can happen if one asset dominates risk/return.")
            except Exception as e:
                st.error(f"Error computing allocations: {e}")
        else:
            st.warning("No data to compute allocations.")
        st.markdown("</div>", unsafe_allow_html=True)
    # SHAP Explain tab: real feature importances (Plotly)
    with tabs[3]:
        st.markdown("<div class='stCard'>", unsafe_allow_html=True)
        st.markdown(f"### 🧬 SHAP Explain (Run ID: {run_id})")
        st.caption(f"Feature importances for <b>{asset}</b> using RandomForestClassifier and SHAP.", unsafe_allow_html=True)
        if df_all is not None:
            try:
                # Feature engineering for selected asset
                close = df_all['Close'][asset]
                high = df_all['High'][asset]
                low = df_all['Low'][asset]
                volume = df_all['Volume'][asset]
                df_feat = pd.DataFrame({
                    'close': close,
                    'high': high,
                    'low': low,
                    'volume': volume
                })
                # RSI
                delta = df_feat['close'].diff()
                gain = (delta.where(delta > 0, 0)).rolling(14).mean()
                loss = (-delta.where(delta < 0, 0)).rolling(14).mean()
                rs = gain / loss
                df_feat['RSI'] = 100 - (100 / (1 + rs))
                # Momentum (21-day return)
                df_feat['Momentum'] = df_feat['close'].pct_change(21)
                # ATR
                high_low = df_feat['high'] - df_feat['low']
                high_close = np.abs(df_feat['high'] - df_feat['close'].shift())
                low_close = np.abs(df_feat['low'] - df_feat['close'].shift())
                ranges = pd.concat([high_low, high_close, low_close], axis=1)
                df_feat['ATR'] = ranges.max(axis=1).rolling(14).mean()
                # SMA
                df_feat['SMA'] = df_feat['close'].rolling(20).mean()
                # Volume (normalized)
                df_feat['Volume'] = (df_feat['volume'] - df_feat['volume'].mean()) / df_feat['volume'].std()
                # Drop NA
                df_feat = df_feat.dropna()
                # Target: next-day up/down
                df_feat['target'] = (df_feat['close'].shift(-1) > df_feat['close']).astype(int)
                X = df_feat[['RSI', 'Momentum', 'ATR', 'SMA', 'Volume']]
                y = df_feat['target']
                if X.shape[0] < 50 or y.nunique() < 2:
                    st.warning("Not enough data or target class imbalance for SHAP analysis.")
                else:
                    # Train model
                    model = RandomForestClassifier(n_estimators=100, random_state=42)
                    model.fit(X, y)
                    # SHAP values
                    explainer = shap.TreeExplainer(model)
                    try:
                        shap_values = explainer.shap_values(X)
                        # For binary classification, shap_values is a list
                        if isinstance(shap_values, list):
                            # Prefer class 1 if available
                            if len(shap_values) > 1 and shap_values[1].shape == X.shape:
                                shap_arr = shap_values[1]
                            elif len(shap_values) == 1 and shap_values[0].shape == X.shape:
                                shap_arr = shap_values[0]
                            else:
                                shap_arr = None
                            if shap_arr is not None:
                                # Plotly SHAP summary
                                shap_df = pd.DataFrame(shap_arr, columns=X.columns)
                                mean_abs = shap_df.abs().mean().sort_values(ascending=True)
                                fig = go.Figure(data=[go.Bar(
                                    x=mean_abs.values,
                                    y=mean_abs.index,
                                    orientation='h',
                                    marker=dict(color="#4B8CFF"),
                                    hoverinfo='x+y',
                                )])
                                fig.update_layout(
                                    template='plotly_dark',
                                    plot_bgcolor='#23262F',
                                    paper_bgcolor='#23262F',
                                    font=dict(color='#F5F6FA'),
                                    xaxis=dict(title='Mean |SHAP value|'),
                                    yaxis=dict(title='Feature'),
                                    margin=dict(l=20, r=20, t=40, b=20)
                                )
                                st.plotly_chart(fig, use_container_width=True)
                            else:
                                st.error("SHAP output shape does not match features. Try a different asset or more data.")
                        else:
                            if shap_values.shape == X.shape:
                                shap_df = pd.DataFrame(shap_values, columns=X.columns)
                                mean_abs = shap_df.abs().mean().sort_values(ascending=True)
                                fig = go.Figure(data=[go.Bar(
                                    x=mean_abs.values,
                                    y=mean_abs.index,
                                    orientation='h',
                                    marker=dict(color="#4B8CFF"),
                                    hoverinfo='x+y',
                                )])
                                fig.update_layout(
                                    template='plotly_dark',
                                    plot_bgcolor='#23262F',
                                    paper_bgcolor='#23262F',
                                    font=dict(color='#F5F6FA'),
                                    xaxis=dict(title='Mean |SHAP value|'),
                                    yaxis=dict(title='Feature'),
                                    margin=dict(l=20, r=20, t=40, b=20)
                                )
                                st.plotly_chart(fig, use_container_width=True)
                            else:
                                st.error("SHAP output shape does not match features. Try a different asset or more data.")
                    except Exception as shap_e:
                        if 'max load' in str(shap_e).lower() or 'memory' in str(shap_e).lower():
                            st.error("SHAP failed due to memory or max load. Try a shorter date range or fewer features.")
                        else:
                            st.error(f"Error computing SHAP values: {shap_e}")
            except Exception as e:
                st.error(f"Error computing SHAP values: {e}")
        else:
            st.warning("No data to compute SHAP values.")
        st.markdown("</div>", unsafe_allow_html=True)
else:
    with tabs[0]:
        st.write("Equity Curve plot here")
    with tabs[1]:
        st.write("Drawdown Heatmap here")
    with tabs[2]:
        st.write("Allocations plot here")
    with tabs[3]:
        st.write("SHAP Explain plot here")

# --- Live news ticker (placeholder) ---
news_headlines = [
    "Fed signals rate pause as inflation cools",
    "Apple unveils new AI chip for iPhone",
    "Tesla Q2 deliveries beat expectations",
    "Bitcoin tops $70,000 for first time"
]
import random
headline = random.choice(news_headlines)
st.sidebar.markdown(f"""
<div style='background:rgba(31,34,42,0.7); border-radius:12px; padding:0.7rem 1rem; margin-bottom:1rem; font-size:1.1rem; overflow:hidden; white-space:nowrap;'>
    <marquee behavior='scroll' direction='left' scrollamount='6' style='color:#FF4B4B;'>{headline}</marquee>
</div>
""", unsafe_allow_html=True)

# --- Confetti/fireworks on successful backtest ---
def show_confetti():
    components.html("""
    <script src='https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js'></script>
    <script>confetti({particleCount: 200, spread: 90, origin: { y: 0.6 }});</script>
    """, height=0)

# --- Animated 404/empty state (Lottie) ---
def show_404():
    components.html("""
    <div style='display:flex; justify-content:center; align-items:center; height:200px;'>
      <lottie-player src='https://assets2.lottiefiles.com/packages/lf20_4kx2q32n.json' background='transparent' speed='1' style='width: 200px; height: 200px;' loop autoplay></lottie-player>
    </div>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    """, height=220)

# --- Animate plot transitions (Plotly) ---
# (Use Plotly's frame/animation features for equity curve if desired; placeholder for now)

# --- Micro-interactions, transitions, polish ---
# (Add CSS for button hover, tab fade, etc. Most advanced transitions require custom JS or a full web stack.) 