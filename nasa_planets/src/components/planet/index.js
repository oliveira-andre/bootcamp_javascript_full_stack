import React, { Fragment, useState, useEffect } from 'react';
import Satellite from '../satellite/index';
import { useParams, useHistory, Redirect } from 'react-router-dom';

async function getPlanet(id) {
  let response = await fetch(`http://localhost:3000/api/${id}.json`);
  let data = response.json();
  return data;
}

const Planet = () => {
  const [planet, setPlanet] = useState({});
  const [satellites, setSatellites] = useState([]);
  const [redirect, setRedirect] = useState(false);
  let { id } = useParams();
  let history = useHistory();

  const goToPlanets = () => history.push('/');

  useEffect(() => {
    getPlanet(id).then(data => {
      setPlanet(data['data']);
      setSatellites(data['satellites']);
    }, error => {
      setRedirect(true);
    })
  }, []);

  if (redirect)
    return <Redirect to='/' />

  return (
    <Fragment>
      <h2>{planet.name}</h2>
      <p>{planet.description}</p>
      <img src={planet.img_url} alt=""></img>
      <Satellite satellites={satellites} />
      <button type="button" onClick={goToPlanets}>Back to list</button>
    </Fragment>
  )
}

export default Planet;