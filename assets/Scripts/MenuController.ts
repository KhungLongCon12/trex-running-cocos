import { CactusType } from "./../Enums/CactusEnum";
import {
  _decorator,
  Component,
  instantiate,
  Prefab,
  Sprite,
  Vec3,
  Node,
} from "cc";
import { ModelController } from "./ModelController";
import { ViewController } from "./ViewController";
import { DinoControl } from "./DinoControl";
const { ccclass, property } = _decorator;

@ccclass("MenuController")
export class MenuController extends Component {
  @property({ type: ViewController })
  private view: ViewController;

  @property({ type: ModelController })
  private model: ModelController;

  @property({ type: Sprite })
  private spGround: Sprite[] = [null, null];

  @property({ type: DinoControl })
  private dinoCtrl: DinoControl;

  @property({ type: Prefab })
  private cactusPrefabs: Prefab | null = null;

  @property({ type: Prefab })
  private dinoFlyPrefab: Prefab | null = null;

  @property({ type: Node })
  private cactusNodes: Node = null;

  private cactusTypes: CactusType[] = [];
  private spawnIntervalForCactus: number = 1.5;
  private spawnIntervalForDinoFly: number = 5.0;
  private spawnTimer: number = 0;

  protected start(): void {}

  protected update(deltaTime: number): void {
    this.groundMoving(deltaTime);

    // Time for cactus spawn
    this.spawnTimer += deltaTime;

    if (this.spawnTimer >= this.spawnIntervalForCactus) {
      this.spawnCactusAndDinoFly();
      this.spawnTimer = 0;
    }
    if (this.spawnTimer >= this.spawnIntervalForDinoFly) {
      this.spawnCactusAndDinoFly();
      this.spawnTimer = 0;
    }

    this.cactusMoving(deltaTime);
  }

  groundMoving(value: number) {
    for (let i = 0; i < this.spGround.length; i++) {
      const ground = this.spGround[i].node.getPosition();
      ground.x -= 600 * value;

      if (ground.x <= -1500) {
        ground.x = 1500;
      }

      this.spGround[i].node.setPosition(ground);
    }
  }

  createCactus(type: CactusType) {
    const cactusNode = instantiate(this.cactusPrefabs);
    this.cactusNodes.addChild(cactusNode);
    console.log("run create");

    switch (type) {
      case CactusType.CACTUS_LARGE_DOUBLE:
        console.log("Case 1");
        break;

      case CactusType.CACTUS_LARGE_SINGLE:
        console.log("Case 2");
        break;

      case CactusType.CACTUS_LARGE_TRIPLE:
        console.log("Case 3");
        break;

      case CactusType.CACTUS_SMALL_DOUBLE:
        console.log("Case 4");
        break;

      case CactusType.CACTUS_SMALL_SINGLE:
        console.log("Case 5");
        break;

      case CactusType.CACTUS_SMALL_TRIPLE:
        console.log("Case 6");
        break;

      default:
        break;
    }
  }

  createDinoFlying() {
    const dinoFlyNode = instantiate(this.dinoFlyPrefab);
    dinoFlyNode.getPosition();
    console.log(dinoFlyNode.getPosition());
  }

  spawnCactusAndDinoFly() {
    const randomIndex = Math.floor(Math.random() * this.cactusTypes.length);
    const cactusType = this.cactusTypes[randomIndex];

    this.createCactus(cactusType);
    this.createDinoFlying();
  }

  cactusMoving(value: number) {
    const cactusPool = this.cactusNodes?.children;

    if (cactusPool) {
      for (let i = 0; i < cactusPool.length; i++) {
        const cactus = cactusPool[i];
        const pos = cactus.getPosition();
        pos.x -= 600 * value;

        if (pos.x <= -1500) {
          cactus.removeFromParent();
          i--;
        } else {
          cactus.position = pos;
        }
      }
    }
  }

  dinoFlyMoving(value: number) {}
}
