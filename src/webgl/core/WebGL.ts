import { IWebGLContext, IWebGLContexxtProvider } from "./types";
import { Canvas } from "../Canvas";
import { SceneContext } from "../SceneContext";
import { TriangleScene } from "../../app/scenes/TriangleScene";
import { IScene } from "../IScene";
// import _ from "loadsh";

export class WebGL {
    readonly gl: IWebGLContext;
    private readonly provider: IWebGLContexxtProvider;
    private readonly canvas: Canvas;
    private readonly CANVAS_SIZE: number[] = [500, 500];
    private scene: IScene;

    constructor(provider: IWebGLContexxtProvider) {
        this.canvas = new Canvas(...this.CANVAS_SIZE);
        // NOTE: setSizeの呼ぶタイミングで表示おかしくなる
        // this.canvas.setSize(300, 300);
        this.provider = provider;
        this.gl = this.provider.getContext(this.canvas);
    }

    setup() {
        this.clear();
        this.createScene();
    }

    createScene() {
        const sceneContext = new SceneContext(this.gl, this.canvas);
        this.scene = new TriangleScene(sceneContext);
    }

    render() { }

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
