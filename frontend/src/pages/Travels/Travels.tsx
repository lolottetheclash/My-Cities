import axios from 'axios';
import { useEffect, useState } from 'react';

const Travels = (): JSX.Element => {
  const [travels, setTravels] = useState([]);
  const travelsUrl = 'http://localhost:5000/api/travels';

  useEffect(() => {
    axios
      .get(travelsUrl)
      .then((response) => console.log(response.data.travels));
  }, []);

  return <h1>Travels Page !!!!</h1>;
};

export default Travels;
