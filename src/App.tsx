import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import { store } from "./store";
import WalksTable from "./components/fitressTracker/WalksTable"
import WalksInfo from "./components/fitressTracker/WalksInfo"
import Chart from "./components/fitressTracker/WalkChart"
import { StyledRightColumn, StyledRightColumnHeader } from './stuled'

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
          <StyledRightColumn>
            <StyledRightColumnHeader>
              Суммарная активность
            </StyledRightColumnHeader>
              <Chart/>
            <WalksInfo/>
          </StyledRightColumn>
        </div>
      </div>
    </Provider>
  );
};

export default App;
