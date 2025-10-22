export interface IAircraft {
    throtlleLevel: number;
    speed: number;
    powerState: boolean;

    powerOn(): void;
    powerOff(): void;
    increaseThrotlle(value: number): number;
    decreaseThrotlle(value: number): number;
}
