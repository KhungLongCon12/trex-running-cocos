import { _decorator, Component, Animation } from "cc";
import { ResultController } from "./ResultController";
const { ccclass, property } = _decorator;

@ccclass("ViewModel")
export class ViewModel extends Component {
  @property({ type: ResultController })
  private result: ResultController;

  start() {}

  update(deltaTime: number) {}
}
