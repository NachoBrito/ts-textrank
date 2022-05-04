import LoggerInterface from "./LoggerInterface";

export default class NullLogger implements LoggerInterface{
    debug(...args: any[]): void {
        //do nothing
    }
    log(...args: any[]): void {
        //do nothing
    }
    info(...args: any[]): void {
        //do nothing
    }
    warn(...args: any[]): void {
        //do nothing
    }
    error(...args: any[]): void {
        //do nothing
    }
}