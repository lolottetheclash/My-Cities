import { Observer, observer, useLocalObservable } from 'mobx-react-lite';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import { Input, InputAdornment, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import { IUser } from '../../constants';
import { useStores } from '../../stores';
import SignUpSchema from './SignUpSchema';
import SnackBar from '../SnackBar/SnackBar';

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
}

const LogUp = observer(
  (): JSX.Element => {
    const classes = useStyles();
    const { userStore } = useStores();
    const history = useHistory();
    const localState: ILocalStore = useLocalObservable(() => ({
      isPasswordVisible: false,
      setPasswordVisibility: (isVisible) => {
        localState.isPasswordVisible = isVisible;
      },
    }));

    const handlePasswordVisibility = (): void => {
      localState.setPasswordVisibility(!localState.isPasswordVisible);
    };

    const handleUserCreation = async (user: IUser): Promise<void> => {
      await userStore.createUser(user);
      if (userStore.isUserCreated) {
        history.push('/signin');
      }
    };

    return (
      <div className="signup-container">
        <div className="signup-avatar">
          <AccountCircleIcon className={classes.AccountCircleIcon} />
        </div>
        <Typography variant="h5" gutterBottom className={classes.h5}>
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => handleUserCreation(values)}
        >
          {({ handleChange, handleSubmit, errors, touched }) => (
            <Observer>
              {() => (
                <div className="signup-form">
                  <Input
                    className={classes.input}
                    id="input-with-icon-adornment-1"
                    placeholder="FirstName"
                    onChange={handleChange('firstName')}
                    fullWidth
                    startAdornment={
                      <InputAdornment position="start" className={classes.icon}>
                        <PersonOutlineIcon />
                      </InputAdornment>
                    }
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="input-error">{errors.firstName}</p>
                  )}
                  <Input
                    className={classes.input}
                    id="input-with-icon-adornment-2"
                    placeholder="LastName"
                    onChange={handleChange('lastName')}
                    fullWidth
                    startAdornment={
                      <InputAdornment position="start" className={classes.icon}>
                        <PersonOutlineIcon />
                      </InputAdornment>
                    }
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="input-error">{errors.lastName}</p>
                  )}
                  <Input
                    className={classes.input}
                    id="input-with-icon-adornment-3"
                    placeholder="Email"
                    onChange={handleChange('email')}
                    fullWidth
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
                    id="input-with-icon-adornment-4"
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
                    Sign Up
                  </Button>
                  <div className="signup-account">
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle2}
                    >
                      Already member?
                    </Typography>
                    <Link to="/signin" className="signin-link">
                      Sign In
                    </Link>
                  </div>
                </div>
              )}
            </Observer>
          )}
        </Formik>
        <SnackBar
          open={Boolean(userStore.error)}
          message={userStore.error}
          severity="error"
          onClose={() => userStore.setError(null)}
        />
      </div>
    );
  }
);
export default LogUp;
