import { Drone } from "../src/drone";
import sinon from 'sinon';

describe("Drone Test Suite", () => {
    let drone: Drone;

    beforeEach(() => {
        drone = new Drone();
    });

    describe("Throttle Test", () => {
        it("Should increase throttle correctly with power ON", () => {
            drone.powerOn();
            drone.increaseThrotlle(10);
            expect(drone.getThrottle()).toBe(10);
        });

        it("Should decrease throttle with power ON", () => {
            drone.powerOn();
            drone.increaseThrotlle(30);
            drone.decreaseThrotlle(10);
            expect(drone.getThrottle()).toBe(20);
        });
        
        it("Should NOT decrease throttle correctly with power OFF", () => {
            drone.increaseThrotlle(30);
            drone.decreaseThrotlle(10);
            expect(drone.getThrottle()).toBe(0);
        });

        it("Soult NOT increase throttle with power OFF", () => {
            drone.increaseThrotlle(10);
            expect(drone.getThrottle()).toBe(0);
        });
    });

    describe("Power State Test", () => {
        it("should power on the drone", () => {
            drone.powerOn();
            expect(drone.powerState).toBe(true);
        });
        it("should power off the drone", () => {
            drone.powerOff();
            expect(drone.powerState).toBe(false);
        });
    });

    describe("Throttle Limits Test", () => {
        it("should not exceed maximum throttle of 100", () => {
            drone.powerOn();
            drone.increaseThrotlle(120);
            expect(drone.getThrottle()).toBe(100);
        });
        it("should not go below minimum throttle of 0", () => {
            drone.powerOn();
            drone.decreaseThrotlle(10);
            expect(drone.getThrottle()).toBe(0);
        });
    });

    describe("VTX Power Test", () => {
        it("should set VTX power to minimum", () => {
            const vtxPower = drone.switchVtxPower(0);
            expect(vtxPower).toBe(0);
        });
        it("should set VTX power to medium", () => {
            const vtxPower = drone.switchVtxPower(1);
            expect(vtxPower).toBe(1);
        });
        it("should set VTX power to maximum", () => {
            const vtxPower = drone.switchVtxPower(2);
            expect(vtxPower).toBe(2);
        });
    });

    describe("Console Output Mocking with Sinon", () => {
        let consoleStub: sinon.SinonStub;

        beforeEach(() => {
            consoleStub = sinon.stub(console, 'log');
        });

        afterEach(() => {
            consoleStub.restore();
        });

        it("should log correct messages during recording cycle", () => {
            drone.startRecording();
            drone.stopRecording();
        
            sinon.assert.callCount(consoleStub, 3);
            sinon.assert.calledWith(consoleStub.firstCall, 'Recording started');
            sinon.assert.calledWith(consoleStub.secondCall, 'Video saved');
            sinon.assert.calledWith(consoleStub.thirdCall, 'Recording stoped');
        });

        it("should log appropriate messages when throttle operations are performed", () => {
            drone.powerOn();
            drone.increaseThrotlle(50);
            
            sinon.assert.calledTwice(consoleStub);
            sinon.assert.calledWith(consoleStub.firstCall, 'Aircraft power on');
            sinon.assert.calledWith(consoleStub.secondCall, 
                'Aircraft throtlle increased to 0, speed is 75');
        });

        it("should log correct VTX power state changes", () => {
            drone.switchVtxPower(0);
            drone.switchVtxPower(1);
            drone.switchVtxPower(2);
            
            sinon.assert.calledThrice(consoleStub);
            sinon.assert.calledWith(consoleStub.firstCall, 'VTX power minimum');
            sinon.assert.calledWith(consoleStub.secondCall, 'VTX power 500W');
            sinon.assert.calledWith(consoleStub.thirdCall, 'VTX power MAX');
        });

        it("should log error when attempting to stop recording without starting", () => {
            drone.stopRecording();
            
            sinon.assert.calledOnce(consoleStub);
            sinon.assert.calledWith(consoleStub.firstCall, 'Recording is not started');
        });

        it("should log power state transitions correctly", () => {
            drone.powerOn();
            drone.powerOn();
            drone.powerOff();
            
            
            sinon.assert.calledThrice(consoleStub);
            sinon.assert.calledWith(consoleStub.firstCall, 'Aircraft power on');
            sinon.assert.calledWith(consoleStub.secondCall, 'Drone is already powered on');
            sinon.assert.calledWith(consoleStub.thirdCall, 'Aircraft power off');
        });
    });
});
