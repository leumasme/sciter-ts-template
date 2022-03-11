interface Document extends Element {
    body: Element;
    head: Node;
    documentElement: Document;
    readyState: "complete" | "interactive";
    // https://github.com/c-smile/sciter-js-sdk/blob/main/docs/md/Document.md
}
interface ElementList {
    // https://github.com/c-smile/sciter-js-sdk/blob/main/docs/md/Element.md
}
interface Element_Style {
    // https://github.com/c-smile/sciter-js-sdk/blob/main/docs/md/Element.Style.md
}
interface Element_State {
    // https://github.com/c-smile/sciter-js-sdk/blob/main/docs/md/Element.State.md
}
interface Element_ClassList {
    // https://github.com/c-smile/sciter-js-sdk/blob/main/docs/md/Element.md
}
interface Element_AttributeList {
    // todo Element.attributes
}
interface NodeList {
    // todo Element.childNodes
}
interface Text extends Node {
    data: any;
    readonly length: number;
    readonly wholeText: any
}
interface Comment extends Node {
    data: any;
    readonly length: number;
}

type VNode = {
    0: string;
    1: Record<string, any>;
    2: (string | VNode)[];
}

type AnimationEaseTypes = "linear" | "ease" | "ease-in" | "ease-in-out" | "ease-out" | "quad-in" | "quad-out"
    | "quad-in-out" | "cubic-in" | "cubic-out" | "cubic-in-out" | "quart-in" | "quart-out" | "quart-in-out"
    | "quint-in" | "quint-out" | "quint-in-out" | "sine-in" | "sine-out" | "sine-in-out" | "expo-in" | "expo-out"
    | "expo-in-out" | "circ-in" | "circ-out" | "circ-in-out" | "elastic-in" | "elastic-out" | "elastic-in-out"
    | "back-in" | "back-out" | "back-in-out" | "x-back-in" | "x-back-out" | "x-back-in-out" | "xx-back-in"
    | "xx-back-out" | "xx-back-in-out" | "bounce-in" | "bounce-out" | "bounce-in-out";

type AnimationEffectTypes = "blend" | "blend-atop" | "slide-top" | "slide-bottom" | "slide-left" | "slide-right"
    | "slide-over-top" | "slide-over-bottom" | "slide-over-left" | "slide-over-right" | "remove-top" | "remove-bottom"
    | "remove-left" | "remove-right" | "scroll-top" | "scroll-bottom" | "scroll-left" | "scroll-right";

// readonly for element not fully documented; to test
// https://github.com/c-smile/sciter-js-sdk/blob/main/docs/md/Element.md
interface Element extends Node {
    id: string;
    name: string;
    tagName: string;
    /** @description lower-case version of tagName */
    tag: string;
    className: string;
    elementIndex: number;
    innerHTML: string;
    outerHTML: string;
    innerText: string;
    value: any;
    firstElementChild: Element; // readonly? ... v
    lastElementChild: Element;
    nextElementSibling: Element;
    previousElementSibling: Element;
    childElementCount: number;
    offsetLeft: number;
    offsetTop: number;
    offsetWidth: number;
    offsetHeight: number;
    clientLeft: number;
    clientTop: number;
    clientWidth: number;
    clientHeight: number;
    scrollLeft: number;
    scrollTop: number;
    scrollWidth: number;
    scrollHeight: number;
    style: Element_Style;
    state: Element_State
    classList: Element_ClassList;
    children: ElementList;
    disabled: bool;
    readonly: bool;
    checked: bool;
    src: string;
    appendChild(node: Node);
    insertBefore(node: Node, refNode: Node);
    insertAfter(node: Node, refNode: Node);
    removeChild(node: Node);
    replaceChild(newNode: Node, oldNode: Node);
    childElement(n: number): Element;
    insertAdjacentHTML(where: any, html: any);
    swapWith(otherElement: Element);
    querySelector(selector: string): Element | null; // Element or Node?
    /** @description Alias for querySelector */
    $(selector: string): Element | null;
    querySelectorAll(selector: string): Element[]; // Element or Node?
    /** @description Alias for querySelectorAll */
    $$(selector: string): Element[];
    /** @description Query parent elements */
    $p(selector: string): Element | null;
    /** @description Query owner element, like owner of menu */
    $o(selector: string);
    /** @description Check if the selector selects the Element */
    $is(selector: string): boolean;
    // more Methods https://github.com/c-smile/sciter-js-sdk/blob/main/docs/md/Element.md
    hasAttribute(attribute);
    getAttribute(attribute);
    getAttributeNames();
    removeAttribute(attribute);
    setAttribute(attribute, value);
    getBoundingClientRect();
    scrollTo(x: number, y: number);
    scrollTo(options: { left: number, top: number, behavior: "instant" | "smooth" });
    scrollIntoView(alignToTop?: boolean);
    elementFromPoint(x: number, y: number): Element;
    click();
    focus();
    addEventListener(name, eventHandler, flags?);
    removeEventListener(name, eventHandler);
    dispatchEvent(event);
    /** @description Async version of dispatchEvent */
    postEvent(event);
    /** @returns Find nearest ancestor that matches the selector, may return itself */
    closest(selector: string): Element | null;
    matches(selector: string): boolean;
    getElementsByClassName(...args); // ? maybe equal to vanilla dom functions
    getElementsByTagName(...args);
    getElementsByName(...args);
    // sciter-specific methods ... v
    /**
     * prefix eventname with ^ to handle in capturing phase
     * eventname may contain namespace part like "click.mynamespace"
     */
    on(eventname: string, selector?: string, handler: (this: this, event, matchedElement?) => any): this;
    off(eventname: string): this;
    /**
     * eventname may contain namespace part like "click.mynamespace"
     */
    onGlobalEvent(eventname: string, handler: (this: this, ...args) => any): this;
    offGlobalEvent(eventname: string): this;
    offGlobalEvent(handler: (...args) => any): this;
    /**
     * Overwrites existing timer on the element.
     * callback may return true to repeat the timer
     */
    timer(ms: number, callback: (this: this, ...args) => boolean | undefined);
    clear();
    /** 
     * Post a function to the event queue.
     * Like setTimeout(func, 0) but <this> is set to the element and avoidDuplicates support
     */
    post(func: (this: this, ...args) => any, avoidDuplicates?: boolean);
    /**
     * Like dispatchEvent but not immediate, will post into the event queue
     */
    post(eventname: string); // TODO: does this have avoidDuplicates support??
    checkCommand(command, params?);
    executeCommand(command, params?);
    xcall(name: string, ...arguments: any): any;
    // Set these paint functions!
    paintBackground: null | ((graphics: Graphics) => any);
    paintForeground: null | ((graphics: Graphics) => any);
    paintContent: null | ((graphics: Graphics) => any);
    paintOutline: null | ((graphics: Graphics) => any);
    /** @description Schedule element re-paint, will trigger paintXXXX calls */
    requestPaint();
    popup(popup: Element | VNode, params: {
        anchorAt?: number, popupAt?: number, x?: number, y?: number
    })
    animate(changer: (...args) => any, params: { // TODO: does this really have changer? maybe docs mistake
        duration: number, // milliseconds of animation duration
        ease: AnimationEaseTypes,
        effect: AnimationEffectTypes
    });
    animate(step: (progress: number) => boolean, params: {
        duration: number, // milliseconds of animation duration
        ease: AnimationEaseTypes,
        fps: number
    })
    /**
     * Make the element "airborn" - to be replaced outside of host window.
     * @param params.window attached -> Will move with main window ; popup -> detached and topmost  
     */
    takeOff(params: {
        x: number, y: number,
        width?: number, height?: number,
        relativeTo?: "screen" | "document" | "window" | "parent" | "self",
        window: "attached" | "detached" | "popup"
    })
    append(vnode: VNode);
    prepend(vnode: VNode);
    /** Replaces element content with the VNode */
    content(vnode: VNode);
    /** 
     * patches content of the element by vnode using rules of React[or]
     * @default onlyChildren true 
     */
    patch(vnode: VNode, onlyChildren?: boolean);
    // https://github.com/c-smile/sciter-js-sdk/blob/main/docs/md/Element.md#elementcomponentupdate-obj-
    componentUpdate(obj)
    rangeFromPoint(x, y): Range | null; // TODO Range??? Where is this documented?
    toString(): string;
}

interface Node {
    readonly nodeName: string;
    readonly nodeType: string;
    nodeValue: any;
    readonly nodeIndex: number;
    readonly childNodes: NodeList;
    readonly firstChild: Node;
    readonly lastChild: Node;
    readonly nextSibling: Node;
    readonly previousSibling: Node;
    readonly ownerDocument: Document;
    readonly parentNode: Node;
    readonly parentWindow: Window;
    textContent: string;
    cloneNode(...args);
    contains(...args);
    compareDocumentPosition(...args);
    getRootNode(...args);
    hasChildNodes(...args);
    isEqualNode(...args);
    isSameNode(...args);
    remove(...args);
}