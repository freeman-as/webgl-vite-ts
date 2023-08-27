export class VertexAttribute {
    public readonly data: number[];
    public readonly location: number;
    public readonly stride: number;

    constructor(data: number[], location: number, stride: number) {
        this.data = data;
        this.location = location;
        this.stride = stride;
    }
}