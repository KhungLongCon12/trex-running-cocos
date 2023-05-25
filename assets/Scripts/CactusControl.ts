import { _decorator, Component, randomRangeInt, Sprite, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CactusControl")
export class CactusControl extends Component {
  @property({ type: SpriteFrame })
  private cactusSprites: SpriteFrame[] = [];

  @property({ type: Sprite })
  private cactus: Sprite | null = null;

  private randomNumber: number = null;

  protected start(): void {
    this.randomNumber = randomRangeInt(0, 5);
    this.cactus.spriteFrame = this.cactusSprites[this.randomNumber];
  }
}
