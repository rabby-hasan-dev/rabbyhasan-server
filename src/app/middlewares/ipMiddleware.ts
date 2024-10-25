import { RequestHandler } from 'express';
import { locationFetcher } from '../utils/locationFetcher';

const ipMiddleware: RequestHandler = async (req, res, next) => {
  const clientIp =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    const locationData = await locationFetcher(clientIp);
    req.visitorData = {
      ip: clientIp,
      city: locationData.city,
      country: locationData.country,
      region: locationData.region,
      location: locationData.loc, // Latitude and Longitude
    };
    next();
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve location data' });
  }
};

export default ipMiddleware;
