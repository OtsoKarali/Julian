from prefect import flow

@flow(name="walk_forward_optimisation")
def walk_forward_optimisation():
    # 1. Split data into rolling windows (3y IS / 1y OS)
    # 2. Hyper-opt strategy params with Optuna
    # 3. Append OS equity curve to analytics/equity_os.parquet
    pass 