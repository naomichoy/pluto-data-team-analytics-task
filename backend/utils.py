def calculate_win_percentage(simulations, for_home=True):
    total = len(simulations)
    if total == 0:
        return 0.0
    wins = sum(1 for sim in simulations if sim['home_runs'] > sim['away_runs']) if for_home else \
           sum(1 for sim in simulations if sim['away_runs'] > sim['home_runs'])
    return (wins / total) * 100