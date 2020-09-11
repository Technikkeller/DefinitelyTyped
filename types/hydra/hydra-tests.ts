import hydra, { ServerRequest, ServerResponse, Config, UMFMessage, Utils, HydraConfig } from 'hydra';

hydra.on('message', msg => {});
hydra.on('log', (log: { ts: string; serviceName: string; processID: string; msg: string }) => {});
hydra.on('metric', (metric: string) => {});

(async () => {
    const serverRequest: ServerRequest = hydra.getServerRequestHelper();
    const serverResponse: ServerResponse = hydra.getServerResponseHelper();
    const config: Config = hydra.getConfigHelper();
    const utils: Utils = hydra.getUtilsHelper();
    const msg: UMFMessage = hydra.createUMFMessage({ to: 'test' });
    const service: { [key: string]: unknown } = await hydra.findService('name');
    const serviceRoutes: { [key: string]: string[] } = await hydra.getAllServiceRoutes();
    const routeMatched: boolean = hydra.matchRoute('[get]/test');
    const config1 = hydra.getConfig('name');
    const health = hydra.getHealth();
    const instanceId: number = hydra.getInstanceID();
    const instanceVersion: number = hydra.getInstanceVersion();
    const queuedMessage: UMFMessage = await hydra.getQueuedMessage('name');
    const markedMessage: UMFMessage = await hydra.markQueueMessage({ to: 'test' }, false, 'desc');
    const allServiceHealth: Array<{ [key: string]: unknown }> = await hydra.getServiceHealthAll();
    const serviceHealthLog: Array<{ [key: string]: unknown }> = await hydra.getServiceHealthLog('service');
    const serviceName: string = hydra.getServiceName();
    const serviceNodes: Array<{ [key: string]: unknown }> = await hydra.getServiceNodes();
    const servicePresence: Array<{ [key: string]: unknown }> = await hydra.getServicePresence('test');
    const services: Array<{ [key: string]: unknown }> = await hydra.getServices();
    const UMFHelper: {
        createMessage: (msg: { [key: string]: unknown }) => UMFMessage;
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
    } = hydra.getUMFMessageHelper();
    const servicePresenceAvaivable: boolean = await hydra.hasServicePresence('name');
    const HydraConfig: HydraConfig = await hydra.init({ hydra: { redis: { url: 'test' } } }, false);
    hydra.listConfig('test');
    const req: {
        statusCode: number;
        statusMessage: string;
        statusDescription: string;
        result: { reason?: string; [key: string]: unknown };
        [key: string]: unknown;
    } = await hydra.makeAPIRequest({ to: '' });
    await hydra.putConfig('', {});
    const queuedMessage1:
        | UMFMessage
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          } = await hydra.queueMessage({ to: '' });
    await hydra.registerRoutes(['[get]/']);
    const registeredService: {
        serviceName: string;
        servicePort: string;
        serviceIP: string;
    } = await hydra.registerService();
    const sentMessage:
        | undefined
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          } = await hydra.sendBroadcastMessage({ to: '' });
    const sentMessage1:
        | undefined
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          } = await hydra.sendMessage({ to: '' });
    const sentMessage2:
        | undefined
        | {
              statusCode: number;
              statusMessage: string;
              statusDescription: string;
              result: { reason?: string; [key: string]: unknown };
              [key: string]: unknown;
          } = await hydra.sendReplyMessage({ to: '' }, { from: '' });
    hydra.sendToHealthLog('', '', false);
    await hydra.shutdown();
    await hydra.use();
})();
