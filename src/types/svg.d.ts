// This tells TypeScript what the ?react suffix on SVG imports is
/// <reference types="vite/client" />

declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
