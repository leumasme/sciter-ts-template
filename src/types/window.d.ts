var Window: Window__Static;

interface Window__Static {
    readonly this: Window;
    readonly all: Window[];
    /** @description An object shared between all Documents and Windows in the Application */
    readonly share: any;
    /** @description Number of available Screens */
    readonly screens: number;

    // Window Types
    readonly POPUP_WINDOW: 2;
    readonly TOOL_WINDOW: 3;
    readonly CHILD_WINDOW: undefined; // !? in docs but not defined!
    readonly FRAME_WINDOW: 5;
    readonly DIALOG_WINDOW: 6;
    // Window Types
    readonly WINDOW_SHOWN: 1;
    readonly WINDOW_MINIMIZED: 2;
    readonly WINDOW_MAXIMIZED: 3;
    readonly WINDOW_FULL_SCREEN: 4;

    new(params: {
        type?: number,
        parent: Window,
        caption?: string,
        x?: number,
        y?: number,
        width: number,
        height: number,
        client: boolean,
        alignment: number,
        screen: number,
        state: number,
        url?: string,
        parameters?: any
    }): Window;

    screenBox(screen: number, what: WindowBoxWhat, boxPart?: WindowBoxPart);
    elementAt(screenX: number, screenY: Number): Element | null;
    ticks(): number;
    post(ge);
    send(ge);
}

type WindowBoxPart = "xywh" | "rectw" | "rect" | "position" | "dimension"
    | "left" | "top" | "right" | "bottom" | "width" | "height";
type WindowBoxWhat = "frame" | "workarea" | "device" | "isPrimary" | "snapshot";
type WindowEvents = "statechange" | "resolutionchange" | "mediachange" | "activate" | "replacementstart"
    | "replacementend" | "move" | "size" | "trayiconclick" | "spacechange";

interface Window {
    state: number;
    frameType: "standard" | "transparent" | "solid" | "solid-with-shadow" | "extended";
    readonly screen: number;
    readonly graphicsBackend: string;
    minSize: [number, number];
    maxSize: [number, number];
    blurBehind: "none" | "auto" | "dark" | "ultra-dark" | "light" | "ultra-light";
    readonly isActive: boolean;
    caption: string;
    readonly isAlive: boolean;
    readonly isOnActiveSpace: boolean | undefined;
    isResizable: boolean;
    isMaximizable: boolean;
    isMinimizable: boolean;
    isTopmost: boolean;
    isEnabled: boolean;
    aspectRatio: number;
    eventRoot: Element | null;
    focus: Element | null;
    readonly parent: Window | null;
    readonly document: Document;
    parameters: any; // Specified in the Window constructer
    box(boxPart: WindowBoxPart,
        boxOf: "border" | "client" | "cursor" | "caret",
        relTo?: "desktop" | "monitor" | "self",
        asPPX?: boolean): number[];
    screenBox(what: WindowBoxWhat, boxPart?: WindowBoxPart, asPPX: boolean): number[];
    move(x: number, y: number, width?: number, height?: number, client?): boolean;
    moveTo(monitor: number, x: number, y: number, width?: number, height?: number, client?): boolean;
    selectFile(params: {
        mode?: "save" | "open",
        filter?: string,
        extension?: string,
        caption?: string,
        path?: string
    }): null | string;
    selectFolder(params: any): null | string; // Not properly documented, "tbd"
    mediaVar(name: string, value?);
    mediaVars(values);
    addEventHandler(eventname: WindowEvents, handler: (...args: any[])=> any);
    on(eventname: WindowEvents, handler: (...args: any[])=> any);
    off(eventname: WindowEvents);
    off(namespace: string);
    off(handler: ((...args: any[])=> any));
    xcall(name: string, ...args: any): any;
    doEvent(mode: "wait" | "noWait" | "untilMouseUp" | "untilQuit" | "I/O");
    modal(JSX);
    modal(params);
    performDrag(data: { text: string } | {html: string} | {file: string | string[]} | { json: any},
        mode: "copy" | "move",
        dragIcon: any, // Image | Element
        dragIconXOff?: number, dragIconYoff: number) : null | "copy" | "move";
    focusable(dir: "next" | "prior" | "first" | "last", reference?: Element): Element;
    close(value?: any);
    update();
    activate(bringToFront: boolean): boolean; // bringToFront doesnt seem to work?
    trayIcon(options: {
        image, // Graphics.Image
        text: string
    });
    trayIcon(options: "remove");
    trayIcon(options: "place") : [number, number, number, number];
    requestAttention(type: "info" | "alert" | "stop");


}