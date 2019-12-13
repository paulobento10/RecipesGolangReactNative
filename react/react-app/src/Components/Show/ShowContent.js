import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  paper: {
    maxWidth: 1200,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function ShowContent(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid item xs={1}>
            <MenuIcon color="inherit" 
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained" 
            onClick={handleClick} 
            />
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
              <Typography color="textSecondary" align="center">Meal Type ></Typography>
              <StyledMenuItem>
                <ListItemText primary="Appetizers & Snacks"/>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText primary="Breakfast & Brunch" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText primary="Desserts" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText primary="Dinner" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText primary="Drinks" />
              </StyledMenuItem>
            </StyledMenu>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10}>
              <TextField
                fullWidth
                placeholder="Search by name or ingredient"  //a pesquisa por ingredientes pode ser como este site usa https://www.allrecipes.com/
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            <Grid item >
              <Button variant="outlined" /*onClick(função de get de receitas)*/>
                Search
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

ShowContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowContent);