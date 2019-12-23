import React, { Fragment } from 'react';

const Satellite = (props) => {

  return (
    <Fragment>
      <h3>Satellites</h3>
      <ul>
        {props.satellites.map((satellite, index) =>
          <li key={index}>{satellite.name}</li>
        )}
      </ul>
    </Fragment>
  )
}

export default Satellite;