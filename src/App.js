import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import {Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Open Sans, sans-serif',
    },
    root: {
      backgroundColor: "#fff",
    }
  });
  
  return (
    <ThemeProvider theme={theme}>
      <div className={theme.root}>
        <CssBaseline />
        <Route exact path='/'>
          <HomePage/>
        </Route>
        <Route path='/about'>
          <AboutPage/>
        </Route>
      </div>  
    </ThemeProvider>
  );
}