import { Canvas } from "./Canvas";

export class WebGLContextProvider {
    getContext(canvas: Canvas): WebGLRenderingContext {
        return (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
    }
}

export class WebGL2ContextProvider {
    getContext(canvas: Canvas): WebGL2RenderingContext {
        return (canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2')) as WebGL2RenderingContext;
    }
}