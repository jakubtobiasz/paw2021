export interface Weather {
    name: string;
    main: {
        temp: number;
        pressure: number;
        humidity: number;
    },
    weather: [{
        icon: string;
    }]
}
