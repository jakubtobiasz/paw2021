export class StorageManager {
    private static instance: StorageManager;

    static getInstance(): StorageManager {
        if (this.instance == null) {
            this.instance = new StorageManager();
        }

        return this.instance;
    }

    private readonly storageCitiesKey = 'weather_cities';

    addCity(cityName: string) {
        const cities = this.getCities();
        cities.push(cityName);
        this.setCities(cities);
    }

    setCities(cities: string[]) {
        const valueToSave = JSON.stringify(cities);
        localStorage.setItem(this.storageCitiesKey, valueToSave);
    }

    getCities(): string[] {
        const lsEntry = localStorage.getItem(this.storageCitiesKey);

        if (lsEntry == null) {
            return [];
        }

        return JSON.parse(lsEntry);
    }

    removeCity(cityName: string) {
        const cities = this.getCities();
        const filteredCities = cities.filter(entry => entry.toLowerCase() !== cityName.toLowerCase());
        this.setCities(filteredCities);
    }

    clearCities() {
        localStorage.setItem(this.storageCitiesKey, null);
    }
}
