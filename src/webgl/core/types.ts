import { WebGLContextProvider, WebGL2ContextProvider } from "../WebGLContextProvider";

// // WebGL1とWebGL2の共通インターフェイス
export type IWebGLContext = WebGLRenderingContext | WebGL2RenderingContext;
export type IWebGLContexxtProvider = WebGLContextProvider | WebGL2ContextProvider;
