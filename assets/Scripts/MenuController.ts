import { CactusType } from "./../Enums/CactusEnum";
import {
  _decorator,
  Component,
  instantiate,
  Prefab,
  Sprite,
  Node,
  randomRangeInt,
  director,
} from "cc";
import { ModelController } from "./ModelController";
import { ViewController } from "./ViewController";
import { DinoController } from "./DinoControl";
import { ResultController } from "./ResultController";
const { ccclass, property } = _decorator;

@ccclass("MenuController")
export class MenuController extends Component {
  @property({ type: ViewController })
  private view: ViewController;

  @property({ type: ModelController })
  private model: ModelController;

  @property({ type: Sprite })
  private spGround: Sprite[] = [null, null];

  @property({ type: Sprite })
  private spCloud: Sprite[] = [null, null];

  @property({ type: ResultController })
  private result: ResultController;

  @property({ type: Prefab })
  private cactusPrefabs: Prefab | null = null;

  @property({ type: Prefab })
  private dinoFlyPrefab: Prefab | null = null;

  @property({ type: Node })
  private cactusNodes: Node = null;

  @property({ type: Node })
  private dinoFlyNodes: Node = null;

  private spawnIntervalForCactus: number = 3;
  private spawnTimerCactus: number = 0;

  private spawnIntervalForDinoFly: number = 20.0;
  private spawnTimerDino: number = 0;

  private speed: number = 300;

  protected onLoad(): void {
    this.result.resetScore();
  }

  startGame() {
    this.result.hideResult();
    director.resume();
  }

  protected update(deltaTime: number): void {
    this.groundMoving(deltaTime);
    this.cloudMoving(deltaTime);

    // Time for cactus spawn
    this.spawnTimerCactus += deltaTime;

    if (this.spawnTimerCactus >= this.spawnIntervalForCactus) {
      this.spawnCactus();
      this.spawnTimerCactus = 0;
    }

    // time for dino spawn
    this.spawnTimerDino += deltaTime;

    if (this.spawnTimerDino >= this.spawnIntervalForDinoFly) {
      this.spawnDinoFly();
      this.spawnTimerDino = 0;
    }

    this.cactusMoving(deltaTime);
    this.dinoFlyMoving(deltaTime);
  }

  groundMoving(value: number) {
    for (let i = 0; i < this.spGround.length; i++) {
      const ground = this.spGround[i].node.getPosition();
      ground.x -= this.speed * value;

      if (ground.x <= -1500) {
        ground.x = 1500;
      }

      this.spGround[i].node.setPosition(ground);
    }
  }

  cloudMoving(value: number) {
    for (let i = 0; i < this.spCloud.length; i++) {
      const cloud = this.spCloud[i].node.getPosition();

      cloud.x -= (this.speed / 4) * value;

      if (cloud.x <= -320) {
        cloud.x = 780;
        cloud.y = randomRangeInt(-150, 15);
      }

      this.spCloud[i].node.setPosition(cloud);
    }
  }

  spawnCactus() {
    const cactusNode = instantiate(this.cactusPrefabs);
    this.cactusNodes.addChild(cactusNode);
  }

  cactusMoving(value: number) {
    const cactusPool = this.cactusNodes?.children;

    if (cactusPool) {
      for (let i = 0; i < cactusPool.length; i++) {
        const cactus = cactusPool[i];
        const pos = cactus.getPosition();
        pos.x -= this.speed * value;

        if (pos.x <= -1500) {
          cactus.removeFromParent();
          i--;
        } else {
          cactus.position = pos;
        }
      }
    }
  }

  spawnDinoFly() {
    console.log("spawn Dino");
    const dinoFlyNode = instantiate(this.dinoFlyPrefab);
    this.dinoFlyNodes.addChild(dinoFlyNode);
  }

  dinoFlyMoving(value: number) {
    const dinoFlyPool = this.dinoFlyNodes?.children;

    if (dinoFlyPool) {
      for (let i = 0; i < dinoFlyPool.length; i++) {
        const dinoFly = dinoFlyPool[i];
        const pos = dinoFly.getPosition();
        pos.x -= this.speed * value;

        if (pos.x <= -1500) {
          dinoFly.removeFromParent();
        } else {
          dinoFly.position = pos;
        }
      }
    }
  }
}
