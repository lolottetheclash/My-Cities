import { Link } from 'react-router-dom';
import { Input, InputAdornment, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import theme from '../../Theme';
import './SignIn.css';

// Specific styles for MUI components
const useStyles = makeStyles({
  AccountCircleIcon: {
    color: 'white',
    fontSize: '100px',
  },
  h5: {
    color: theme.palette.primary.main,
    margin: '50px 0 20px 0',
    fontWeight: 'bolder',
  },
  input: {
    margin: '20px 0',
    color: 'white',
  },
  icon: {
    color: theme.palette.primary.main,
  },
  button: {
    margin: '25px 0 15px 0',
  },
  subtitle2: {
    color: theme.palette.primary.dark,
  },
});

const SignIn = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className="signin-container">
      <div className="signin-avatar">
        <AccountCircleIcon classes={{ root: classes.AccountCircleIcon }} />
      </div>
      <Typography variant="h5" gutterBottom classes={{ root: classes.h5 }}>
        Sign In
      </Typography>
      <form className="signin-form">
        <Input
          classes={{ root: classes.input }}
          id="input-with-icon-adornment"
          placeholder="Email"
          fullWidth
          autoComplete="off"
          startAdornment={
            <InputAdornment position="start" classes={{ root: classes.icon }}>
              <MailOutlineIcon />
            </InputAdornment>
          }
        />
        <Input
          classes={{ root: classes.input }}
          id="input-with-icon-adornment"
          placeholder="Password"
          type="password"
          fullWidth
          startAdornment={
            <InputAdornment position="start" classes={{ root: classes.icon }}>
              <LockIcon />
            </InputAdornment>
          }
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          classes={{ root: classes.button }}
        >
          Sign In
        </Button>
        <div className="signin-account">
          <Typography variant="subtitle2" classes={{ root: classes.subtitle2 }}>
            Don't have an account yet?
          </Typography>
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
