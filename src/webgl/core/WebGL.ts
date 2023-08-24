import { Canvas } from "../Canvas";
import { WebGLContextProvider, WebGL2ContextProvider } from "../WebGLContextProvider";

export class WebGL {
    private provider: WebGLContextProvider | WebGL2ContextProvider;

    canvas: Canvas;
    gl: WebGLRenderingContext | WebGL2RenderingContext;

    constructor(provider: WebGLContextProvider | WebGL2ContextProvider) {
        this.canvas = new Canvas();
        this.provider = provider;
        this.gl = this.provider.getContext(this.canvas);
        this.canvas.setSize(500, 300);

        console.log('WebGL initialized');
    }

    setup() {
        this.Clear();
    }

    render() { }

    dispose() {

    }

    private Clear() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }
}

// export const gl = new WebGL(new WebGLContextProvider());