import { IWebGLContext } from "../../webgl/core/types";
import { SceneBase } from "../../webgl/SceneBase";
import { SceneContext } from "../../webgl/SceneContext";
import vertexShaderSource from "../shaders/triangle.vert?raw";
import fragmentShaderSource from "../shaders/triangle.frag?raw";
import { Matrix } from "../../lib/Matrix";
import { VertexAttribute } from "../../webgl/VertexAttribute";

export class TriangleAnimationScene extends SceneBase {
    private readonly gl: IWebGLContext;
    private readonly sceneCtx: SceneContext;
    private m: Matrix;
    private mMatrix: Float32Array;
    private vMatrix: Float32Array;
    private pMatrix: Float32Array;
    private vpMatrix: Float32Array;
    private mvpMatrix: Float32Array;
    private elapsedTime: number;
    private uniLocation: WebGLUniformLocation;

    constructor(context: SceneContext) {
        super();

        const positions = [
            0.0, 1.0, 0.0,
            1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0
        ];

        const colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0
        ];

        this.sceneCtx = context;
        this.gl = this.sceneCtx.gl;

        const vertexShader = this.sceneCtx.createVertexShader(vertexShaderSource);
        const fragmentShader = this.sceneCtx.createFragmentShader(fragmentShaderSource);
        const program = this.sceneCtx.createProgram(vertexShader, fragmentShader);

        // attribute準備
        let attLocation = program.getAttribLocation('position');
        const posAttribute = new VertexAttribute(positions, attLocation, 3);
        attLocation = program.getAttribLocation('color');
        const colAttribute = new VertexAttribute(colors, attLocation, 4);

        // 頂点座標
        const vtxPosBuf = this.sceneCtx.createVertexBuffer(new Float32Array(posAttribute.data));
        vtxPosBuf.bufferData();
        this.sceneCtx.setAttribute(posAttribute.options);

        // 頂点カラー
        const vtxColBuf = this.sceneCtx.createVertexBuffer(new Float32Array(colAttribute.data));
        vtxColBuf.bufferData();
        this.sceneCtx.setAttribute(colAttribute.options);

        // 各種行列の生成と初期化
        this.m = new Matrix();
        this.mMatrix = this.m.identity(this.m.create());
        this.vMatrix = this.m.identity(this.m.create());
        this.pMatrix = this.m.identity(this.m.create());
        this.vpMatrix = this.m.identity(this.m.create());
        this.mvpMatrix = this.m.identity(this.m.create());

        // ビュー座標変換行列
        this.m.lookAt([0.0, 0.0, 3.0], [0, 0, 0], [0, 1, 0], this.vMatrix);

        // プロジェクション座標変換行列
        this.m.perspective(90, this.sceneCtx.canvas.aspect, 0.1, 100, this.pMatrix);
        this.m.multiply(this.pMatrix, this.vMatrix, this.vpMatrix);

        this.uniLocation = program.getUniformLocation('mvpMatrix');

        this.elapsedTime = 0;
    }

    draw(deltaTime: number): void {
        // アニメーションパラメータ―用にms変換して経過時間保持
        this.elapsedTime += (deltaTime / 1000);
        let rad = (this.elapsedTime % 360) * Math.PI / 180;

        const speed = 30;
        const x = Math.cos(rad * speed);
        const y = Math.sin(rad * speed);

        // 各行列を掛け合わせ座標変換行列として合成
        // 移動
        this.m.identity(this.mMatrix); // 座標変換前に初期化
        this.m.translate(this.mMatrix, [x, y + 1.0, 0.0], this.mMatrix);
        this.m.multiply(this.vpMatrix, this.mMatrix, this.mvpMatrix);

        this.gl.uniformMatrix4fv(this.uniLocation, false, this.mvpMatrix);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        // 回転
        this.m.identity(this.mMatrix);
        this.m.translate(this.mMatrix, [1.0, -1.0, 0.0], this.mMatrix);
        this.m.rotate(this.mMatrix, rad * speed, [0, 1, 0], this.mMatrix);
        this.m.multiply(this.vpMatrix, this.mMatrix, this.mvpMatrix);

        this.gl.uniformMatrix4fv(this.uniLocation, false, this.mvpMatrix);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        // 拡大縮小
        this.m.identity(this.mMatrix);
        this.m.translate(this.mMatrix, [-1.0, -1.0, 0.0], this.mMatrix);
        const minScale = 0.25;
        const maxScale = 1.5;
        const s = Math.max(minScale, Math.abs(Math.sin(rad * speed) * maxScale));
        this.m.scale(this.mMatrix, [s, s, 0.0], this.mMatrix);
        this.m.multiply(this.vpMatrix, this.mMatrix, this.mvpMatrix);

        this.gl.uniformMatrix4fv(this.uniLocation, false, this.mvpMatrix);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        this.gl.flush();
    }
}