type LocationCoordinate = {
  lon: number,
  lat: number
}

type WeatherParameter = {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number,
  sea_level: number,
  grnd_level: number
}

type WeatherIdentifier = {
  id: number,
  main: string,
  description: string,
  icon: string
}

type WindParameter = {
  speed: number,
  deg: number,
  gust: number
}

type CloudParameter = {
  all: number
}

type SystemParameter = {
  type: number,
  id: number,
  country: string,
  sunrise: number,
  sunset: number
}

export interface WeatherJson {
  coord: LocationCoordinate,
  weather: WeatherIdentifier[],
  base: string,
  main: WeatherParameter,
  visibility: number,
  wind: WindParameter,
  clouds: CloudParameter,
  dt: number,
  sys: SystemParameter,
  timezone: number,
  id: number,
  name: string,
  cod: number
};

export interface APIResponseType {
  size: number,
  timeout: number,
  status?: number,
  json?: () => WeatherJson
}
