import { IAircraft } from './abstruction/i-aircraft';
import { IVideoCapture } from './abstruction/i-video-record';

export class Drone implements IAircraft, IVideoCapture {

    public throtlleLevel: number;
    public speed: number;
    public powerState: boolean;
    public vtxPower: number;
    public isRecording: boolean;

    public constructor() {
        this.throtlleLevel = 0;
        this.speed = 0;
        this.powerState = false;
        this.vtxPower = 0;
        this.isRecording = false;
    }

    public powerOn(): void {

        if (this.throtlleLevel > 0) {
            console.log('Cannot power on: Throtlle level is above 0');
            return;
        }
        if (this.powerState) {
            console.log('Drone is already powered on');
            return;
        }
        this.powerState = true;
        console.log('Aircraft power on');

    }

    public powerOff(): void {
        this.powerState = false;
        console.log('Aircraft power off');
    }

    public increaseThrotlle(throtlle: number): number {
        if (!this.powerState) {
            console.log('Cannot increase throtlle: Aircraft is powered off');
        } else if (this.powerState && this.throtlleLevel < 100) {
            this.speed = throtlle * 1.5;
            console.log(`Aircraft throtlle increased to ${this.throtlleLevel}, speed is ${this.speed}`);
            this.throtlleLevel += throtlle;
        }
        if (this.throtlleLevel > 100) this.throtlleLevel = 100;
        return this.throtlleLevel;
    }

    public decreaseThrotlle(throtlle: number): number {
        if (this.powerState && this.throtlleLevel > 0) {
            this.speed = throtlle * 1.5;
            console.log(`Aircraft throtlle decreased to ${this.throtlleLevel}, speed is ${this.speed}`);
            this.throtlleLevel -= throtlle;
        }
        if (this.throtlleLevel < 0) this.throtlleLevel = 0;
        return this.throtlleLevel;
    }
    public getThrottle(): number {
        return this.throtlleLevel;
    }

    public switchVtxPower (power:number): number {
        this.vtxPower = this.switchVtxPowerLogic(power);
        return this.vtxPower;
    }

    private switchVtxPowerLogic (state: number): number {
        if (state === 0) {
            console.log('VTX power minimum');
        } else if (state === 1) {
            console.log('VTX power 500W');
        } else if (state === 2){
            console.log('VTX power MAX');
        } else {
            console.log('There is only 3 power mode' );
            state = this.vtxPower;
        }
        return state;
    }

    public startRecording(): boolean {
        this.isRecording = true;
        console.log('Recording started');
        return this.isRecording;
    }

    public stopRecording(): boolean {
        if (this.isRecording) {
            console.log('Video saved');
        } else {
            console.log('Recording is not started');
            return this.isRecording;
        }
        this.isRecording = false;
        console.log('Recording stoped');
        return this.isRecording;
    }
}

