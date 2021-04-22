import {Weather} from "./weather.interface";
import {StorageManager} from "./storage.manager";
import {WeatherService} from "./weather.service";

export class UiManager {
    private readonly storage: StorageManager;
    private readonly ws: WeatherService;

    constructor() {
        this.ws = new WeatherService();
        this.storage = StorageManager.getInstance();
        this.init();
        this.render().then(() => {
            setInterval(() => {
                this.render();
                console.log('rendered');
            }, 120 * 1000);
        });
    }

    init() {
        const cityInput = document.querySelector<HTMLInputElement>('#city-input');
        const addCityButton = document.querySelector<HTMLButtonElement>('#add-city');

        addCityButton.addEventListener('click', () => {
            const inputValue = cityInput.value.trim();

            if (!inputValue) return;

            this.storage.addCity(inputValue);
            this.render();
            cityInput.value = '';
        });
    }

    async getData(): Promise<Weather[]> {
        const cities = this.storage.getCities();
        const result: Weather[] = [];
        console.log(cities);

        for (const city of cities) {
           const cityData = await this.ws.getWeatherForCity(city);
           console.log(cityData);
           result.push(cityData);
        }

        return result;
    }

    async render() {
        const data = await this.getData();
        const wrapper = document.querySelector('#weather-data');
        wrapper.innerHTML = '';

        data.forEach(entry => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <span class="card__title">${entry.name}</span>
                <div class="card__data-entry">
                    <span class="card__data-title">Temperatura: </span> 
                    ${entry.main.temp}
                </div>
                <div class="card__data-entry">
                    <span class="card__data-title">Wilgotność: </span> 
                    ${entry.main.humidity}
                </div>
                <div class="card__data-entry">
                    <span class="card__data-title">Ciśnienie: </span>
                    ${entry.main.pressure}
                </div>
                <div class="card__data-icon">
                    <span class="card__data-title">Ikona: </span>
                    <img src="http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" />
                </div>
            `;

            wrapper.append(card);
        });
    }
}
