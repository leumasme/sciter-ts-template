interface Document extends Element {
    body: Node;
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
    // more Methods https://github.com/c-smile/sciter-js-sdk/blob/main/docs/md/Element.md
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