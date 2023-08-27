import { IWebGLContext } from "./types";

export class VertexBufferObject<T extends BufferSource> {
    private readonly gl: IWebGLContext;
    private buffer: WebGLBuffer;
    private data: T;
    private target: number;
    private usage: number;

    constructor(gl: IWebGLContext, target: number, data: T, usage: number) {
        let _buffer = gl.createBuffer();

        if (_buffer == null) {
            throw new Error("failed to create buffer.");
        }

        this.gl = gl;
        this.target = target;
        this.data = data;
        this.usage = usage;
        this.buffer = _buffer;
    }

    bufferData() {
        this.bindBuffer();
        this.gl.bufferData(this.target, this.data, this.usage);
    }

    bindBuffer() {
        this.gl.bindBuffer(this.target, this.buffer);
    }

    unbind() {
        this.gl.bindBuffer(this.target, null);
    }
}