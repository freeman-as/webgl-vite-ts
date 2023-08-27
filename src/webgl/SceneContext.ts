import { IWebGLContext } from "./core/types";
import { Canvas } from "./Canvas";
import { Shader } from "../../src/webgl/Shader";
import { Program } from "../../src/webgl/Program";
import { VertexBufferObject } from "./core/VertexBufferObject";

export class SceneContext {
    readonly gl: IWebGLContext;
    readonly canvas: Canvas;

    constructor(gl: IWebGLContext, canvas: Canvas) {
        this.gl = gl;
        this.canvas = canvas;
    }

    createVertexShader(source: string) {
        return new Shader(this.gl, this.gl.VERTEX_SHADER, source);
    }

    createFragmentShader(source: string) {
        return new Shader(this.gl, this.gl.FRAGMENT_SHADER, source);
    }

    createProgram(vertexShader: Shader, fragmentShader: Shader) {
        return new Program(this.gl, vertexShader, fragmentShader);
    }

    createVertexBuffer<T extends BufferSource>(data: T) {
        return new VertexBufferObject<T>(this.gl, this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    }

    createIndexBuffer() { }
}