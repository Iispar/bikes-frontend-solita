/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import {
  getCountTrips, getTop, getAverageDistance,
} from './helpers/stationDataHelpers';

const Station = (props) => {
  const { id } = props;
  const { nameFi } = props;
  const { nameSwe } = props;
  const { adressFi } = props;
  const { adressSwe } = props;
  const { cityFi } = props;
  const { citySwe } = props;
  const { operator } = props;
  const { capasity } = props;
  const { x } = props;
  const { y } = props;

  /**
   * Clicking an station displays this.
   * We set and call all wanted data from backend and set it with jquery.
   * We also hide the list of stations first and then make visible
   * the single station view.
   */
  const setSingleStationThis = async () => {
    $('#stationInformation').attr('name', id);
    $('.stationFilter-button').prop('disabled', true);
    $('#list-container').css('display', 'none');
    $('#right-container').css('border', 'none');
    $('#singleStation-container').css('display', 'block');
    $('#singleStationHeader').text(nameFi);
    $('#singleStationInfo').text(`${adressFi},${cityFi}`);
    $('#singleStationCapasity').text(`capasity:${capasity}`);
    $('#singleStationTripsDeparture').text('Waiting for data...');
    $('#singleStationTripsReturn').text('Waiting for data...');
    $('#waitForTopStations').text('top stations: Waiting for data...');

    await getTop('return', id, 'all');
    $('#waitForTopStations').text('top return stations all time');
    $('.stationFilter-button').prop('disabled', false);
    $('#topReturn-button').prop('disabled', true);

    const tripsEndingHere = await getCountTrips('return', id, 'all');
    const tripsStartingHere = await getCountTrips('departure', id, 'all');
    const avgReturning = await getAverageDistance('return', id, 'all');
    const avgDeparting = await getAverageDistance('departure', id, 'all');
    const avgReturnignKm = parseFloat(avgReturning / 1000).toFixed(2);
    const avgDepartingKm = parseFloat(avgDeparting / 1000).toFixed(2);
    $('#singleStationAvgReturning').text(`avg: ${avgReturnignKm} KM`);
    $('#singleStationAvgDeparting').text(`avg: ${avgDepartingKm} KM`);
    $('#singleStationTripsDeparture').text(`${tripsEndingHere} trips`);
    $('#singleStationTripsReturn').text(`${tripsStartingHere} trips`);
  };

  return (
    <div className="singleJourney-container" id={id} onClick={() => setSingleStationThis()} onKeyDown={() => setSingleStationThis()} role="button" tabIndex={0}>
      Name:
      {' '}
      {nameFi}
      , adress:
      {adressFi}
      , city:
      {cityFi}
      , operator:
      {operator}
      , capasity:
      {capasity}
    </div>
  );
};

Station.propTypes = {
  id: propTypes.string,
  nameFi: propTypes.string,
  nameSwe: propTypes.string,
  adressFi: propTypes.string,
  adressSwe: propTypes.string,
  cityFi: propTypes.string,
  citySwe: propTypes.string,
  operator: propTypes.string,
  capasity: propTypes.number,
  x: propTypes.string,
  y: propTypes.string,
};

Station.defaultProps = {
  id: null,
  nameFi: null,
  nameSwe: null,
  adressFi: null,
  adressSwe: null,
  cityFi: null,
  citySwe: null,
  operator: null,
  capasity: null,
  x: null,
  y: null,
};

export default Station;
