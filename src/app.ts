import express, { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
import {APIResponseType, WeatherJson} from './types';
import swaggerUi from 'swagger-ui-express';

const app = express();

const swaggerDocument = require('../swagger.json');

const PORT = process.env.PORT ?? 3000;
const APP_KEY = process.env.APP_KEY ?? 'aa5ff7a6427c37e827395373b2da22e3';
const BASE_URL =  process.env.BASE_URL ?? 'http://api.openweathermap.org';

const CONFIGURED_URL = BASE_URL + '/data/2.5/weather?q={city}&APPID=' + APP_KEY;

app.listen(PORT, () => {
  console.log(`Weather by city application is running on port ${PORT}.`);
});

const getWeatherForCity = async (request: Request, response: Response, next: NextFunction) => {
  const apiCall: string = CONFIGURED_URL.replace('{city}', request?.params?.city);

  const apiResult: APIResponseType = await fetch(apiCall);
  
  if(apiResult?.status === 200) {
    const resultSet: WeatherJson = await apiResult?.json();
    response.status(200).json(resultSet);
  } else {
    response.status(200).json({
      error: 'Either city is invalid or we do not have weather data for this city'
    });
  }
};

app.get('/weather/:city', getWeatherForCity);

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);