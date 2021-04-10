import { Link } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import './NavBar.css';
import theme from '../../Theme';

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

const NavBar = (): JSX.Element => {
  const classes = useStyles();
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
          <Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="subtitle1">Connexion</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
