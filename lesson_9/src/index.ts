import { IAircraft } from './abstruction/i-aircraft';
import { Drone } from './drone';


class Fly {
    public constructor (public readonly name: string) {}

    public takeOff(drone: IAircraft): void {
        drone.powerOn();
    }
    public land(drone: IAircraft): void {
        drone.powerOff();
    }
}

const flyMode = new Fly('My drone');
const drone = new Drone();

drone.increaseThrotlle(10);
flyMode.takeOff(drone);
drone.decreaseThrotlle(10);
flyMode.takeOff(drone);
drone.increaseThrotlle(10);
flyMode.land(drone);

drone.switchVtxPower(2);

