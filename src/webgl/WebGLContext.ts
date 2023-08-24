import { Canvas } from "./Canvas";

export class WebGLContext {
    context: WebGLRenderingContext

    constructor(canvas: Canvas) {
        this.context = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
    }
}

export class WebGL2Context {
    context: WebGL2RenderingContext

    constructor(canvas: Canvas) {
        this.context = (canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2')) as WebGL2RenderingContext;
    }
}