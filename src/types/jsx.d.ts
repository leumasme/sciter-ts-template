
// type Fallback = { [key: string]: string };
// type MyJsxType = VNode;
// x = {x: "1"};

declare namespace JSX {
    interface IntrinsicElements {
        [name: string]: any; 
    }
    type Element = VNode;
}
