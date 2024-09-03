"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriterFactory = rewriterFactory;
const rules_1 = require("./rules");
function rewriterFactory(rewriterContext) {
    // @ts-expect-error: HTMLRewriter is available only in the Cloudflare environment
    const rewriter = new HTMLRewriter();
    for (const rule of rules_1.rules) {
        rule(rewriter, rewriterContext);
    }
    return rewriter;
}
