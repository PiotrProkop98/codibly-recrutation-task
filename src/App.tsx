import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


import Main from './pages/Main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Main />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
