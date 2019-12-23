import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Planet = (props) => {
  return (
    <Fragment>
      <Link to={`/planet/${props.id}`}>
        <h2>{props.name}</h2>
      </Link>
      <p>{props.description}</p>
      <img src={props.img_url} alt=""></img>
    </Fragment>
  )
}

export default Planet;