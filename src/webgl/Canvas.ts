export class Canvas {
    private readonly canvas: HTMLCanvasElement;

    constructor(width: number = 0, height: number = 0) {
        this.canvas = document.querySelector('.canvas') as HTMLCanvasElement;
        this.setSize(width, height);
    }


    setSize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    get aspect() {
        return this.canvas.width / this.canvas.height;
    }

    getContext(contextId: string): RenderingContext | null {
        return this.canvas.getContext(contextId);
    }
}