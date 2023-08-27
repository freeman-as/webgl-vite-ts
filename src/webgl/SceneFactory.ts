import { IScene } from "./IScene";
import { TestScene } from "../app/scenes/TestScene";
import { SceneContext } from "./SceneContext";

export type factories = TriangleSceneFactory;

export abstract class SceneFactory<T extends IScene> {
    abstract create(sceneCtx: SceneContext): T;
}

export class TriangleSceneFactory extends SceneFactory<TestScene> {
    create(sceneCtx: SceneContext): TestScene {
        return new TestScene(sceneCtx);
    }
}
