import React from 'react';
import { Link } from 'react-router-dom';

const notFoundScreen = () => {
  return (
    <div>
      <h3>Not Found Page</h3>
      <Link to='/'>Back to list</Link>
    </div>
  )
}

export default notFoundScreen;