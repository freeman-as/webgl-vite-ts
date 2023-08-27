import { IWebGLContext, IWebGLContexxtProvider } from "./types";
import { Canvas } from "../Canvas";
import { SceneContext } from "../SceneContext";
import { IScene } from "../IScene";
import { factories } from "../SceneFactory";

// import _ from "loadsh";

export class WebGL {
    readonly gl: IWebGLContext;
    private readonly provider: IWebGLContexxtProvider;
    private readonly canvas: Canvas;
    private readonly scene: IScene;
    private readonly CANVAS_SIZE: number[] = [500, 500];

    constructor(provider: IWebGLContexxtProvider) {
        this.canvas = new Canvas(...this.CANVAS_SIZE);
        // NOTE: setSizeの呼ぶタイミングで表示おかしくなる
        // this.canvas.setSize(300, 300);
        this.provider = provider;
        this.gl = this.provider.getContext(this.canvas);
    }

    setup() {
        this.clear();
    }

    createScene(factory: factories) {
        const sceneContext = new SceneContext(this.gl, this.canvas);
        const scene = factory.create(sceneContext);
        this.scene = scene;
    }

    render() {
        const frame = () => {
            this.clear();
            this.scene.render();
            window.requestAnimationFrame(frame);
        }
        frame();
    }

    dispose() {

    }

    private createVbo(data: number[]) {
        let buffer = this.gl.createBuffer();

        if (buffer == null) {
            throw new Error("failed to create buffer.");
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        return buffer;
    }

    private clear() {
        // canvasカラー初期化
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // 初期深度設定
        this.gl.clearDepth(1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}

// export const gl = new WebGL(new WebGLContextProvider());
