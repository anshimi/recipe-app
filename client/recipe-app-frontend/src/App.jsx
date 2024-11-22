import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('http://localhost:5000')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }, []);

  return <h1>Recipe App Frontend</h1>;
}

export default App;