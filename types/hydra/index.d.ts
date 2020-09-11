// Type definitions for hydra 1.7
// Project: https://github.com/flywheelsports/hydra#readme
// Definitions by: Justus Fluegel <https://github.com/Technikkeller>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*
        Declare stuff to easily use EventEmitter
    */
type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

declare abstract class MyEmitter<T extends EventMap> {
    on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}

/**
 * @description Extend this for hydra plugins
 */
declare abstract class HydraPlugin {
    /**
     * @param pluginName - unique name for the plugin
     */
    constructor(pluginName: string);

    /**
     * @param hydra - hydra instance
     * @return
     */
    setHydra(hydra: Hydra): void;

    /**
     *
     * @param hydraConfig - the hydra config
     * @return
     */
    setConfig(hydraConfig: { [key: string]: unknown }): void;

    /**
     *
     * @param serviceConfig - the service-level config
     * @param serviceConfig.hydra - the hydra-level config
     * @return
     */
    updateConfig(serviceConfig: {
        [key: string]: unknown;
        hydra: { plugins?: { [key: string]: { [key: string]: unknown } } };
    }): void;

    /**
     *
     * @summary Handles changes to the plugin configuration
     * @param opts - the new plugin config
     * @return
     */
    configChanged(opts: { [key: string]: unknown }): void;

    /**
     *
     * @summary Called by Hydra when the service has initialized, but before the init Promise resolves
     * @return
     */
    onServiceReady(): void;
}

export interface UMFShortMessage {
    to?: unknown;
    frm?: unknown;
    hdr?: unknown;
    mid?: unknown;
    rmid?: unknown;
    sig?: unknown;
    tmo?: unknown;
    ts?: unknown;
    typ?: unknown;
    ver?: unknown;
    via?: unknown;
    fwd?: unknown;
    bdy?: unknown;
    aut?: unknown;
}

export interface UMFMessage {
    to?: unknown;
    from?: unknown;
    headers?: unknown;
    mid?: unknown;
    rmid?: unknown;
    signature?: unknown;
    timeout?: unknown;
    timestamp?: unknown;
    type?: unknown;
    version?: unknown;
    via?: unknown;
    forward?: unknown;
    body?: unknown;
    authorization?: unknown;
}

export interface HydraConfig {
    serviceIP?: string;
    servicePort?: number;
    serviceType?: string;
    serviceDescription?: string;
    redis?: {
        url?: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

export interface WrappedHydraConfig {
    hydra?: HydraConfig;
    [key: string]: unknown;
}

/**
 *
 * @summary Class for handling server requests
 */
declare class _ServerRequest {
    /**
     *
     * @summary Class constructor
     * @return
     */
    constructor();

    /**
     *
     * @summary sends an HTTP Request
     * @param options - request options
     * @return promise
     */
    send(options: {
        method: 'POST' | 'PUT' | 'PATCH';
        headers: { [key: string]: string };
        timeout: number;
        body: unknown;
        [key: string]: unknown;
    }): Promise<unknown>;
}

export type ServerRequest = InstanceType<typeof _ServerRequest>;

/**
 *
 * @summary Class for handling server responses
 */
declare class _ServerResponse {
    /**
     *
     * @summary Class constructor
     */
    constructor();

    /**
     *
     * @summary Set this module in test mode
     * @return
     */
    setTestMode(): void;

    /**
     *
     * @summary Enable / Disable CORS support
     * @param state - true if CORS should be enabled
     * @return
     */
    enableCORS(state: boolean): void;

    /**
     *
     * @summary Create a data response object.
     * @description This creates a consistently formatted HTTP response. It can be used
     *              with any of the server-response send methods in the data param.
     * @param httpCode - HTTP code (Ex. 404)
     * @param resultPayload - object with {result: somevalue}
     * @return response - object suitable for sending via HTTP
     */
    createResponseObject(
        httpCode: number,
        resultPayload: { result: unknown },
    ): { statusCode: number; statusMessage: string; statusDescription: string; result: unknown };

    /**
     *
     * @summary Send a server response to caller.
     * @param code - HTTP response code
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendResponse(code: number, res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_OK server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendOk(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_CREATED server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendCreated(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_MOVED_PERMANENTLY server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendMovedPermanently(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_BAD_REQUEST server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendInvalidRequest(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_UNAUTHORIZED server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendInvalidUserCredentials(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_PAYMENT_REQUIRED server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendPaymentRequired(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_FORBIDDEN server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendForbidden(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_NOT_FOUND server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendNotFound(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_BAD_REQUEST server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendInvalidSession(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_SERVER_ERROR server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendRequestFailed(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_CONFLICT server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendDataConflict(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_TOO_LARGE server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendTooLarge(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_TOO_MANY_REQUEST server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendTooManyRequests(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_SERVER_ERROR server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendServerError(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Alias for sendServerError
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendInternalError(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_METHOD_NOT_IMPLEMENTED server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendMethodNotImplemented(res: unknown, data: { headers?: { [key: string]: string } }): void;

    /**
     *
     * @summary Send an HTTP_CONNECTION_REFUSED server response to caller.
     * @param res - Node HTTP response object
     * @param data - An object to send
     * @return
     */
    sendUnavailableError(res: unknown, data: { headers?: { [key: string]: string } }): void;

    static readonly HTTP_OK: number;
    static readonly HTTP_CREATED: number;
    static readonly HTTP_ACCEPTED: number;
    static readonly HTTP_MOVED_PERMANENTLY: number;
    static readonly HTTP_FOUND: number;
    static readonly HTTP_NOT_MODIFIED: number;
    static readonly HTTP_BAD_REQUEST: number;
    static readonly HTTP_UNAUTHORIZED: number;
    static readonly HTTP_PAYMENT_REQUIRED: number;
    static readonly HTTP_FORBIDDEN: number;
    static readonly HTTP_NOT_FOUND: number;
    static readonly HTTP_METHOD_NOT_ALLOWED: number;
    static readonly NOT_ACCEPTABLE: number;
    static readonly HTTP_CONFLICT: number;
    static readonly HTTP_TOO_LARGE: number;
    static readonly HTTP_TOO_MANY_REQUEST: number;
    static readonly HTTP_SERVER_ERROR: number;
    static readonly HTTP_METHOD_NOT_IMPLEMENTED: number;
    static readonly HTTP_CONNECTION_REFUSED: number;
    static readonly HTTP_SERVICE_UNAVAILABLE: number;

    static readonly STATUSMESSAGE: number;
    static readonly STATUSDESCRIPTION: number;
    static readonly STATUS: { [key: string]: [string, string] };
}

export type ServerResponse = InstanceType<typeof _ServerResponse>;

export interface Utils {
    /**
     * @summary Hashes a key to produce an MD5 hash
     * @param key - input key to hash
     * @return hash - hashed value
     */
    md5Hash(key: string): string;

    /**
     * @summary Safe JSON stringify
     * @param obj - object to stringify
     * @return string - stringified object.
     */
    safeJSONStringify(obj: unknown): string;

    /**
     * @summary Safe JSON parse
     * @param str - string which will be parsed
     * @return obj - parsed object
     *   Returns undefined if string can't be parsed into an object
     */
    safeJSONParse(str: string): unknown | undefined;

    /**
     * @summary returns a hash value for a supplied string
     * @see https://github.com/darkskyapp/string-hash
     * @param str - string to hash
     * @return hash - hash value
     */
    stringHash(str: string): number;

    /**
     * @summary generate a random id composed of alphanumeric characters
     * @see https://en.wikipedia.org/wiki/Base36
     * @return random string id
     */
    shortID(): string;

    /**
     * @summary determine whether a string is a valid UUID
     * @param str - possible UUID
     * @return
     */
    isUUID4(str: string): boolean;

    /**
     * @summary shuffle an array in place
     * @param a - array elements may be numbers, string or objects.
     * @return
     */
    shuffleArray(a: unknown[]): void;
}

/**
 *
 * @summary config helper
 * @return
 */
declare class _Config {
    /**
     * @summary init config object
     */
    constructor();

    /**
     * @summary Returns a plain-old JavaScript object
     * @return obj - a Plain old JavaScript Object.
     */
    getObject(): { [key in string | number]?: unknown };

    /**
     * @summary Perform initialization process.
     * @param cfg - path or URL to configuration JSON data or object
     * @param resolve - resolve function
     * @param reject - reject function
     * @return
     */
    _doInit(
        cfg: string | { [key in string | number]?: unknown },
        resolve: () => void,
        reject: (err: Error) => void,
    ): void;

    /**
     * @summary Perform initialization from a file.
     * @param configFilePath - path to configuration JSON data
     * @param resolve - resolve function
     * @param reject - reject function
     * @return
     */
    _doInitViaFile(configFilePath: string, resolve: () => void, reject: (err: Error) => void): void;

    /**
     * @summary Initializes config object with JSON file data.
     * @param cfg - path to config file or config object
     * @return promise - resolves if successful, else rejects
     */
    init(cfg: string | { [key in string | number]?: unknown }): Promise<void>;
}

export type Config = InstanceType<typeof _Config>;

/**
 * @summary Base class for Hydra.
 * @fires Hydra#log
 * @fires Hydra#message
 */
declare class _Hydra extends MyEmitter<{
    log: { ts: string; serviceName: string; type: string; processID: string; msg: string };
    message: UMFShortMessage;
    metric: string;
}> {
    constructor();

    /**
     * @summary Adds plugins to Hydra
     * @param plugins - plugins to register
     * @return - Promise which will resolve when all plugins are registered
     */
    use(...plugins: HydraPlugin[]): Promise<void>;

    /**
     * @summary Registers a plugin with Hydra
     * @param plugin - HydraPlugin to use
     * @return Promise or value
     */
    _registerPlugin(plugin: HydraPlugin): Promise<void>;

    /**
     * @summary Register plugins then continue initialization
     * @param config - a string with a path to a configuration file or an
     *                         object containing hydra specific keys/values
     * @param testMode - whether hydra is being started in unit test mode
     * @return promise - resolves with this._init or rejects with an appropriate
     *                  error if something went wrong
     */
    init(config: WrappedHydraConfig, testMode?: boolean): Promise<HydraConfig>;

    /**
     * @summary Initialize Hydra with config object.
     * @param config - configuration object containing hydra specific keys/values
     * @return promise - resolving if init success or rejecting otherwise
     */
    _init(config: WrappedHydraConfig): Promise<void>;

    /**
     * @summary Update instance id and direct message key
     * @return
     */
    _updateInstanceData(): void;

    /**
     * @summary Shutdown hydra safely.
     * @return
     */
    _shutdown(): Promise<void>;

    /**
     * @summary Configure access to Redis and monitor emitted events.
     * @param config - Redis client configuration
     * @return promise - resolves or reject
     */
    _connectToRedis(config: HydraConfig): Promise<void>;

    /**
     * @summary Retrieves a list of Redis keys based on pattern.
     * @param pattern - pattern to filter with
     * @return promise - promise resolving to array of keys or or empty array
     */
    _getKeys(pattern: string): Promise<string[]>;

    /**
     * @summary Retrieves the service name of the current instance.
     * @throws Throws an error if this machine isn't an instance.
     * @return serviceName - returns the service name.
     */
    _getServiceName(): string;

    /**
     * @summary Returns the server instance ID.
     * @return instance id
     */
    _serverInstanceID(): string;

    /**
     * @summary Registers this machine as a Hydra instance.
     * @description This is an optional call as this module might just be used to monitor and query instances.
     * @return promise - resolving if registration success or rejecting otherwise
     */
    _registerService(): Promise<{ serviceName: string; servicePort: string; serviceIP: string }>;

    /**
     * @summary Register routes
     * @description Routes must be formatted as UMF To routes. https://github.com/cjus/umf#%20To%20field%20(routing)
     * @param routes - array of routes
     * @return Promise - resolving or rejecting
     */
    _registerRoutes(routes: string[]): Promise<void>;

    /**
     * @summary Retrieves a array list of routes
     * @param serviceName - name of service to retrieve list of routes.
     *                 If param is undefined, then the current serviceName is used.
     * @return Promise - resolving to array of routes or rejection
     */
    _getRoutes(serviceName: string): Promise<string[]>;

    /**
     * @summary Retrieve all service routes.
     * @return Promise - resolving to an object with keys and arrays of routes
     */
    _getAllServiceRoutes(): Promise<{ [key: string]: string[] }>;

    /**
     * @summary Matches a route path to a list of registered routes
     * @param routePath - a URL path to match
     * @return match - true if match, false if not
     */
    _matchRoute(routePath: string): boolean;

    /**
     * @summary Delete's the services routes.
     * @return Promise - resolving or rejection
     */
    _flushRoutes(): Promise<unknown>;

    /**
     * @summary Update service presence.
     * @return
     */
    _updatePresence(): void;

    /**
     * @summary Update service heath.
     * @return
     */
    _updateHealthCheck(): void;

    /**
     * @summary Retrieve server health info.
     * @return obj - object containing server info
     */
    _getHealth(): {
        serviceName: string;
        instanceID: string;
        hostName: string;
        sampledOn: string;
        processID: string;
        architecture: 'arm' | 'arm64' | 'ia32' | 'mips' | 'mipsel' | 'ppc' | 'ppc64' | 's390' | 's390x' | 'x32' | 'x64';
        platform: 'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32';
        nodeVersion: string;
        memory: { [key: string]: number };
        uptimeSeconds: number;
    };

    /**
     * @summary Log a message to the service's health log queue.
     * @throws Throws an error if this machine isn't an instance.
     * @event Hydra#log
     * @param type - type of message ('error', 'info', 'debug' or user defined)
     * @param message - message to log
     * @param suppressEmit - false by default. If true then suppress log emit
     * @return
     */
    _logMessage(type: string, message: string, suppressEmit: boolean): void;

    /**
     * @summary Retrieve a list of available services.
     * @return promise - returns a promise
     */
    _getServices(): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Retrieve a list of services even if inactive.
     * @return promise - returns a promise
     */
    _getServiceNodes(): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Find a service.
     * @param name - service name - note service name is case insensitive
     * @return promise - which resolves with service
     */
    _findService(name: string): Promise<{ [key: string]: unknown }>;

    /**
     * @summary Retrieves all the "present" service instances information.
     * @description Differs from getServicePresence (which calls this one)
     *              in that this performs only bare minimum fatal error checking that
     *              would throw a reject().  This is useful when it's expected to perhaps
     *              have some dead serivces, etc. as used in getServiceHealthAll()
     *              for example.
     * @param [name=our service name] - service name - note service name is case insensitive
     * @return promise - which resolves with a randomized service presence array or else
     *              a reject() if a "fatal" error occured (Redis error for example)
     */
    _checkServicePresence(name?: string): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Retrieve a service / instance's presence info.
     * @param name - service name - note service name is case insensitive
     * @return promise - which resolves with service presence
     */
    _getServicePresence(name?: string): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Retrieve the health status of an instance service.
     * @param name - name of instance service.
     * @description If not specified then the current instance is assumed. - note service name is case insensitive.
     * @return promise - a promise resolving to the instance's health info
     */
    _getServiceHealth(name?: string): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Return the instance id for this process
     * @return id - instanceID
     */
    _getInstanceID(): number;

    /**
     * @summary Return the version of this instance
     * @return version - instance version
     */
    _getInstanceVersion(): number;

    /**
     * @summary Get this service's health log.
     * @throws Throws an error if this machine isn't a instance
     * @param name - name of instance service. If not specified then the current instance is assumed.
     * @return promise - resolves to log entries
     */
    _getServiceHealthLog(name?: string): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Retrieve the health status of all instance services.
     * @return promise - resolves with an array of objects containing instance health information.
     */
    _getServiceHealthAll(): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Choose an instance from a list of service instances.
     * @param instanceList - array list of service instances
     * @param defaultInstance - default instance
     * @return promise - resolved or rejected
     */
    _chooseServiceInstance(
        instanceList: Array<{ [key: string]: unknown }>,
        defaultInstance?: string,
    ): Promise<{ [key: string]: unknown }>;

    /**
     * @summary Attempt an API request to a hydra service.
     * @description
     * @param instanceList - array of service instance objects
     * @param parsedRoute - parsed route
     * @param umfmsg - UMF message
     * @param resolve - promise resolve function
     * @param reject - promise reject function
     * @param sendOpts - serverResponse.send options
     * @return
     */
    _tryAPIRequest(
        instanceList: Array<{ [key: string]: unknown }>,
        parsedRoute: { [key: string]: unknown },
        umfmsg: UMFMessage,
        resolve: () => unknown,
        reject: () => unknown,
        sendOpts: { [key: string]: unknown },
    ): void;

    /**
     * @summary Makes an API request to a hydra service.
     * @description If the service isn't present and the message object has its
     *              message.body.fallbackToQueue value set to true, then the
     *              message will be sent to the services message queue.
     * @param message - UMF formatted message
     * @param sendOpts - serverResponse.send options
     * @return promise - response from API in resolved promise or
     *                   error in rejected promise.
     */
    _makeAPIRequest(
        message: UMFMessage,
        sendOpts?: { [key: string]: unknown },
    ): Promise<{
        statusCode: number;
        statusMessage: string;
        statusDescription: string;
        result: { reason?: string; [key: string]: unknown };
        [key: string]: unknown;
    }>;

    /**
     * @summary Sends a message to a Redis pubsub channel
     * @param channel - channel name
     * @param message - UMF formatted message object
     * @return
     */
    _sendMessageThroughChannel(channel: string, message: UMFMessage): void;

    /**
     * @summary Sends a message to an instances of a hydra service.
     * @param message - UMF formatted message object
     * @return promise - resolved promise if sent or
     *                  HTTP error in resolve() if something bad happened
     */
    _sendMessage(
        message: UMFMessage,
    ): Promise<
        | undefined
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          }
    >;

    /**
     * @summary Sends a reply message based on the original message received.
     * @param originalMessage - UMF formatted message object
     * @param messageResponse - UMF formatted message object
     * @return promise - resolved promise if sent or
     *                   error in rejected promise.
     */
    _sendReplyMessage(
        originalMessage: UMFMessage,
        messageResponse: UMFMessage,
    ): Promise<
        | undefined
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          }
    >;

    /**
     * @summary Sends a message to all present instances of a hydra service.
     * @param message - UMF formatted message object
     * @return promise - resolved promise if sent or
     *                   error in rejected promise.
     */
    _sendBroadcastMessage(
        message: UMFMessage,
    ): Promise<
        | undefined
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          }
    >;

    /**
     * @summary Queue a message
     * @param message - UMF message to queue
     * @return promise - resolving to the message that was queued or a rejection.
     */
    _queueMessage(
        message: UMFMessage,
    ): Promise<
        | UMFMessage
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          }
    >;

    /**
     * @summary retrieve a queued message
     * @param serviceName who's queue might provide a message
     * @return promise - resolving to the message that was dequeued or a rejection.
     */
    _getQueuedMessage(serviceName: string): Promise<UMFMessage>;

    /**
     * @summary Mark a queued message as either completed or not
     * @param message - message in question
     * @param completed - (true / false)
     * @param reason - if not completed this is the reason processing failed
     * @return promise - resolving to the message that was dequeued or a rejection.
     */
    _markQueueMessage(message: UMFMessage, completed: boolean, reason: string): Promise<UMFMessage>;

    /**
     * @summary Indicate if a service has presence.
     * @description Indicates if a service has presence, meaning the
     *              service is running in at least one node.
     * @param name - service name - note service name is case insensitive
     * @return promise - which resolves with TRUE if presence is found, FALSE otherwise
     */
    _hasServicePresence(name: string): Promise<boolean>;

    /**
     * @summary retrieve a stored configuration file
     * @param label - service label containing servicename and version: such as myservice:0.0.1
     * @return promise - resolving to a configuration file in object format
     */
    _getConfig(label: string): { [key: string]: unknown };

    /**
     * @summary store a configuration file
     * @param label - service label containing servicename and version: such as myservice:0.0.1
     * @param config - configuration object
     * @return promise - resolving or rejecting.
     */
    _putConfig(label: string, config: { [key: string]: unknown }): Promise<void>;

    /**
     * @summary Return a list of config keys
     * @param serviceName - name of service
     * @return promise - resolving or rejecting.
     */
    _listConfig(serviceName: string): Promise<void>;

    /**
     * @summary get a Redis client connection which points to the same Redis server that hydra is using
     * @param [options] - override options from original createClient call
     * @param [callback] - callback for async connect
     * @return - Redis Client
     */
    _getClonedRedisClient(
        options?: ((err: unknown, client: unknown) => void) | { [key in number | string]?: unknown },
        callback?: (err: unknown, client: unknown) => void,
    ): unknown;

    /**
     * @summary returns UMF object helper
     * @return helper - UMF helper
     */
    _getUMFMessageHelper(): {
        /**
         * @summary Create a message instance
         * @param message - message object
         * @return
         */
        createMessage: (msg: { [key: string]: unknown }) => UMFMessage;
        /**
         * @summary parses message route strings
         * @param toValue - string to be parsed
         * @return object - containing route parameters. If the
         *                  object contains an error field then the route
         *                  isn't valid.
         */
        parseRoute: (
            toValue: string,
        ) => {
            instance?: string;
            subID?: string;
            serviceName?: string;
            httpMethod?: string;
            apiRoute?: string;
            error?: string;
        };
    };

    /**
     * @summary returns ServerRequest helper
     * @return helper - service request helper
     */
    _getServerRequestHelper(): ServerRequest;

    /**
     * @summary returns ServerResponse helper
     * @return helper - service response helper
     */
    _getServerResponseHelper(): ServerResponse;

    /**
     * @summary returns a utils helper
     * @return helper - utils helper
     */
    _getUtilsHelper(): Utils;

    /**
     *
     * @summary returns a config helper
     * @return helper - config helper
     */
    _getConfigHelper(): Config;

    /**
     * @summary Create a server response using an HTTP code and reason
     * @param httpCode - code using ServerResponse.HTTP_XXX
     * @param reason - reason description
     * @return response - response object for use with promise resolve and reject calls
     */
    protected _createServerResponseWithReason(
        httpCode: unknown,
        reason: string,
    ): { [key: string]: unknown; result: { reason: string } };

    /**
     * @summary Parse and process given port data in config
     * @param port - configured port
     * @return promise - resolving with unassigned port, rejecting when no free port is found
     */
    protected _parseServicePortConfig(port: number): Promise<number>;

    /**
     * @summary retrieve a free service port in given range
     * @param min - Minimum port number, included
     * @param max - Maximum port number, included
     * @param callback - Callback function when done
     * @param portsTried - Ports which have been tried
     * @return
     */
    protected _getUnassignedRandomServicePort(
        min: number,
        max: number,
        callback: (port: number) => void,
        portsTried: number[],
    ): void;

    /**
     * @summary Create a UMF style message.
     * @description This is a helper function which helps format a UMF style message.
     *              The caller is responsible for ensuring that required fields such as
     *              "to", "from" and "body" are provided either before or after using
     *              this function.
     * @param message - optional message overrides.
     * @return message - a UMF formatted message.
     */
    _createUMFMessage(msg: { [key: string]: unknown }): UMFMessage;

    /**
     * @summary Retrieve an ISO 8601 timestamp.
     * @return timestamp - ISO 8601 timestamp
     */
    _getTimeStamp(): string;

    /**
     * @summary Retrieve the version from the host app's package.json file.
     * @return version - package version
     */
    _getParentPackageJSONVersion(): string;
}

export type Hydra = InstanceType<typeof _Hydra>;

/**
 * @summary Interface to Hydra, can provide microservice functionality or be used to monitor microservices.
 * @fires Hydra#log
 * @fires Hydra#message
 */
declare class _IHydra extends _Hydra {
    constructor();

    /**
     * @summary Initialize Hydra with config object.
     * @param config - a string with a path to a configuration file or an
     *                         object containing hydra specific keys/values
     * @param testMode - whether hydra is being started in unit test mode
     * @return promise - resolving if init success or rejecting otherwise
     */
    init(config: WrappedHydraConfig, testMode: boolean): Promise<HydraConfig>;

    /**
     * @summary Use plugins
     * @param plugins - plugins to process
     * @return
     */
    use(...plugins: HydraPlugin[]): Promise<void>;

    /**
     * @summary Shutdown hydra safely.
     * @return
     */
    shutdown(): Promise<void>;

    /**
     * @summary Registers this machine as a Hydra instance.
     * @description This is an optional call as this module might just be used to monitor and query instances.
     * @return promise - resolving if registration success or rejecting otherwise
     */
    registerService(): Promise<{ serviceName: string; servicePort: string; serviceIP: string }>;

    /**
     * @summary Retrieves the service name of the current instance.
     * @throws Throws an error if this machine isn't a instance.
     * @return serviceName - returns the service name.
     */
    getServiceName(): string;

    /**
     * @summary Retrieve a list of available instance services.
     * @return promise - returns a promise which resolves to an array of objects.
     */
    getServices(): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Retrieve a list of services even if inactive.
     * @return promise - returns a promise
     */
    getServiceNodes(): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Find a service.
     * @param name - service name - note service name is case insensitive
     * @return promise - which resolves with service
     */
    findService(name: string): Promise<{ [key: string]: unknown }>;

    /**
     * @summary Retrieve a service / instance's presence info.
     * @param name - service name - note service name is case insensitive
     * @return promise - which resolves with service presence
     */
    getServicePresence(name?: string): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Return the instance id for this process
     * @return id - instanceID
     */
    getInstanceID(): number;

    /**
     * @summary Return the version of this instance
     * @return version - instance version
     */
    getInstanceVersion(): number;

    /**
     * @summary Retrieve service health info.
     * @return obj - object containing service health info
     */
    getHealth(): {
        serviceName: string;
        instanceID: string;
        hostName: string;
        sampledOn: string;
        processID: string;
        architecture: 'arm' | 'arm64' | 'ia32' | 'mips' | 'mipsel' | 'ppc' | 'ppc64' | 's390' | 's390x' | 'x32' | 'x64';
        platform: 'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32';
        nodeVersion: string;
        memory: { [key: string]: number };
        uptimeSeconds: number;
    };

    /**
     * @summary Log a message to the service instance's health log queue.
     * @throws Throws an error if this machine isn't a instance.
     * @param type - type of message ('error', 'info', 'debug' or user defined)
     * @param message - message to log
     * @param suppressEmit - false by default. If true then suppress log emit
     * @return
     */
    sendToHealthLog(type: string, message: string, suppressEmit: boolean): void;

    /**
     * @summary Get this service's health log.
     * @throws Throws an error if this machine isn't a instance
     * @param name - name of instance, use getName() if current service is the target.
     *                        note service name is case insensitive.
     * @return promise - resolves to log entries
     */
    getServiceHealthLog(name?: string): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Retrieve the health status of all instance services.
     * @return promise - resolves with an array of objects containing instance health information.
     */
    getServiceHealthAll(): Promise<Array<{ [key: string]: unknown }>>;

    /**
     * @summary Create a UMF style message.
     * @description This is a helper function which helps format a UMF style message.
     *              The caller is responsible for ensuring that required fields such as
     *              "to", "from" and "body" are provided either before or after using
     *              this function.
     * @param message - optional message overrides.
     * @return message - a UMF formatted message.
     */
    createUMFMessage(msg: { [key: string]: unknown }): UMFMessage;

    /**
     * @summary Makes an API request to a hydra service.
     * @description If the service isn't present and the message object has its
     *              message.body.fallbackToQueue value set to true, then the
     *              message will be sent to the services message queue.
     * @param message - UMF formatted message
     * @param sendOpts - serverResponse.send options
     * @return promise - response from API in resolved promise or
     *                   error in rejected promise.
     */
    makeAPIRequest(
        message: UMFMessage,
        sendOpts?: { [key: string]: unknown },
    ): Promise<{
        statusCode: number;
        statusMessage: string;
        statusDescription: string;
        result: { reason?: string; [key: string]: unknown };
        [key: string]: unknown;
    }>;

    /**
     * @summary Sends a message to all present instances of a  hydra service.
     * @param message - Plain string or UMF formatted message object
     * @return promise - resolved promise if sent or
     *                   error in rejected promise.
     */
    sendMessage(
        message: UMFMessage,
    ): Promise<
        | undefined
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          }
    >;

    /**
     * @summary Sends a reply message based on the original message received.
     * @param originalMessage - UMF formatted message object
     * @param messageResponse - UMF formatted message object
     * @return promise - resolved promise if sent or
     *                   error in rejected promise.
     */
    sendReplyMessage(
        originalMessage: UMFMessage,
        messageResponse: UMFMessage,
    ): Promise<
        | undefined
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          }
    >;

    /**
     * @summary Sends a message to all present instances of a  hydra service.
     * @param message - Plain string or UMF formatted message object
     * @return promise - resolved promise if sent or
     *                   error in rejected promise.
     */
    sendBroadcastMessage(
        message: UMFMessage,
    ): Promise<
        | undefined
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          }
    >;

    /**
     * @summary Register routes
     * @description Routes must be formatted as UMF To routes. https://github.com/cjus/umf#%20To%20field%20(routing)
     * @param routes - array of routes
     * @return Promise - resolving or rejecting
     */
    registerRoutes(routes: string[]): Promise<void>;

    /**
     * @summary Retrieve all service routes.
     * @return Promise - resolving to an object with keys and arrays of routes
     */
    getAllServiceRoutes(): Promise<{ [key: string]: string[] }>;

    /**
     * @summary Matches a route path to a list of registered routes
     * @param routePath - a URL path to match
     * @return match - true if match, false if not
     */
    matchRoute(routePath: string): boolean;

    /**
     * @summary Queue a message
     * @param message - UMF message to queue
     * @return promise - resolving to the message that was queued or a rejection.
     */
    queueMessage(
        message: UMFMessage,
    ): Promise<
        | UMFMessage
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          }
    >;

    /**
     * @summary retrieve a queued message
     * @param serviceName who's queue might provide a message
     * @return promise - resolving to the message that was dequeued or a rejection.
     */
    getQueuedMessage(serviceName: string): Promise<UMFMessage>;

    /**
     * @summary Mark a queued message as either completed or not
     * @param message - message in question
     * @param completed - (true / false)
     * @param reason - if not completed this is the reason processing failed
     * @return promise - resolving to the message that was dequeued or a rejection.
     */
    markQueueMessage(message: UMFMessage, completed: boolean, reason: string): Promise<UMFMessage>;

    /**
     * @summary retrieve a stored configuration file
     * @param label - service label containing servicename and version: such as myservice:0.0.1
     * @return promise - resolving to a configuration file in object format
     */
    getConfig(label: string): { [key: string]: unknown };

    /**
     * @summary store a configuration file
     * @param label - service label containing servicename and version: such as myservice:0.0.1
     * @param config - configuration object
     * @return promise - resolving or rejecting.
     */
    putConfig(label: string, config: { [key: string]: unknown }): Promise<void>;

    /**
     * @summary Return a list of config keys
     * @param serviceName - name of service
     * @return promise - resolving or rejecting.
     */
    listConfig(serviceName: string): Promise<void>;

    /**
     * @summary Indicate if a service has presence.
     * @description Indicates if a service has presence, meaning the
     *              service is running in at least one node.
     * @param name - service name - note service name is case insensitive
     * @return promise - which resolves with TRUE if presence is found, FALSE otherwise
     */
    hasServicePresence(name: string): Promise<boolean>;

    /**
     * @summary get a Redis client connection which points to the same Redis server that hydra is using
     * @return - Redis Client
     */
    getClonedRedisClient(): unknown;

    /**
     * @summary returns UMF object helper
     * @return helper - UMF helper
     */
    getUMFMessageHelper(): {
        /**
         * @summary Create a message instance
         * @param message - message object
         * @return
         */
        createMessage: (msg: { [key: string]: unknown }) => UMFMessage;
        /**
         * @summary parses message route strings
         * @param toValue - string to be parsed
         * @return object - containing route parameters. If the
         *                  object contains an error field then the route
         *                  isn't valid.
         */
        parseRoute: (
            toValue: string,
        ) => {
            instance?: string;
            subID?: string;
            serviceName?: string;
            httpMethod?: string;
            apiRoute?: string;
            error?: string;
        };
    };

    /**
     * @summary returns ServerRequest helper
     * @return helper - service request helper
     */
    getServerRequestHelper(): ServerRequest;

    /**
     * @summary returns ServerResponse helper
     * @return helper - service response helper
     */
    getServerResponseHelper(): ServerResponse;

    /**
     * @summary returns a Utils helper
     * @return helper - utils helper
     */
    getUtilsHelper(): Utils;

    /*
     * @summary returns a config helper
     * @return helper - config helper
     */
    getConfigHelper(): Config;
}

export type IHydra = InstanceType<typeof _IHydra>;

declare const _export: IHydra;
export default _export;
