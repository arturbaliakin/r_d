import { QuadroDrone } from '../abstruction/interfaces/abstraction';

export class MyQuadroDrone implements QuadroDrone {
    public stack: string;
    public motors: string;
    public camera: string;
    public vtx: string;
    public frame: string;

    public constructor(stack: string, motors: string, camera: string, vtx: string, frame: string) {
        this.stack = stack;
        this.motors = motors;
        this.camera = camera;
        this.vtx = vtx;
        this.frame = frame;
    }
}
