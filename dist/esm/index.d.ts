import { EventContext } from "@cloudflare/workers-types";
import { PostwareFunction, MiddlewareFunction } from "types";
export { setHeaders } from "./postwares/setHeaders";
export declare function onRequestFactory({ template, middlewares, data, flags, clientSideData, postware, }: {
    template?: string | undefined;
    middlewares?: MiddlewareFunction[] | undefined;
    data?: Record<string, any> | undefined;
    flags?: Record<string, any> | undefined;
    clientSideData?: {} | undefined;
    postware?: PostwareFunction[] | undefined;
}): (cfContext: EventContext<any, any, any>) => Promise<import("@cloudflare/workers-types").Response | Response>;
