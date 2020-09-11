// Type definitions for hydra-express 1.7
// Project: https://github.com/flywheelsports/hydra-express#readme
// Definitions by: Justus Fluegel <https://github.com/Technikkeller>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import express, { Express, Router } from 'express';
import { IHydra } from 'hydra';

declare abstract class HydraExpress {
    constructor();

    /**
     * @summary Adds plugins to Hydra
     * @param plugins - plugins to register
     * @return - Promise which will resolve when all plugins are registered
     */
    use(plugins: unknown[]): Promise<undefined>;

    /**
     * @summary Registers a plugin with Hydra
     * @param plugin - HydraPlugin to use
     * @return Promise or value
     */
    _registerPlugin(plugin: unknown): Promise<unknown> | unknown;

    /**
     * @summary Validates a configuration object to ensure all required fields are present
     * @private
     * @param config - config object
     * @return array - of missing fields or empty array
     */
    validateConfig(config: {
        hydra: { serviceName: string; serviceDescription: string; [key: string]: unknown };
        registerRoutesCallback: unknown;
        [key: string]: unknown;
    }): string[];

    /**
     * @summary Initialize HydraExpress using a configuration object.
     * @private
     * @throws Throws an Error() if config is found to be invalid
     * @param config - configuration as described in the projects readme
     * @return Promise - promise resolving to hydraexpress ready or failure
     */
    _init(config: { [key: string]: unknown }): Promise<{ serviceName: string; servicePort: string; serviceIP: string }>;

    /**
     * @summary Shutdown hydra-express safely.
     * @return Promise - promise resolving to hydraexpress ready or failure
     */
    _shutdown(): Promise<void>;

    /**
     * @summary Retrieve the ExpressJS object
     * @return express - ExpressJS object
     */
    getExpress(): typeof express;

    /**
     * @summary Retrieve the ExpressJS app object
     * @return app - express app object
     */
    getExpressApp(): Express;

    /**
     * @summary Retrieve the Hydra object
     * @private
     * @return hydra - Hydra object
     */
    getHydra(): IHydra;

    /**
     * @summary Retrieve loaded configuration object
     * @return config - immutable object
     */
    getRuntimeConfig(): { [key: string]: unknown };

    /**
     * @summary logs a message
     * @param type - type of message: 'info', 'start', 'error'
     * @param message - message to log
     */
    log(type: 'info' | 'start' | 'error', message: string | { [key in string | number]?: unknown }): void;

    /**
     * @summary Starts the HydraExpress server
     * @param resolve - promise resolve
     * @param _reject - promise reject
     */
    start(resolve: (a: unknown) => void, _reject: (err: Error) => void): void;

    /**
     * @summary Initialize service
     */
    initService(): void;

    /**
     * @summary Register API routes.
     * @private
     * @param routes - object with key/value pairs of routeBase: express api object
     */
    _registerRoutes(routes: { [key: string]: Router }): void;

    /**
     * @summary Send a server response to caller.
     * @param httpCode - HTTP response code
     * @param res - Node HTTP response object
     * @param data - An object to send
     */
    _sendResponse(
        httpCode: number,
        res: { [key in string | number]?: unknown },
        data: { [key in string | number]?: unknown },
    ): void;
}

/**
 * @summary Interface to a HydraExpress class
 */
declare class _IHydraExpress extends HydraExpress {
    constructor();

    /**
     * @summary Initializes the HydraExpress module
     * @param config - application configuration object
     * @param version - version of application
     * @param registerRoutesCallback - callback function to register routes
     * @param registerMiddlewareCallback - callback function to register middleware
     * @return Promise - promise resolving to hydraexpress ready or failure
     */
    init(
        config: string | { [key: string]: unknown },
        version: string | (() => unknown),
        registerRoutesCallback?: () => unknown,
        registerMiddlewareCallback?: () => unknown,
    ): Promise<{ serviceName: string; servicePort: string; serviceIP: string }>;

    /**
     * @name s
     * @summary Shutdown hydra-express safely.
     * @return Promise - promise resolving to hydraexpress ready or failure
     */
    shutdown(): Promise<void>;

    /**
     * @summary Retrieve the underlying ExpressJS object
     * @return express - expressjs object
     */
    getExpress(): typeof express;

    /**
     * @summary Retrieve the underlying Hydra object
     * @return hydra - hydra object
     */
    getHydra(): IHydra;

    /**
     * @summary Retrieve loaded configuration object
     * @return config - immutable object
     */
    getRuntimeConfig(): { [key: string]: unknown };

    /**
     * @summary Logger. Use to log messages
     * @param type - type of message: 'fatal', 'error', 'debug', 'info'
     * @param str - string message to log
     */
    log(type: 'info' | 'start' | 'error', message: string | { [key in string | number]?: unknown }): void;

    /**
     * @summary Register API routes.
     * @param routeBaseUrl - route base url, ex: /v1/offers
     * @param api - express api object
     */
    registerRoutes(routes: { [key: string]: Router }): void;

    /**
     * @summary Send a server response to caller.
     * @param httpCode - HTTP response code
     * @param res - Node HTTP response object
     * @param data - An object to send
     */
    sendResponse(
        httpCode: number,
        res: { [key in string | number]?: unknown },
        data: { [key in string | number]?: unknown },
    ): void;
}

export type IHydraExpress = InstanceType<typeof _IHydraExpress>;

declare const _export: IHydraExpress;
export default _export;
