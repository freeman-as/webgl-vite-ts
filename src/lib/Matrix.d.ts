type Vector3<T> = [T, T, T];

export class Matrix {
    constructor();
    create(): Float32Array;
    identity(mat: Float32Array): Float32Array;
    multiply(mat1: Float32Array, mat2: Float32Array, dest: Float32Array): Float32Array;
    scale(mat: Float32Array, vec: Vector3<number>, dest: Float32Array): Float32Array;
    translate(mat: Float32Array, vec: Vector3<number>, dest: Float32Array): Float32Array;
    rotate(mat: Float32Array, angle: number, axis: Vector3<number>, dest: Float32Array): Float32Array;
    lookAt(eye: Vector3<number>, center: Vector3<number>, up: Vector3<number>, dest: Float32Array): Float32Array;
    perspective(fov: number, aspect: number, near: number, far: number, dest: Float32Array): Float32Array;
    transpose(mat: Float32Array, dest: Float32Array): Float32Array;
    inverse(mat: Float32Array, dest: Float32Array): Float32Array;
}