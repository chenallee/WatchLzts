import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { CSSReset, ThemeProvider, theme, ColorModeProvider, PseudoBox } from "@chakra-ui/core";

import customColors from './utils/colors';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    ...customColors,
  }
};

ReactDOM.render(
  <React.StrictMode>
     <ThemeProvider theme={customTheme} >
      <ColorModeProvider>
      <CSSReset />
    <App />
    </ColorModeProvider>
     </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
