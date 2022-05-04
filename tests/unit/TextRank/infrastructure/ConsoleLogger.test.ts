import ConsoleLogger from '../../../../src/TextRank/infrastructure/ConsoleLogger';

describe("Console logger", () => { 
    it("should call the right console function for each log level", () => { 
        const logger = new ConsoleLogger()
        const logSpy = jest.spyOn(global.console, 'log');
        const debugSpy = jest.spyOn(global.console, 'debug');
        const infoSpy = jest.spyOn(global.console, 'info');
        const errorSpy = jest.spyOn(global.console, 'error');        
        const warnSpy = jest.spyOn(global.console, 'warn');

        logger.log("log! %d", 1)
        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith("log! %d", 1)

        logger.debug("debug! %d", 2)
        expect(debugSpy).toHaveBeenCalledTimes(1)        
        expect(debugSpy).toHaveBeenCalledWith("debug! %d", 2)

        logger.info("info! %d", 3)
        expect(infoSpy).toHaveBeenCalledTimes(1)
        expect(infoSpy).toHaveBeenCalledWith("info! %d", 3)

        logger.error("error! %d", 4)
        expect(errorSpy).toHaveBeenCalledTimes(1)
        expect(errorSpy).toHaveBeenCalledWith("error! %d", 4)

        logger.warn("warn! %d", 5)
        expect(warnSpy).toHaveBeenCalledTimes(1)
        expect(warnSpy).toHaveBeenCalledWith("warn! %d", 5)

    })
})