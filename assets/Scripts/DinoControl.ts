import {
  _decorator,
  Component,
  EventKeyboard,
  input,
  Input,
  KeyCode,
  tween,
  Vec3,
  Node,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("DinoControl")
export class DinoControl extends Component {
  private jumpingGap: number = 200;
  private jumpDuration: number = 0.5;
  private isJump: boolean = false;
  private hit: boolean = false;

  protected start(): void {
    this.initListener();
  }

  initListener() {
    input.on(Input.EventType.KEY_DOWN, this.onClickJump, this);
  }

  onClickJump(event: EventKeyboard) {
    if (event.keyCode === KeyCode.SPACE && !this.isJump) {
      this.isJump = true;
      this.jumping();
    }
  }

  jumping() {
    const startPosition = this.node.position.clone();

    const targetPosition = new Vec3(
      startPosition.x,
      startPosition.y + this.jumpingGap,
      0
    );

    tween(this.node)
      .to(this.jumpDuration / 2, { position: targetPosition })
      .call(() => {
        tween(this.node)
          .to(this.jumpDuration / 2, { position: startPosition })
          .call(() => {
            this.isJump = false;
          })
          .start();
      })
      .start();
  }
}
