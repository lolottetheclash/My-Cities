import { Link, useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const { userStore } = useStores();
    const isUrl = (pathname: string): boolean => {
      return location.pathname === pathname;
    };
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
                  userStore.currentUserId &&
                  userStore.logOutUser(userStore.currentUserId)
                }
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Typography variant="subtitle1">Logout</Typography>
              </Link>
            ) : (
              !isUrl('/signin') && (
                <Link
                  to="/signin"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <Typography variant="subtitle1">Login</Typography>
                </Link>
              )
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
);

export default NavBar;
