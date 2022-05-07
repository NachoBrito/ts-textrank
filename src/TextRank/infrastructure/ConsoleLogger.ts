import LoggerInterface from "./LoggerInterface"

export default class ConsoleLogger implements LoggerInterface {
	debug(...args: any[]): void {
		console.debug(...args)
	}
	log(...args: any[]): void {
		console.log(...args)
	}
	info(...args: any[]): void {
		console.info(...args)
	}
	warn(...args: any[]): void {
		console.warn(...args)
	}
	error(...args: any[]): void {
		console.error(...args)
	}
}
