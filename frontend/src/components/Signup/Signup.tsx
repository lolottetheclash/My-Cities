import React from 'react';
import { Input, InputAdornment, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';

import './Signup.css';
import theme from '../../Theme';

const useStyles = makeStyles({
  root: {
    margin: '15px 0',
  },
  h5: {
    color: theme.palette.primary.main,
  },
  button: {
    margin: '15px 0',
  },
});

const Signup = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className="signup-container">
      <Typography variant="h5" gutterBottom className={classes.h5}>
        Sign Up
      </Typography>
      <form className="signup-form">
        <Input
          classes={{ root: classes.root }}
          id="input-with-icon-adornment"
          placeholder="Pseudo"
          startAdornment={
            <InputAdornment position="start">
              <PersonOutlineIcon />
            </InputAdornment>
          }
        />
        <Input
          classes={{ root: classes.root }}
          id="input-with-icon-adornment"
          placeholder="Email"
          startAdornment={
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
          }
        />
        <Input
          classes={{ root: classes.root }}
          id="input-with-icon-adornment"
          placeholder="Password"
          type="password"
          startAdornment={
            <InputAdornment position="start">
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
      </form>
    </div>
  );
};

export default Signup;
