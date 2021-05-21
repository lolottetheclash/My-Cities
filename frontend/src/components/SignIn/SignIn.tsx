import { Observer, useLocalObservable } from 'mobx-react-lite';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import { Input, InputAdornment, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import { useStores } from '../../stores';
import SignInSchema from './SignInSchema';
import SnackBar from '../SnackBar/SnackBar';

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
    marginTop: '25px',
    color: 'white',
  },
  icon: {
    color: theme.palette.primary.main,
  },
  eyeIcon: {
    fontSize: '16px',
  },
  button: {
    margin: '35px 0 15px 0',
  },
  subtitle2: {
    color: theme.palette.primary.dark,
  },
});

interface ILocalStore {
  isPasswordVisible: boolean;
  setPasswordVisibility: (isVisible: Readonly<boolean>) => void;
  signInError: string | null;
}

interface ILoginData {
  email: string;
  password: string;
}

const SignIn = (): JSX.Element => {
  const classes = useStyles();
  const { userStore } = useStores();
  const history = useHistory();
  const localState: ILocalStore = useLocalObservable(() => ({
    isPasswordVisible: false,
    setPasswordVisibility: (isVisible) => {
      localState.isPasswordVisible = isVisible;
    },
    signInError: null,
  }));

  const handlePasswordVisibility = (): void => {
    localState.setPasswordVisibility(!localState.isPasswordVisible);
  };

  const handleUserLogin = async (credentials: ILoginData): Promise<void> => {
    console.log('lalala credentials ', credentials);
    await userStore.logUser(credentials);
    if (userStore.isUserLogged) {
      history.push('/travels');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-avatar">
        <AccountCircleIcon className={classes.AccountCircleIcon} />
      </div>
      <Typography variant="h5" gutterBottom className={classes.h5}>
        Sign In
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(credentials: ILoginData) => handleUserLogin(credentials)}
      >
        {({ handleChange, handleSubmit, errors, touched }) => (
          <Observer>
            {() => (
              <div className="signin-form">
                <Input
                  className={classes.input}
                  id="input-with-icon-adornment-1"
                  placeholder="Email"
                  onChange={handleChange('email')}
                  fullWidth
                  autoComplete="off"
                  startAdornment={
                    <InputAdornment position="start" className={classes.icon}>
                      <MailOutlineIcon />
                    </InputAdornment>
                  }
                />
                {errors.email && touched.email && (
                  <p className="input-error">{errors.email}</p>
                )}
                <Input
                  className={classes.input}
                  id="input-with-icon-adornment-2"
                  placeholder="Password"
                  onChange={handleChange('password')}
                  fullWidth
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
                {errors.password && touched.password && (
                  <p className="input-error">{errors.password}</p>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  type="submit"
                  onClick={() => handleSubmit()}
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
              </div>
            )}
          </Observer>
        )}
      </Formik>
      <Observer>
        {() => (
          <SnackBar
            open={Boolean(userStore.error)}
            message={userStore.error}
            severity="error"
            onClose={() => userStore.setError(null)}
          />
        )}
      </Observer>
    </div>
  );
};
export default SignIn;
