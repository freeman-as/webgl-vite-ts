import { IWebGLContext } from "../../webgl/core/types";
import { SceneBase } from "../../webgl/SceneBase";
import { SceneContext } from "../../webgl/SceneContext";
import vertexShaderSource from "../shaders/triangle.vert?raw";
import fragmentShaderSource from "../shaders/triangle.frag?raw";
import { Matrix } from "../../lib/Matrix";
import { VertexAttribute } from "../../webgl/VertexAttribute";
import { Program } from "../../webgl/Program";

export class TestScene extends SceneBase {
    private readonly gl: IWebGLContext;
    private readonly sceneCtx: SceneContext;
    private readonly program: Program;
    private count: number = 0;
    private m: Matrix;
    private mMatrix: Float32Array;
    private vMatrix: Float32Array;
    private pMatrix: Float32Array;
    private vpMatrix: Float32Array;
    private mvpMatrix: Float32Array;

    constructor(context: SceneContext) {
        super();

        this.count = 0;

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
        this.program = program;

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
        this.m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], this.vMatrix);

        // プロジェクション座標変換行列
        this.m.perspective(90, this.sceneCtx.canvas.aspect, 0.1, 100, this.pMatrix);
        this.m.multiply(this.pMatrix, this.vMatrix, this.vpMatrix);

    }

    draw(): void {
        // 各行列を掛け合わせ座標変換行列として合成
        this.m.identity(this.mMatrix);
        this.m.translate(this.mMatrix, [1.5, 0.0, 0.0], this.mMatrix);
        this.m.multiply(this.vpMatrix, this.mMatrix, this.mvpMatrix);

        // uniformLocation取得
        var uniLocation = this.program.getUniformLocation('mvpMatrix');
        this.gl.uniformMatrix4fv(uniLocation, false, this.mvpMatrix);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        this.m.identity(this.mMatrix);
        this.m.translate(this.mMatrix, [-1.5, 0.0, 0.0], this.mMatrix);

        this.m.identity(this.mvpMatrix);
        this.m.multiply(this.vpMatrix, this.mMatrix, this.mvpMatrix);

        this.gl.uniformMatrix4fv(uniLocation, false, this.mvpMatrix);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        this.gl.flush();
    }
}