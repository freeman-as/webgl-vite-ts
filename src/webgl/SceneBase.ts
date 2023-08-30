import { IScene } from "./IScene";

export abstract class SceneBase implements IScene {
    render(deltaTime: number): void {
        this.draw(deltaTime);
    }

    abstract draw(deltaTime: number): void
}