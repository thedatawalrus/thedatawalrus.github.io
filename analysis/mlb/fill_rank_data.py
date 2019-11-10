import pandas as pd
from io import StringIO
from datetime import date

s = pd.read_csv('~/Documents/bbos6.0/team_record.tsv', sep='\t', parse_dates=[1], dayfirst=True, header=0)

s['original_date'] = pd.to_datetime(s['original_date'])


def expand_dates(ser):
    return pd.DataFrame({'original_date': pd.date_range(ser['original_date'].min(), ser['original_date'].max(), freq='D')})

newdf = s.groupby(['team']).apply(expand_dates).reset_index()\
          .merge(s, how='left')[['original_date','team','division','league','wins','losses','status']].ffill()


newdf['wins_minus_losses'] = newdf['wins']-newdf['losses']

newdf['league_rank'] = newdf.groupby(['original_date','league'])['wins_minus_losses'].rank(ascending=False, method='min')


newdf.to_csv(r'~/Documents/mlb/team_record.tsv', header=0, index=None, sep='\t', mode='a')