var document: Document;
var console: Console;
var window: globalThis;
var devicePixelRatio: number;

// TODO: Length, Angle

function setTimeout(func: () => void, milliseconds: number): BigInt;
function clearTimeout(tid: BigInt): true
function setInterval(func: () => void, milliseconds: number): BigInt;
function clearInterval(iid: BigInt): true

function requestAnimationFrame(func: (timestamp: number) => void): BigInt
function cancelAnimationFrame(aid: BigInt): boolean

interface Response {
    // todo Default Fetch Response?
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
}
// todo default fetch options + extra 
// https://github.com/c-smile/sciter-js-sdk/tree/main/docs/md#fetchurlstring--optionsobject-response---fetch-api
function fetch(url: string, options?)

// todo find out exact arg types
function getComputedStyle(element, pseudoEl?): Element_Style

function printf(format: string, ...args: any[]): string
function scanf(format: string, input: string): any[];

// JSON.parse and JSON.stringify arent 100% excact but already in es2015 types