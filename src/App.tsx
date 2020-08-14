import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Provider } from "react-redux";
import { store } from "./store";
import WalksList from "./components/fitressTracker/WalksList"
import WalkAdd from "./components/fitressTracker/WalkAdd"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="main-content">
        <div className="main-row">
          <div className="left-column">
            <div className="site-layout-content">
              <WalksList/>
            </div>
            <div  className="left-column-footer">
              <WalkAdd/>
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
