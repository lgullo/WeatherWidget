// This class will provide you with the name of the png file that corresponds to the given weather code ID
export default class WeatherIconUtil {

    static iconUrl: string = '../assets/weather-icons/png/';

    static cloudy: string = 'cloudy.png';
    static cloudy_day: string = 'cloudy-day.png';
    static cloudy_night: string = 'cloudy-night.png';
    static dust: string = 'dust.png';
    static full_moon: string = 'full-moon.png';
    static mist_day: string = 'mist-day.png';
    static mist_night: string = 'mist-night.png';
    static rain_day: string = 'rain-day.png';
    static raining: string = 'raining.png';
    static rain_night: string = 'rain-night.png';
    static smoke: string = 'smoke.png';
    static snowflake: string = 'snowflake.png';
    static snowing: string = 'snowing.png';
    static storm_day: string = 'storm-day.png';
    static storm_night: string = 'storm-night.png';
    static sun: string = 'sun.png';
    static tornado: string = 'tornado.png';

    static getIcon(weatherCodeId: number, isDaytime: boolean) {

        let icon = this.iconUrl;

        if (weatherCodeId >= 200 && weatherCodeId <= 232) { 
            icon += isDaytime ? this.storm_day : this.storm_night;
        } else if (weatherCodeId >= 300 && weatherCodeId <= 321) {
            icon += isDaytime ? this.rain_day : this.rain_night;
        } else if (weatherCodeId >= 500 && weatherCodeId <= 531) {
            if (weatherCodeId == 511) {
                icon += this.snowing;
            } else {
                icon += this.raining;
            }
        } else if (weatherCodeId >= 600 && weatherCodeId <= 622) {
            if (weatherCodeId >= 600 && weatherCodeId <= 602) {
                icon += this.snowflake;
            } else {
                icon += this.snowing;
            }
        } else if (weatherCodeId >= 700 && weatherCodeId <= 781) {
            if (weatherCodeId == 701) {
                icon += isDaytime ? this.mist_day : this.mist_night;
            } else if (weatherCodeId == 711 || weatherCodeId == 721 || weatherCodeId == 741) {
                icon += this.smoke;
            } else if (weatherCodeId == 731 || weatherCodeId == 751 || weatherCodeId == 761 || weatherCodeId == 762) {
                icon += this.dust;
            } else if (weatherCodeId == 771 || weatherCodeId == 781) { 
                icon += this.tornado;
            } else {
                icon += isDaytime ? this.sun : this.full_moon;
            }
        } else if (weatherCodeId >= 800 && weatherCodeId <= 804) {
            if (weatherCodeId == 800) {
                icon += isDaytime ? this.sun : this.full_moon;
            } else if (weatherCodeId == 803 || weatherCodeId == 804) {
                icon += this.cloudy;
            } 
            else {
                icon += isDaytime ? this.cloudy_day : this.cloudy_night;
            }
        } else {
            icon += isDaytime ? this.sun : this.full_moon;
        }

        return icon;
    }

}