import {Weather} from "./weather.interface";

export class WeatherService {
    private readonly apiKey = '50d53005c0fd5f556bb4ef15224c4209';

    async getWeatherForCity(cityName: string): Promise<Weather> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${this.apiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        return await weatherResponse.json();
    }
}
