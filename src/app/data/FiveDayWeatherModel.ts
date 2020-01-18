export class FiveDayWeatherModel
{
    cod: number;
    message: number;
    cnt: number;
    list: [
      {
        dt: number;                 // Time of data forecasted, unix, UTC
        main: {
          temp: number;             // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
          feels_like: number;       // Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
          temp_min: number;         // Minimum temperature at the moment of calculation. This is deviation from 'temp' that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
          temp_max: number;         // Maximum temperature at the moment of calculation. This is deviation from 'temp' that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
          pressure: number;         // Atmospheric pressure on the sea level by default, hPa
          sea_level: number;        // Atmospheric pressure on the sea level, hPa
          grnd_level: number;       // Atmospheric pressure on the ground level, hPa
          humidity: number;         // Humidity, %
          temp_kf: number;          
        };
        weather: [
          {
            id: number;             // Weather condition id
            main: string;           // Group of weather parameters (Rain, Snow, Extreme etc.)
            description: string;    // Weather condition within the group
            icon: string;           // Weather icon id
          }
        ];
        clouds: {
          all: number;              // Cloudiness, %
        };
        wind: {
          speed: number;            // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
          deg: number;              // Wind direction, degrees (meteorological)
        };
        sys: {
          pod: string;
        };
        dt_txt: string;             
      }
    ]
      
    city: {
      id: number;                   // City ID
      name: string;                 // City name
      coord: {
        lat: number;                // City geo location, latitude
        lon: number;                // City geo location, longitude
      };
      country: string;              // Country code (GB, JP etc.)
      timezone: number;             // Shift in seconds from UTC
      sunrise: number;              // Sunrise time UNIX
      sunset: number;               // Sunset time UNIX
    }
  }