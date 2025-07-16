import pandas as pd

def calculate_home_win_percentage(home_team: str, away_team: str, simulations_df: pd.DataFrame) -> float:

    home_sims = simulations_df[simulations_df['team'] == home_team]['results'].tolist()
    away_sims = simulations_df[simulations_df['team'] == away_team]['results'].tolist()
    
    sim_len = min(len(home_sims), len(away_sims))
    home_sims = home_sims[:sim_len]
    away_sims = away_sims[:sim_len]
    
    win_count = sum(h > a for h, a in zip(home_sims, away_sims))
    
    return 100.0 * win_count / sim_len if sim_len > 0 else 0
