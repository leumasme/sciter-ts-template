interface Graphics__Static {
    Color: Color__Static;
    Image: Image__Static;
    Text: Text__Static;
    Path: Path__Static;
    Brush: Brush__Static;
}
interface Graphics {
    lineCap;
    lineJoin;
    strokeStyle: Color | string | Image;
    /** Width in CSS pixels */
    lineWidth: number;
    /** Alias for lineWidth */
    strokeWidth: number;
    fillStyle: Color | string | Image;
    font: string;
    clearRect(x: number, y: number, w: number, h: number);
    beginPath();
    moveTo(x: number, y: number);
    lineTo(x: number, y: number);
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number);
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean);
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number);
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number,
        startAngle: number, endAngle: number, anticlockwise?: boolean);
    rect(x: number, y: number, w: number, h: number);
    closePath();
    stroke(path?: Path);
    fill(path?: Path, fillRule?);
    strokeRect(x: number, y: number, w: number, h: number);
    fillRect(x: number, y: number, w: number, h: number);
    fillText(text: string, x: number, y: number, maxWidth?: number);
    setLineDash(...n: any[]);
    save();
    restore();
    scale(x: number, y: number);
    translate(x: number, y: number);
    rotate(radians: number, x?: number, y?: number);
    transform(a: number, b: number, c: number, d: number, e: number, f: number);
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number);
    draw(path: Path, params: { x: number, y: number, fill?: "evenodd" | "nonzero", stroke?: boolean });
    draw(image: Image, params: {
        x: number, y: number, width?: number, height?: number,
        srcX?: number, srcY?: number, srcWidth?: number, srcHeight?: number, opacity?: number
    });
    /** @param alignment 1..9, as on a numpad (9: up right) */
    draw(text: Text, params: { x: number, y: number, alignment: number, fill?: Color });
    pushLayer(x: number, y: number, w: number, h: number, opacity?, filter?);
    pushLayer(clipAreaName: "background-area" | "border-box" | "padding-box"
        | "margin-box" | "content-box", opacity?, filter?);
    pushLayer(path: Path, opacity?);
    pushLayer(mask: Image, useAlpha: boolean, opacity?);
    popLayer();
}

interface Color__Static {
    /** @description all arguments as 0..1 floats */
    rgb(r: number, g: number, b: number, a?: number): Color;
    /** @description all arguments as 0..255 integers */
    RGB(r: number, g: number, b: number, a?: number): Color;
    /** @description sva: 0..1 ; h: 0..360 */
    hsv(h: number, s: number, v: number, a?: number): Color;
    /** @description sla: 0..1 ; h: 0..360 */
    hsl(h: number, s: number, l: number, a?: number): Color;
}
// TODO readonlies?
interface Color {
    /** @description Red value float 0..1 */
    r: number;
    /** @description Green value float 0..1 */
    g: number;
    /** @description Blue value float 0..1 */
    b: number;
    /** @description Alpha value float 0..1 */
    a: number;
    /** @description Red value int 0..255 */
    R: number;
    /** @description Green value int 0..255 */
    G: number;
    /** @description Blue value int 0..255 */
    B: number;
    /** @description Alpha value int 0..255 */
    A: number;
    /** @description Hue 0..360, Saturation 0..1, Value 0..1, Alpha 0..1 */
    hsv: [number, number, number, number];
    /** @description Hue 0..360, Saturation 0..1, Lightness 0..1 */
    hsl: [number, number, number];
    toString(format: "RGB" | "RGBA" | "rgb" | "rgba"): string;
    /** @returns abgr integer, 8 bytes per value */
    valueOf(): number;
}

interface Image__Static {
    /** @description render arbitrary graphics onto bitmap */
    new(width: number, height: number, painter, initColor?): Image;
    /** @description render DOM element onto bitmap */
    new(width: number, height: number, element: Element): Image;

    fromBytes(data: ArrayBuffer): Image;
    load(url: string): Promise<Image>
}
interface Image {
    update(painter, initColor?);
    toBytes(packaging: "png" | "jpeg" | "webp" | "bgra", compression?: number): ArrayBuffer;
    colorAt(x: number, y: number): Color | null;
    compose(src: Image, op: "src-over" | "dst-over" | "src-in" | "dst-in" | "src-out"
        | "dst-out" | "src-atop" | "dst-atop" | "xor" | "copy"): Image;
}

// TODO: what are the constructors?
interface Text__Static {
}
interface Text {
    readonly lines: number;
    chars: string;
    style: string;
    class: string;
    width(): [minWidth: number, maxWidth: number, usedWidth: number];
    width(usedWidth: number);
    height(): [contentHeight: number, usedHeight: number];
    height(usedHeight: number);
    lineMetrics(lineNo: number): [yPos: number, height: number, baselineOffset: number];
    lineChars(lineNo: number): string;
}

// TODO: what are the constructors?
interface Path__Static {
}
interface Path {
    moveTo(x: number, y: number);
    lineTo(x: number, y: number);
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number);
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean);
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number);
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number,
        endAngle: number, anticlockwise?: boolean);
    rect(x: number, y: number, width: number, height: number);
    closePath();
    isPointInside(x: number, y: number);
    bounds(): [x1: number, y1: number, x2: number, y2: number];
    combine(how: "union" | "intersect" | "xor" | "exclude", otherPath: Path): Path
}

interface Brush__Static {
    createLinearGradient(x1: number, y1: number, x2: number, y2: number): Brush;
    createRadialGradient(x: number, y: number, r: number): Brush;
}
interface Brush {
    type: number;
    /** @argument pos 0..1 */
    addColorStop(pos: number, color: Color): Brush;
}