var sciter: Sciter;

interface Sciter {
    readonly VERSION: string;
    readonly REVISION: string;
    readonly QUICKJS_VERSION: string;
    /** @description sync version of standard module import(path) */
    import<T extends string>(path: T): Awaited<typeof import(T)>;
    /** @description Load sciter extension native library (dll/so/dylib) */
    loadLibrary(name: string): Awaited;
    /** @description Parse JSON++ string */
    parseValue(data: string): any;
    devicePixels(length: number | string, axis?: "width" | "height");
    /** @description Subscribe to a DOM event */
    on(eventname: string, selector?: string, handler: (...args)=>any);
    off(eventname: string);
    off(handler: (...args)=>any);
    $(selector: string): Element | null;
    $$(selector: string): Element[];
    uuid(): string;
    /** @default encoding "utf-8" */
    encode(text: string, encoding: string): ArrayBuffer;
    /** @default encoding "utf-8" */
    decode(bytes: ArrayBuffer, encoidng: string): string;
    /** @default method "lzf" */
    compress(to: ArrayBuffer, method?: "gz" | "gzip" | "lzf"): ArrayBuffer;
    /** @default method "lzf" */
    decompress(input: ArrayBuffer, method?: "gz" | "gzip" | "lzf"): ArrayBuffer;
    toBase64(buf: ArrayBuffer): string;
    fromBase64(str: string): ArrayBuffer;
    md5(input: ArrayBuffer): string;
    crc32(input: ArrayBuffer): number;
}