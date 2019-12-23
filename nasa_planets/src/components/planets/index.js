import React, { Fragment, useState, useEffect } from 'react';
import Planet from './planet';
import Form from './form/index'

async function getPlanets() {
  let response = await fetch('http://localhost:3000/api/planets.json')
  let data = await response.json()
  return data;
}

const Planets = () => {
  const [planets, setPlanets] = useState([])

  useEffect(() => {
    getPlanets().then(data => {
      setPlanets(data['planets'])
    })
  }, [])

  const addPlanet = (new_planet) => {
    setPlanets([...planets, new_planet])
  }

  return (
    <Fragment>
      <h3>Planet List</h3>
      <hr />
      <Form addPlanet={addPlanet} />
      <hr />
      {planets.map((planet, index) =>
        <Planet
          name={planet.name}
          description={planet.description}
          img_url={planet.img_url}
          id={planet.id}
          key={index}
        />
      )}
    </Fragment>
  )
}

export default Planets;