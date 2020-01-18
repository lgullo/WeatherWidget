export class CurrentWeatherModel {
    coord: {
        lon: string;            // Longitude
        lat: string;            // Latitude
    };
    weather: [{
        id: number;             // Weather condition code ID
        main: string;           // Group of weather parameters (Rain, Snow, Extreme etc.)
        description: string;    // Weather condition within the group small description
        icon: string;           // Weather icon id
    }];
    base: string;               // Not sure what this is for
    main: {
        temp: number;           // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        feels_like: number;     // Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        temp_min: number;       // Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        temp_max: number;       // Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        pressure: number;       // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
        humidity: number;       // Humidity, %  
    };
    visibility: number;
    wind: {
        speed: number;          // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
        deg: number;            // Wind direction, degrees (meteorological)
    };  
    rain: {
        '1h': number;           // Rain volume for the last 1 hour, mm
    };
    snow: {
        '1h': number;           // Snow volume for the last 1 hour, mm
    };
    clouds: {
        all: number;
    };
    dt: number;                 // Time of data calculation, unix, UTC
    sys: {
        type: number;
        id: number;
        country: string;        // Country code (GB, JP etc.)
        sunrise: number;        // Sunrise time, unix, UTC
        sunset: number;         // Sunset time, unix, UTC
    };
    timezone: number;           // Shift in seconds from UTC
    id: number;                 // City ID
    name: string;               // City name
    cod: number;
}