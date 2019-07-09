import React from 'react';
import './App.css';
import routes from './routes';
import Nav from './Components/Nav/Nav';

// https://github.com/esellors/simulation-3
// Add missing competencies
// Design site

function App() {
  return (
    <div>
      <Nav />
      {routes}
    </div>
  );
}

export default App;
