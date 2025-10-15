export * from './api-objects.dto';
export * from './class';

import { ApiObjectDto } from './api-objects.dto';
import { ApiObject } from './class';
import { QuadroDrone } from './abstruction/interfaces/abstraction';

async function getApiObjects(): Promise <ApiObjectDto[]> {
    const response = await fetch('https://dummyjson.com/comments');
    const data = await response.json();
    return data.comments as ApiObjectDto[];
}

async function getApiObjectsFromClass (): Promise <ApiObject[]> {
    const response = await fetch('https://dummyjson.com/comments');
    const data = await response.json();
    return (data.comments as Record<string, unknown>[]).map((row) => new ApiObject(row));
}

function myDroneData(drone: QuadroDrone): string {
    return 'My drone has ' + drone.stack + ' stack, ' + drone.motors + ' motors, ' + drone.camera + ' camera, ' + drone.vtx + ' vtx and ' + drone.frame + ' frame.';
}

(async () => {
    const apiObjects = await getApiObjects();
    const notNullApiObjects = apiObjects.filter((apiObject) => apiObject.user !== null);
    const slicedObject = notNullApiObjects.slice(0, 2);
    console.log(slicedObject);

    const apiObjectsFromClass = await getApiObjectsFromClass();
    const notNullApiObjectsFromClass = apiObjectsFromClass.filter((apiObject) => apiObject.user !== null);
    const slicedObjectFromClass = notNullApiObjectsFromClass.slice(0, 2);
    console.log(slicedObjectFromClass);

    const myDrone: QuadroDrone = {
        stack: 'SpeedyBee V5',
        motors: 'Xing-E 2207 1800KV',
        camera: 'Caddx Ratel',
        vtx: 'SpeedyBee TX600',
        frame: 'Ysido Mark4'
    };
    console.log(myDroneData(myDrone));
})();

