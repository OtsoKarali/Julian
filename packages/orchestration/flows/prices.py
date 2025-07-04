from prefect import flow
import yfinance as yf
import duckdb

@flow(name="daily_prices")
def daily_prices(symbols: list[str], start: str, end: str):
    raw = yf.download(symbols, start=start, end=end, progress=False)
    tbl = duckdb.execute("CREATE OR REPLACE TABLE prices AS SELECT * FROM raw").fetchdf()
    return tbl 