import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, InputAdornment, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

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
  eyeIcon: {
    fontSize: '16px',
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
  const [passwordState, setPasswordState] = useState({
    password: '',
    isPasswordVisible: false,
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordState({ ...passwordState, password: e.target.value });
  };

  const handlePasswordVisibility = () => {
    setPasswordState({
      ...passwordState,
      isPasswordVisible: !passwordState.isPasswordVisible,
    });
  };

  return (
    <div className="signin-container">
      <div className="signin-avatar">
        <AccountCircleIcon className={classes.AccountCircleIcon} />
      </div>
      <Typography variant="h5" gutterBottom className={classes.h5}>
        Sign In
      </Typography>
      <form className="signin-form">
        <Input
          className={classes.input}
          id="input-with-icon-adornment"
          placeholder="Email"
          fullWidth
          autoComplete="off"
          startAdornment={
            <InputAdornment position="start" className={classes.icon}>
              <MailOutlineIcon />
            </InputAdornment>
          }
        />

        <Input
          className={classes.input}
          id="input-with-icon-adornment"
          placeholder="Password"
          fullWidth
          onChange={handlePasswordChange}
          value={passwordState.password}
          type={passwordState.isPasswordVisible ? 'text' : 'password'}
          startAdornment={
            <InputAdornment position="start" className={classes.icon}>
              <LockIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                className={classes.icon}
                aria-label="toggle password visibility"
                onClick={handlePasswordVisibility}
              >
                {passwordState.isPasswordVisible ? (
                  <Visibility className={classes.eyeIcon} />
                ) : (
                  <VisibilityOff className={classes.eyeIcon} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
        >
          Sign In
        </Button>
        <div className="signin-account">
          <Typography variant="subtitle2" className={classes.subtitle2}>
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
