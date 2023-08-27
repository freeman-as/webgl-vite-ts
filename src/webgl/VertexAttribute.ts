export class VertexAttribute {
    public readonly data: number[];
    public readonly options: VertexAttributeOptions;

    constructor(data: number[], location: number, stride: number) {
        this.data = data;
        this.options = new VertexAttributeOptions(location, stride);
    }
}

export class VertexAttributeOptions {
    public readonly location: number;
    public readonly stride: number;

    constructor(location: number, stride: number) {
        this.location = location;
        this.stride = stride;
    }
}