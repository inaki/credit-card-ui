import React, { Component } from 'react';
import Checkout from './components/Checkout';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import theme from './theme';

const styles = theme => ({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.container}>
          <Checkout />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
