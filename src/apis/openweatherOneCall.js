import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
});
