import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Global/Styles/global.css';
import { BrowserRouter } from 'react-router-dom';
import Roteamento from './Routes/index';
import { GlobalContextProvider } from './Contexts/GlobalContext';
import { UserContextProvider } from './Contexts/UserContext';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <GlobalContextProvider>
          <UserContextProvider>
            <Roteamento />
          </UserContextProvider>
        </GlobalContextProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;