import React from 'react';
import Journeys from './components/Journeys';
import Stations from './components/Stations';
import './components/Grid.css';
import './components/JourneysStyle.css';
import './components/StationsStyle.css';
import './components/Filters.css';
import './components/StationListStyle.css';

/**
 * Basic structure for the application. Used a grid layout but only have
 * need for the header and a main element that is split into two.
 */
const App = () => (
  <div className="background-container">
    <div className="grid-container">
      <div className="right-container" id="right-container">
        <Journeys />
      </div>
      <div className="left-container" id="left-container">
        <Stations />
      </div>
    </div>
  </div>
);

export default App;
