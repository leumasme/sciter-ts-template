var Audio: Audio__Static;

interface Audio__Static {
    load(url): Promise<Audio>;
}
interface Audio {
    /** @description 0..1, playback progress until end */
    progress: number;
    /** @description 0..1, playback volume */
    volume: number;
    /** @description Resolved when playback finishes */
    play(): Promise<any>;
    pause();
    resume();
    stop();
}