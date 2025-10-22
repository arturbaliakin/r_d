export interface IVideoCapture {
    startRecording(state: boolean): boolean;
    stopRecording(state: boolean): boolean;
}
