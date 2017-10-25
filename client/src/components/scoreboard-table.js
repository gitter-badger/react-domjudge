import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';

import {red, lightGreen, orange} from 'material-ui/colors';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

const cellwidth = 60;
const styles = () => ({
  root: {
    overflowX: 'scroll',
    maxWidth: '100%',
  },
  row: {
    textAlign: 'center',
    fontSize: 24,
    display: 'block',
    whiteSpace: 'nowrap',
    margin: '5px 0px',
  },
  cell: {
    display: 'inline-block',
    padding: '5px 0px',
    verticalAlign: 'top',
  },
  rank: {
    width: 70,
    marginRight: 3,
  },
  ranktext: {
    padding: '16px 0px',
  },
  team: {
    width: 350,
    paddingLeft: 10, paddingRight: 10,
    marginLeft: 3, marginRight: 3,
    textAlign: 'center',
  },
  teaminfo: {
    borderRadius: 5,
  },
  teamname: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  affil: {
    fontSize: 16,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  problem: {
    width: cellwidth,
    marginLeft: 3, marginRight: 3,
  },
  score: {
    width: cellwidth,
    marginLeft: 3, marginRight: 3,
    borderRadius: 5,
    color: '#fff',
  },
  firstsolve: {
    backgroundColor: lightGreen['A700'],
  },
  correct: {
    backgroundColor: lightGreen[400],
  },
  wrong: {
    backgroundColor: red[400],
  },
  pending: {
    backgroundColor: orange[400],
  },
  total: {
    width: cellwidth,
    margin: '0px 3px',
  },
  bignumber: {
    fontWeight: 'bold',
  },
  smallnumber: {
    fontSize: 16
  },
});

class ScoreboardTable extends React.Component {
  render() {
    const {scoreboard, t, classes} = this.props;
    const getClassByDetail = e => {
      if (e.is_first) return classes.firstsolve;
      if (e.is_correct) return classes.correct;
      if (e.pending) return classes.pending;
      if (e.submissions) return classes.wrong;
    };
    return (
      <div className={classes.root}>
        <div className={classes.row}>
          <div className={classNames(classes.cell, classes.rank)}>{t('scoreboard.rank')}</div>
          <div className={classNames(classes.cell, classes.team)}>{t('scoreboard.team')}</div>
          {scoreboard.problems.map((e, idx) => (
            <div key={idx} className={classNames(classes.cell, classes.problem)}>
              {e.shortname}
            </div>
          ))}
          <div className={classNames(classes.cell, classes.total)}></div>
        </div>
        {scoreboard.scoreboard.map(row => (
          <div className={classes.row} key={row.team.teamid}>
            <div className={classNames(classes.cell, classes.rank, classes.ranktext)}>{row.rank}</div>
            <div className={classNames(classes.cell, classes.team, classes.teaminfo)} style={{backgroundColor: row.team.color}}>
              <div className={classes.teamname}>{row.team.teamname}</div>
              <div className={classes.affil}>
                {row.team.country && <img src={`./flags/${row.team.country}.png`} alt={row.team.country} style={{height: '1em'}} />}
                {row.team.affilname || '\u00A0'}
              </div>
            </div>
            {row.detail.map((e, idx) => (
              <div key={idx} className={classNames(classes.cell, classes.score, getClassByDetail(e))}>
                <div className={classes.bignumber}>{e.submissions+e.pending ? e.submissions+e.pending : '\u00A0'}</div>
                <div className={classes.smallnumber}>{e.is_correct ? e.totaltime : '\u00A0'}</div>
              </div>
            ))}
            <div className={classNames(classes.cell, classes.total)}>
              <div className={classes.bignumber}>{row.points}</div>
              <div className={classes.smallnumber}>{row.totaltime}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ScoreboardTable.PropTypes = {
  scoreboard: PropTypes.object.isRequired,
};

export default withStyles(styles)(translate('translations')(ScoreboardTable));