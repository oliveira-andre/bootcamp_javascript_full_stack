import React, { Fragment, useState } from 'react';

const initialState = {
  name: '',
  description: '',
  img_url: ''
}

const Form = (props) => {
  const [fields, setFields] = useState(initialState);
  const handleChange = (e) => setFields({
    ...fields,
    [e.target.name]: e.target.value
  });

  const handleSubmit = (e) => {
    props.addPlanet(fields);
    setFields(initialState);
    e.preventDefault();
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={fields.name} onChange={handleChange} />
          <label htmlFor="description">Description</label>
          <input id="description" name="description" type="text" value={fields.description} onChange={handleChange} />
          <label htmlFor="img_url">Image Url</label>
          <input id="img_url" name="img_url" type="text" value={fields.img_url} onChange={handleChange} />
        </div>
        <br />
        <input type="submit" />
      </form>
    </Fragment>
  )
}

export default Form;