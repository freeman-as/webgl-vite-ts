import { IScene } from "./IScene";
import { SceneContext } from "./SceneContext";
import { TemplateScene } from "../app/scenes/TemplateScene";
import { TriangleScene } from "../app/scenes/TriangleScene";
import { TriangleAnimationScene } from "../app/scenes/TriangleAnimationScene";
import { IndicesScene } from "../app/scenes/IndicesScene";

// Factory用共通型定義
export type factories = TriangleSceneFactory | TriangleAnimationSceneFactory | IndicesSceneFactory;

export abstract class SceneFactory<T extends IScene> {
    abstract create(sceneCtx: SceneContext): T;
}

export class TriangleSceneFactory extends SceneFactory<TriangleScene> {
    create(sceneCtx: SceneContext) {
        return new TriangleScene(sceneCtx);
    }
}

export class TriangleAnimationSceneFactory extends SceneFactory<TriangleAnimationScene> {
    create(sceneCtx: SceneContext) {
        return new TriangleAnimationScene(sceneCtx);
    }
}

export class IndicesSceneFactory extends SceneFactory<IndicesScene> {
    create(sceneCtx: SceneContext) {
        return new IndicesScene(sceneCtx);
    }
}
