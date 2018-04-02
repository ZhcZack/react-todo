import * as React from "react";
import { ColorThemePicker } from "./colortheme-picker";
import { AreaActions } from "../util/area-actions";
import { mix } from "../../lib";

interface HeadProps {
  /**列表名称 */
  listName: string;
  /**列表主题色 */
  colorTheme: string;
  /**重命名列表，处理方法 */
  renameList(name: string): void;
  /**删除列表，处理方法 */
  deleteList(name: string): void;
  /**
   * 显示/隐藏已完成的todo事项
   */
  switchDoneItems(): void;
  /**
   * 是否要显示已完成的todo项目
   */
  doneItemsDisplay: boolean;
  /**该列表是否为“基础列表” */
  isPrimaryList: boolean;
  /**
   * 主题选择处理方法
   */
  onColorPick(color: string): void;
  actionsShouldDisplay: boolean;
  onActionsDisplayClick(): void;
}

interface HeadState {
  /**是否处于编辑状态 */
  isEdit: boolean;
  /**保存编辑后的名称，通过props的值初始化 */
  name: string;
}

/**
 * 最外层样式
 */
const headStyles = {
  height: 200,
  padding: 10,
  borderBottom: "1px solid rgba(206, 197, 197, 0.5)",
  display: "flex",
  position: "relative",
} as React.CSSProperties;

const headDirectChild = {
  alignSelf: "flex-end",
} as React.CSSProperties;
/**
 * 列表名称文字的样式
 */
const nameLabelStyles = {
  fontSize: "2rem",
  color: "white",
};
/**
 * 显示操作菜单按钮的样式
 */
const switcherStyles = {
  width: 40,
  height: 30,
  position: "absolute",
  right: 10,
  bottom: 10,
  border: "none",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
} as React.CSSProperties;

class AreaViewHead extends React.Component<HeadProps, HeadState> {
  private renameInput: HTMLInputElement | null;

  constructor(props: HeadProps) {
    super(props);
    this.renameInput = null;

    this.state = {
      isEdit: false,
      name: this.props.listName,
    };

    this.inputChange = this.inputChange.bind(this);
    this.renameClicked = this.renameClicked.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
    this.switchDoneItems = this.switchDoneItems.bind(this);
  }

  componentWillReceiveProps(nextProps: HeadProps) {
    // 传入新的listName之后，保存这个值作为编辑的预留名称
    this.setState({
      name: nextProps.listName,
      // isEdit: false,
    });
  }

  /**
   * 保存输入的内容，作为新的列表名
   * @param e 输入内容改变事件
   */
  private inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value,
    });
  }

  /**
   * 进行重命名工作
   * @param e 鼠标点击事件
   */
  private renameClicked() {
    this.props.onActionsDisplayClick();

    this.setState(
      {
        isEdit: true,
      },
      () => {
        if (this.renameInput) {
          this.renameInput.focus();
          this.renameInput.value = this.props.listName;
        }
      },
    );
  }

  /**
   * 确认删除列表操作
   * @param e 鼠标点击事件
   */
  private deleteClicked() {
    const result = confirm("确定删除此列表吗？");
    if (result) {
      this.props.deleteList(this.state.name);
    }
  }

  /**
   * 显示/隐藏操作列表的视图
   * @param e 鼠标点击事件
   */
  private handleSwitch(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    this.props.onActionsDisplayClick();
  }

  /**
   * 当焦点从输入框移走时，进行列表的重命名工作
   * @param e 焦点移走事件
   */
  private inputBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.stopPropagation();
    this.props.renameList(this.state.name);
    this.setState({
      isEdit: false,
    });
  }

  private switchDoneItems() {
    this.props.switchDoneItems();
    this.props.onActionsDisplayClick();
  }

  render() {
    const color = this.props.colorTheme;
    const hideS = this.state.isEdit ? { display: "none" } : {};
    if (this.props.isPrimaryList) {
      return (
        <div
          style={mix(headStyles, {
            background: `linear-gradient(to right, ${color}, ${color + "b3"})`,
          })}>
          <div style={mix(nameLabelStyles, headDirectChild)}>{this.props.listName}</div>
        </div>
      );
    }
    return (
      <div
        style={mix(headStyles, {
          background: `linear-gradient(to right, ${color}, ${color + "b3"})`,
        })}>
        <div style={mix(nameLabelStyles, headDirectChild, hideS)}>{this.props.listName}</div>
        <input
          style={mix(headDirectChild, this.state.isEdit ? {} : { display: "none" })}
          type="text"
          onChange={this.inputChange}
          ref={input => (this.renameInput = input)}
          onBlur={this.inputBlur}
        />
        <button style={mix(switcherStyles, { backgroundColor: color })} onClick={this.handleSwitch}>
          ···
        </button>
        <AreaActions
          actionsShouldDisplay={this.props.actionsShouldDisplay}
          doneItemsDisplay={this.props.doneItemsDisplay}
          onColorPick={this.props.onColorPick}
          switchDoneItems={this.switchDoneItems}
          renameClicked={this.renameClicked}
          deleteClicked={this.deleteClicked}
        />
      </div>
    );
  }
}

export { AreaViewHead as EditableHead };
