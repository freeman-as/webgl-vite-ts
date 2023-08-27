import { IScene } from "./IScene";

export abstract class SceneBase implements IScene {
    render(): void {
        throw Error("")
    }
}