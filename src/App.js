import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Column from './components/Column';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className='ColumnContainer'>
      <ThemeProvider theme={theme}>

        <DndProvider backend={HTML5Backend}>

          <Column />
          <Column />
          
        </DndProvider>  

      </ThemeProvider>
    </div>
  );
}

export default App;
