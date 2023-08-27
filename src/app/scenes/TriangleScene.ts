import { IWebGLContext } from "../../webgl/core/types";
import { SceneBase } from "../../webgl/SceneBase";
import { SceneContext } from "../../webgl/SceneContext";
import vertexShaderSource from "../shaders/triangle.vert?raw";
import fragmentShaderSource from "../shaders/triangle.frag?raw";
import { Matrix } from "../../lib/Matrix";
import { VertexAttribute } from "../../webgl/VertexAttribute";

export class TriangleScene extends SceneBase {
    private readonly gl: IWebGLContext;
    private readonly sceneCtx: SceneContext;

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
        this.gl.enableVertexAttribArray(posAttribute.location);
        this.gl.vertexAttribPointer(posAttribute.location, posAttribute.stride, this.gl.FLOAT, false, 0, 0);

        // 頂点カラー
        const vtxColBuf = this.sceneCtx.createVertexBuffer(new Float32Array(colAttribute.data));
        vtxColBuf.bufferData();
        this.gl.enableVertexAttribArray(colAttribute.location);
        this.gl.vertexAttribPointer(colAttribute.location, colAttribute.stride, this.gl.FLOAT, false, 0, 0);

        // 各種行列の生成と初期化
        const m = new Matrix();
        let mMatrix = m.identity(m.create());
        let vMatrix = m.identity(m.create());
        let pMatrix = m.identity(m.create());
        let mvpMatrix = m.identity(m.create());

        // ビュー座標変換行列
        m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);

        // プロジェクション座標変換行列
        m.perspective(90, this.sceneCtx.canvas.aspect, 0.1, 100, pMatrix);

        // 各行列を掛け合わせ座標変換行列として合成
        m.multiply(pMatrix, vMatrix, mvpMatrix);
        m.multiply(mvpMatrix, mMatrix, mvpMatrix);

        // uniformLocation取得
        var uniLocation = program.getUniformLocation('mvpMatrix');

        // uniformLocationへ座標変換行列登録
        this.gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

        // 描画
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        // コンテキストの再描画
        this.gl.flush();
    }
}