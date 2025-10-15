export interface IAircraft {
    throtlleLevel: number;
    speed: number;
    powerState: boolean;

    powerOn(): void;
    powerOff(): void;
    increaseThrotlle(value: number): void;
    decreaseThrotlle(value: number): void;
}
