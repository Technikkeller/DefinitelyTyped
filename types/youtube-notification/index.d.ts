// Type definitions for youtube-notification 1.1.0
// Project: https://github.com/wizanyx/Youtube-Notification
// Definitions by: Justus Fluegel <justusfluegel@gmail.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import { IncomingMessage, ServerResponse } from "http";

declare module "youtube-notification" {
    type EventMap = Record<string, any>;

    type EventKey<T extends EventMap> = string & keyof T;
    type EventReceiver<T> = (params: T) => void;

    interface Emitter<T extends EventMap> {
        on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
        off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
        emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
    }
    abstract class MyEmitter<T extends EventMap> implements Emitter<T> {
        on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
        off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
        emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
    }

    export interface Request extends IncomingMessage {
        params: Record<string, string>;
        param: Record<string, string>;
        path: string;
        query: Record<string, string | string[]>;
        search: string | null;
    }

    export type Response = ServerResponse;

    export default class YoutubeNotifier extends MyEmitter<{subscribe: undefined, unsubscribe: undefined, notified: {channel: {id: string, name: string, link: string}, video: {id: string, title: string, link: string}, published: Date, updated: Date}}> {
        constructor(config: {hubCallback: string, secret?: string, middleware?: boolean, path?: string, port?:number, hubUrl?: string})
        setup() : void;
        listener() : (req: Request, res: Response) => void
        subscribe(channels: string | string[]) : void;
        unsubscribe(channels: string | string[]) : void;
    }
}