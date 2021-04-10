import { observer, useLocalObservable } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input, InputAdornment, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import './SignUp.css';
import theme from '../../Theme';

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

interface ILocalStore {
  password: string;
  isPasswordVisible: boolean;
  setPassword: (password: Readonly<string>) => void;
  setPasswordVisibility: (isVisible: Readonly<boolean>) => void;
}

const LogUp = observer(
  (): JSX.Element => {
    const classes = useStyles();
    const localState: ILocalStore = useLocalObservable(() => ({
      password: '',
      isPasswordVisible: false,
      setPassword: (password) => {
        localState.password = password;
      },
      setPasswordVisibility: (isVisible) => {
        localState.isPasswordVisible = isVisible;
      },
    }));

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      localState.setPassword(e.target.value);
    };

    const handlePasswordVisibility = () => {
      localState.setPasswordVisibility(!localState.isPasswordVisible);
    };

    return (
      <div className="signup-container">
        <div className="signup-avatar">
          <AccountCircleIcon className={classes.AccountCircleIcon} />
        </div>
        <Typography variant="h5" gutterBottom className={classes.h5}>
          Sign Up
        </Typography>
        <form className="signup-form">
          <Input
            className={classes.input}
            id="input-with-icon-adornment-1"
            placeholder="Pseudo"
            autoComplete="off"
            fullWidth
            startAdornment={
              <InputAdornment position="start" className={classes.icon}>
                <PersonOutlineIcon />
              </InputAdornment>
            }
          />
          <Input
            className={classes.input}
            id="input-with-icon-adornment-2"
            placeholder="Email"
            autoComplete="off"
            fullWidth
            startAdornment={
              <InputAdornment position="start" className={classes.icon}>
                <MailOutlineIcon />
              </InputAdornment>
            }
          />
          <Input
            className={classes.input}
            id="input-with-icon-adornment-3"
            placeholder="Password"
            fullWidth
            onChange={handlePasswordChange}
            value={localState.password}
            type={localState.isPasswordVisible ? 'text' : 'password'}
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
                  {localState.isPasswordVisible ? (
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
            Sign Up
          </Button>
          <div className="signup-account">
            <Typography variant="subtitle2" className={classes.subtitle2}>
              Already member?
            </Typography>
            <Link to="/signin" className="signin-link">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    );
  }
);

export default LogUp;
