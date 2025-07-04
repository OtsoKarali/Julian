import shap
import matplotlib.pyplot as plt

def plot_shap_summary(explainer, X):
    shap_values = explainer(X)
    shap.summary_plot(shap_values, X, show=False)
    plt.tight_layout()
    plt.savefig('shap_summary.png') 