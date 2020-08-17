import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import { store } from "./store";
import WalksTable from "./components/fitressTracker/WalksTable"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="main-content">
        <div className="main-row">
          <div className="left-column">
            <div className="site-layout-content">
              <WalksTable/>
            </div>
          </div>
          <div className="right-column">
            col-18
            <div className="right-column-footer">

            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
