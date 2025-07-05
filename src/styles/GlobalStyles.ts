import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

  :root {
    --primary-color: #000000;
    --secondary-color: #FFFFFF;
    --background-color: #FFFFFF;
    --text-color: #000000;
    --accent-color: #000000;
    --error-color: #FF0000;
    --success-color: #000000;
    --spacing-unit: 8px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: 'Orbitron', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.4;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6, p, a, button, span {
    font-family: 'Orbitron', sans-serif;
    letter-spacing: -0.02em;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'Orbitron', sans-serif;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }
`;

export default GlobalStyles; 