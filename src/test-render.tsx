import { render } from "@testing-library/react";
import { RenderOptions } from "@testing-library/react";
import { AllProviders } from "./test-utils";

type Options = RenderOptions<
  typeof import("@testing-library/dom/types/queries"),
  HTMLElement,
  HTMLElement
>;
const customRender = (ui: React.ReactElement, options?: Options) =>
  render(ui, { wrapper: AllProviders, ...options });

// export * from "@testing-library/react";
export { customRender as render };
