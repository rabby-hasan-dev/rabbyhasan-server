import axios from 'axios';

const fetchLocationData = async (ip) => {
  const response = await axios.get(
    `https://ipinfo.io/${ip}/json?token=YOUR_API_KEY`,
  );
  return response.data;
};

export const locationFetcher = fetchLocationData;
