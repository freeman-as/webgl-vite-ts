import { IWebGLContext } from "./core/types";
import { Shader } from "./Shader";

export class Program {
    private readonly gl: IWebGLContext;
    private readonly program: WebGLProgram;

    constructor(gl: IWebGLContext, vs: Shader, fs: Shader) {
        let _program = gl.createProgram();

        if (_program == null) {
            throw new Error("failed to create program.");
        }

        gl.attachShader(_program, vs.src);
        gl.attachShader(_program, fs.src);
        gl.linkProgram(_program);

        if (!gl.getProgramParameter(_program, gl.LINK_STATUS)) {
            const message = gl.getProgramInfoLog(_program);
            // alert(message);
            throw new Error(`failed to link program. message: ${message}`);
        }

        // プログラムオブジェクト有効化
        gl.useProgram(_program);

        this.gl = gl;
        this.program = _program;
    }

    use() {
        this.gl.useProgram(this.program);
    }

    getAttribLocation(name: string) {
        return this.gl.getAttribLocation(this.program, name);
    }

    getUniformLocation(name: string) {
        return this.gl.getUniformLocation(this.program, name);
    }
}