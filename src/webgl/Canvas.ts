import { WebGLContextProvider } from "./WebGLContextProvider";

export class Canvas {
    canvas: HTMLCanvasElement;

    constructor() {
        this.canvas = document.querySelector('.canvas') as HTMLCanvasElement;
        this.canvas.width = 0;
        this.canvas.height = 0;
    }

    setSize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    getContext(contextId: string): RenderingContext | null {
        return this.canvas.getContext(contextId);
    }
}