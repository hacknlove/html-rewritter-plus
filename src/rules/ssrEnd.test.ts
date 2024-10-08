import { HTMLRewriterStrings } from "../test/HTMLRewriter";
import { RewriterContext } from "types.js";
import { describe, it, expect } from "vitest";
import { ssrEnd } from "./ssrEnd";

describe("ssrEnd", () => {
  it("move some end elements to the end of the body", async () => {
    const rewriter = new HTMLRewriterStrings();
    const ctx: RewriterContext = {
      data: {},
      clientSideData: {
        foo: "bar",
      },
    };

    ssrEnd(rewriter, ctx);

    const result = await rewriter.transform(`<body></body>`);

    expect(result).toBe(
      `<body></body><script>window.data={"foo":"bar"};document.dispatchEvent(new Event('on-data-loaded'))</script>`,
    );
  });
});
