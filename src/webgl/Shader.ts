import { IWebGLContext } from "./core/types";

export class Shader {
    private readonly shader: WebGLShader;

    constructor(gl: IWebGLContext, type: number, source: string) {
        let _shader = gl.createShader(type);

        if (_shader == null) {
            throw new Error("failed to create shader.");
        }

        // textプロパティからシェーダコードの文字列取得して割り当てる
        gl.shaderSource(_shader, source);
        gl.compileShader(_shader);

        if (!gl.getShaderParameter(_shader, gl.COMPILE_STATUS)) {
            const message = gl.getShaderInfoLog(_shader);
            // alert(message);
            throw new Error(`failed to compile shader. message: ${message}`);
        }

        this.shader = _shader;
    }

    get src(): WebGLShader {
        return this.shader;
    }
}