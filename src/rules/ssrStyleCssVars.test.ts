import { HTMLRewriter } from "@/test/HTMLRewriter";
import { RewriterContext } from "types";
import { describe, it, expect } from "vitest";
import { ssrStyleCssVars } from "./ssrStyleCssVars";

describe("ssrStyleCssVars", () => {
  it("should move the style element to the head", async () => {
    const rewriter = new HTMLRewriter();
    const ctx: RewriterContext = {
      headElements: [],
      data: {
        color: {
          primary: "red",
        },
      },
    };

    ssrStyleCssVars(rewriter, ctx);

    const result = await rewriter.transform(
      '<head><ssr-style data-ssr-css-vars="color.primary:primary"></ssr-style></head>',
    );

    expect(result).toBe("<head></head>");

    const awaitedHeadElements = await Promise.all(ctx.headElements);
    expect(awaitedHeadElements).toEqual([
      "<style >:root{--primary:red;}</style>",
    ]);
  });

  it("should add the variable to the style element", async () => {
    const rewriter = new HTMLRewriter();
    const ctx: RewriterContext = {
      data: {
        color: {
          primary: "red",
        },
      },
    };

    ssrStyleCssVars(rewriter, ctx);

    const result = await rewriter.transform(
      '<ssr-style data-ssr-css-vars="color.primary:primary"></ssr-style>',
    );

    expect(result).toBe("<style>:root{--primary:red;}</style>");
  });
});
