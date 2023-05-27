import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ResultController")
export class ResultController extends Component {
  @property({ type: Label })
  private score: Label;

  @property({ type: Label })
  private highScore: Label;

  private maxScore: number = 0;
  private currentScore: number = 0;

  protected start(): void {}

  updateScore(scoreValue: number) {
    this.currentScore = scoreValue;
    this.score.string = `${this.currentScore}`;
  }

  addScore() {
    this.updateScore(this.currentScore++);
  }

  resetScore() {
    this.updateScore(0);
    this.hideResult();
  }

  showResult() {
    this.maxScore = Math.max(this.maxScore, this.currentScore);
    this.highScore.string = `HI  ${this.maxScore}`;

    this.node.active = true;
  }

  hideResult() {
    this.node.active = false;
  }
}
