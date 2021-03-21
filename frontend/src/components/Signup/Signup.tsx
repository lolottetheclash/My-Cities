import { Link } from 'react-router-dom';
import { Input, InputAdornment, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
  button: {
    margin: '25px 0 15px 0',
  },
  subtitle2: {
    color: theme.palette.primary.dark,
  },
});

const Signup = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className="signup-container">
      <div className="signup-avatar">
        <AccountCircleIcon classes={{ root: classes.AccountCircleIcon }} />
      </div>
      <Typography variant="h5" gutterBottom classes={{ root: classes.h5 }}>
        Sign Up
      </Typography>
      <form className="signup-form">
        <Input
          classes={{ root: classes.input }}
          id="input-with-icon-adornment"
          placeholder="Pseudo"
          autoComplete="off"
          fullWidth
          startAdornment={
            <InputAdornment position="start" classes={{ root: classes.icon }}>
              <PersonOutlineIcon />
            </InputAdornment>
          }
        />
        <Input
          classes={{ root: classes.input }}
          id="input-with-icon-adornment"
          placeholder="Email"
          autoComplete="off"
          fullWidth
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
          Sign Up
        </Button>
        <div className="signup-account">
          <Typography variant="subtitle2" classes={{ root: classes.subtitle2 }}>
            Already member?
          </Typography>
          <Link to="/signin" className="signin-link">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
