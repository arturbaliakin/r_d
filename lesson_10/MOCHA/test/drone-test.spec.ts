import { expect } from 'chai';
import { Drone } from "../src/drone";

describe("Drone Test Suite", () => {
    let drone: Drone;

    beforeEach(() => {
        drone = new Drone();
    });

    describe("Throttle Test", () => {
        it("Should increase throttle correctly with power ON", () => {
            drone.powerOn();
            drone.increaseThrotlle(10);
            expect(drone.getThrottle()).to.equal(10);
        });

        it("Should decrease throttle with power ON", () => {
            drone.powerOn();
            drone.increaseThrotlle(30);
            drone.decreaseThrotlle(10);
            expect(drone.getThrottle()).to.equal(20);
        });
        
        it("Should NOT decrease throttle correctly with power OFF", () => {
            drone.increaseThrotlle(30);
            drone.decreaseThrotlle(10);
            expect(drone.getThrottle()).to.equal(0);
        });

        it("Soult NOT increase throttle with power OFF", () => {
            drone.increaseThrotlle(10);
            expect(drone.getThrottle()).to.equal(0);
        });
    });

    describe("Power State Test", () => {
        it("should power on the drone", () => {
            drone.powerOn();
            expect(drone.powerState).to.equal(true);
        });
        it("should power off the drone", () => {
            drone.powerOff();
            expect(drone.powerState).to.equal(false);
        });
    });

    describe("Throttle Limits Test", () => {
        it("should not exceed maximum throttle of 100", () => {
            drone.powerOn();
            drone.increaseThrotlle(120);
            expect(drone.getThrottle()).to.equal(100);
        });
        it("should not go below minimum throttle of 0", () => {
            drone.powerOn();
            drone.decreaseThrotlle(10);
            expect(drone.getThrottle()).to.equal(0);
        });
    });

    describe("VTX Power Test", () => {
        it("should set VTX power to minimum", () => {
            const vtxPower = drone.switchVtxPower(0);
            expect(vtxPower).to.equal(0);
        });
        it("should set VTX power to medium", () => {
            const vtxPower = drone.switchVtxPower(1);
            expect(vtxPower).to.equal(1);
        });
        it("should set VTX power to maximum", () => {
            const vtxPower = drone.switchVtxPower(2);
            expect(vtxPower).to.equal(2);
        });
    });
});
