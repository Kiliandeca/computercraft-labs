declare module http {

    export interface Request {
        url: string;
        body?: string;
        headers?: { [key: string]: string };
        binary?: boolean;
        method?: string;
        redirect?: boolean;
        timeout?: number;
    }

    export interface Response {
        getResponseCode(): number;
        getResponseMessage(): string;
        getResponseHeaders(): { [key: string]: string };
        readAll(): string;
        close(): void;
    }

    export interface WebSocket {
        send(message: string, binary?: boolean): void;
        receive(timeout?: number): LuaMultiReturn<[string | undefined, boolean]>;
        close(): void;
    }

    /*
        Make a HTTP GET request to the given url.
    */
    export function get(url: string, headers?: { [key: string]: string }, binary?: boolean): LuaMultiReturn<[Response | undefined, string, Response?]>;
    export function get (request: Request): Response | LuaMultiReturn<[undefined, string, Response?]>;

    /*
        Make a HTTP POST request to the given url.
    */
    export function post(url: string, body: string, headers?: { [key: string]: string }, binary?: boolean): Response | LuaMultiReturn<[undefined, string, Response?]>;
    export function post(request: Request): LuaMultiReturn<[Response | undefined, string, Response?]>;

    /*
        Asynchronously make a HTTP request to the given url.
    */
    export function request(url: string, body?: string, headers?: { [key: string]: string }, binary?: boolean): void;
    export function request(request: Request): void;

    /*
        Asynchronously determine whether a URL can be requested.
    */
    export function checkURLAsync(url: string): LuaMultiReturn<[boolean, string]>;

    /*
        Determine whether a URL can be requested.
    */
    export function checkURL(url: string): LuaMultiReturn<[boolean, string]>;

    /*
        Asynchronously open a websocket.
    */
    export function websocketAsync(url: string, headers?: { [key: string]: string }): void;
    export function websocketAsync(request: Request): void;

    /*
        Open a websocket.
    */
    export function websocket(url: string, headers?: { [key: string]: string }): LuaMultiReturn<[WebSocket | false, string]>;
    export function websocket(request: Request): LuaMultiReturn<[WebSocket | false, string]>;
}
