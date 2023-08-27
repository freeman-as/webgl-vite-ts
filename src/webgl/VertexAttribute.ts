export class VertexAttribute {
    public readonly data: number[];
    public readonly options: { [key in string]: number }

    constructor(data: number[], location: number, stride: number) {
        this.data = data;
        this.options = {
            location: location,
            stride: stride
        };
    }
}