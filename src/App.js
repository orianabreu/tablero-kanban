import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Column from './components/Column';

function App() {
  return (
    <div className='ColumnContainer'>
      <ThemeProvider theme={theme}>
        <Column />
      </ThemeProvider>
    </div>
  );
}

export default App;
