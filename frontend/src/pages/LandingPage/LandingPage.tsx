import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../../Theme';
import landing from '../../assets/landing.png';

import './LandingPage.css';

const useStyles = makeStyles({
  h3: {
    color: theme.palette.primary.main,
    fontWeight: 'bolder',
    marginBottom: '20px',
  },
  h5: {
    color: theme.palette.primary.main,
  },
});

const LandingPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className="landing-container">
      <Typography variant="h3" gutterBottom classes={{ root: classes.h3 }}>
        Welcome to My Cities
      </Typography>
      <Typography variant="h5" gutterBottom classes={{ root: classes.h5 }}>
        Get a head start on your next trips
      </Typography>
      <img src={landing} alt="Landing" className="landing-image" />
    </div>
  );
};

export default LandingPage;
