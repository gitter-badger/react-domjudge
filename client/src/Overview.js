import React from 'react';
import PropTypes from 'prop-types';
import {translate, Trans} from 'react-i18next';

import moment from 'moment';

import {Typography, Grid, Paper} from 'material-ui';
import {LinearProgress} from 'material-ui/Progress';

import MyScore from './components/my-score';
import Submissions from './components/submissions';
import SubmitForm from './components/submit-form';
import Clarifications from './components/clarifications';
import ClarificationRequests from './components/clarification-requests';

import TimeSync from './TimeSync';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = {
      title: {paddingTop: 10, paddingBottom: 10, textAlign: 'center'}
    };
    const {contest, user, state, toast, t} = this.props;
    let {sidx, cidx, sbidx} = this.state;
    const start_date = moment(contest.starttime * 1000);
    const now = moment(TimeSync.getNow());
    let start_date_display;
    if (start_date.format('YYYYMMDD') === now.format('YYYYMMDD')) // today
      start_date_display = start_date.format(t('overview.near_date_format'));
    else
      start_date_display = start_date.format(t('overview.far_date_format'));
    return (
      <Grid container spacing={16} style={{padding: 14}}>
        {state === 0 &&
        <Grid item xs={12}>
          <Paper style={{padding: 16, textAlign: 'center'}}>
            <Typography type="display1">
              <Trans i18nKey="overview.welcome_team" teamname={user.teamname}>
                Welcome, <span style={{fontWeight: 700}}>{user.teamname}</span>!
              </Trans>
            </Typography>
            <Typography type="headline">{t('overview.start_schedule', {date: start_date_display})}</Typography>
          </Paper>
        </Grid>}
        {state === 2 &&
        <Grid item xs={12}>
          <Paper style={{padding: 16, textAlign: 'center'}}>
            <Typography type="display1">{t('overview.contest_finished')}</Typography>
          </Paper>
        </Grid>}
        {state !== 0 &&
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Paper style={{padding: 16, display: 'inline-block', minWidth: 200, maxWidth: '100%'}}>
            {this.state.myscore_loading && <LinearProgress />}
            <MyScore
              sbidx={sbidx}
              contest={contest}
              toast={toast}
              setLoading={val => this.setState({myscore_loading: val})} />
          </Paper>
        </Grid>}
        <Grid item xs={12} md={6}>
          <Grid container>
            {state !== 0 && <Grid item xs={12}>
              <Paper style={{padding: 16}}>
                {this.state.submitform_loading && <LinearProgress />}
                <Typography type="title" style={styles.title}>{t('overview.submitform_title')}</Typography>
                <SubmitForm
                  afterSubmit={() => this.setState({sidx: (sidx && ++sidx) || 1})}
                  contest={contest}
                  toast={toast}
                  setLoading={val => this.setState({submitform_loading: val})} />
              </Paper>
            </Grid>}
            <Grid item xs={12}>
              <Paper style={{padding: 16}}>
                {this.state.submission_loading && <LinearProgress />}
                <Typography type="title" style={styles.title}>{t('overview.submissions_title')}</Typography>
                <Submissions
                  sidx={sidx}
                  contest={contest}
                  toast={toast}
                  onUpdate={() => this.setState({sbidx: (sbidx && ++sbidx) || 1})}
                  setLoading={val => this.setState({submission_loading: val})} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={12}>
              <Paper style={{padding: 16}}>
                {this.state.clarifications_loading && <LinearProgress />}
                <Typography type="title" style={styles.title}>{t('overview.clarifications_title')}</Typography>
                <Clarifications
                  contest={contest}
                  toast={toast}
                  user={user}
                  afterSend={() => this.setState({cidx: (cidx && ++cidx) || 1})}
                  setLoading={val => this.setState({clarifications_loading: val})} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{padding: 16}}>
                {this.state.clarification_requests_loading && <LinearProgress />}
                <Typography type="title" style={styles.title}>{t('overview.clarification_requests_title')}</Typography>
                <ClarificationRequests
                  cidx={cidx}
                  contest={contest}
                  toast={toast}
                  user={user}
                  setLoading={val => this.setState({clarification_requests_loading: val})} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Overview.PropTypes = {
  toast: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  contest: PropTypes.object.isRequired,
  state: PropTypes.number.isRequired,
};

export default translate('translations')(Overview);
