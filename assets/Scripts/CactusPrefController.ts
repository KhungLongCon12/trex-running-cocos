import {
  _decorator,
  BoxCollider2D,
  Component,
  randomRangeInt,
  Size,
  Sprite,
  SpriteFrame,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("CactusPrefController")
export class CactusPrefController extends Component {
  @property({ type: SpriteFrame })
  private cactusSprites: SpriteFrame[] = [];

  @property({ type: Sprite })
  private cactus: Sprite | null = null;

  private randomNumber: number = null;

  protected start(): void {
    this.getRandomCactus();
  }

  getRandomCactus() {
    this.randomNumber = randomRangeInt(0, 4);
    this.cactus.spriteFrame = this.cactusSprites[this.randomNumber];

    const setting = this.cactus.node.getComponent(UITransform);
    const editingCollider = this.cactus.node.getComponent(BoxCollider2D);

    switch (this.randomNumber) {
      case (this.randomNumber = 0):
        setting.setContentSize(70, 70); // for large Double
        editingCollider.size = new Size(70, 70);
        break;

      case (this.randomNumber = 1):
        setting.setContentSize(40, 70); // for large Single
        editingCollider.size = new Size(40, 70);
        break;

      case (this.randomNumber = 2):
        setting.setContentSize(68, 70); // for small double
        editingCollider.size = new Size(68, 70);
        break;

      case (this.randomNumber = 3):
        setting.setContentSize(34, 70); // for small single
        editingCollider.size = new Size(34, 70);
        break;

      case (this.randomNumber = 4):
        setting.setContentSize(80, 50); // for small triple
        editingCollider.size = new Size(80, 50);
        break;

      default:
        break;
    }
  }
}
