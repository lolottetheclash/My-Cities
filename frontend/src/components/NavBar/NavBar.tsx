import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import './NavBar.css';
import theme from '../../Theme';
import { useStores } from '../../stores';

const useStyles = makeStyles({
  AppBar: {
    backgroundColor: theme.palette.primary.dark,
  },
  Toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  HomeIcon: {
    color: 'white',
    marginRight: '10px',
  },
});

const NavBar = observer(
  (): JSX.Element => {
    const classes = useStyles();
    const { userStore } = useStores();
    return (
      <div className="navbar-container">
        <AppBar position="static" classes={{ root: classes.AppBar }}>
          <Toolbar classes={{ root: classes.Toolbar }}>
            <div className="navbar-home">
              <Link to="/">
                <HomeIcon classes={{ root: classes.HomeIcon }} />
              </Link>
              <Typography variant="h6">My Cities</Typography>
            </div>
            {userStore.isUserLogged ? (
              <Link
                to="/"
                onClick={() =>
                  userStore.currentUser &&
                  // eslint-disable-next-line no-underscore-dangle
                  userStore.logOutUser(userStore.currentUser._id)
                }
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Typography variant="subtitle1">Logout</Typography>
              </Link>
            ) : (
              <Link
                to="/signin"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Typography variant="subtitle1">Login</Typography>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
);

export default NavBar;
