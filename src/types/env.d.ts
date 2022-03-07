declare module "@env" {
    export const OS: string;
    export const PLATFORM: string;
    export const DEVICE: "desktop" | "mobile";
    export function language(): string;
    export function country(): string;
    export function userName(): string;
    export function machineName(): string;
    export function domainName(): string;
    /** @description Launch default app to path/url */
    export function launch(path: string);
    export function home(relpath?): string;
    export function homeURL(relpath?): string;
    export function path(name, relpath?): string;
    export function pathURL(name): string;
    export function variable(name: string, toset?: string | null): string;
    export function exec(...args: string[]);
}