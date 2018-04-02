import * as React from "react";
import { mix } from "../../lib";

interface AddNewItemProps {
  /**input的值，确保输入的内容与props的值保持一致 */
  value: string;
  /**输入改变的事件处理函数 */
  onValueChange(e: React.ChangeEvent<HTMLInputElement>): void;
  /**点击“添加”之后，添加新todo事项的处理函数 */
  onAddClicked(): void;
  /**取消输入的处理函数 */
  onCancelClicked(): void;
}

interface AddNewItemState {
  cancelButtonHover: boolean;
  addButtonHover: boolean;
}

const containerStyles = {
  margin: "0 20px",
  padding: "10px 0",
  height: 60,
  display: "flex",
  borderBottom: "1px solid rgba(206, 197, 197, 0.5)",
};
/**
 * “添加新todo”标志的样式
 */
const addSymbolStyles = {
  fontWeight: "bold",
  fontSize: "1.5em",
  color: "blue",
  flex: "0 1 30px",
  marginRight: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as React.CSSProperties;
/**
 * 自定义checkbox的样式
 */
const checkboxStyles = {
  fontSize: "1.5rem",
  width: 30,
  height: 30,
  margin: "0 10px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  border: "1px solid gray",
  color: "transparent",
  backgroundColor: "transparent",
  cursor: "pointer",
  transition: "color 0.3s, background-color 0.3s",
} as React.CSSProperties;
/**
 * 输入框的样式
 */
const inputStyles = {
  border: "none",
  flex: "10 1 100px",
  outline: "none",
};
/**
 * "X"按钮的样式
 */
const closeButtonStyles = {
  flex: "0 1 30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
} as React.CSSProperties;
/**
 * “添加”按钮的样式
 */
const addButtonStyles = mix(closeButtonStyles, { flex: "0 1 60px" });
/**
 * 按钮hover状态的样式
 */
const buttonHover = {
  backgroundColor: "rgba(206, 197, 197, 0.2)",
};

export class AddNewItem extends React.Component<AddNewItemProps, AddNewItemState> {
  constructor(props: AddNewItemProps) {
    super(props);
    this.state = {
      cancelButtonHover: false,
      addButtonHover: false,
    };

    // bind methods
    this.handleAddClicked = this.handleAddClicked.bind(this);
    this.handleCancelClicked = this.handleCancelClicked.bind(this);
    this.handleAddButtonMouseEnter = this.handleAddButtonMouseEnter.bind(this);
    this.handleAddButtonMouseLeave = this.handleAddButtonMouseLeave.bind(this);
    this.handleCloseButtonMouseEnter = this.handleCloseButtonMouseEnter.bind(this);
    this.handleCloseButtonMouseLeave = this.handleCloseButtonMouseLeave.bind(this);
  }

  private handleCancelClicked(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    this.props.onCancelClicked();
  }

  private handleAddClicked(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    this.props.onAddClicked();
  }

  private handleCloseButtonMouseEnter(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    this.setState({ cancelButtonHover: true });
  }

  private handleCloseButtonMouseLeave(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    this.setState({ cancelButtonHover: false });
  }

  private handleAddButtonMouseEnter(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    this.setState({ addButtonHover: true });
  }

  private handleAddButtonMouseLeave(e: React.MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    this.setState({ addButtonHover: false });
  }

  render() {
    const emptyValue = this.props.value === "";
    const symbolS = emptyValue ? addSymbolStyles : checkboxStyles;
    let addButtonS = addButtonStyles;
    let closeButtonS = closeButtonStyles;
    // 输入框内容为空的时候add和close都不显示
    if (emptyValue) {
      addButtonS = mix(addButtonS, { display: "none" });
      closeButtonS = mix(closeButtonS, { display: "none" });
    }
    // add和close各自hover的情况
    if (this.state.cancelButtonHover) {
      closeButtonS = mix(closeButtonS, buttonHover);
    }
    if (this.state.addButtonHover) {
      addButtonS = mix(addButtonS, buttonHover);
    }
    return (
      <div style={containerStyles}>
        <span style={symbolS}>{emptyValue ? "+" : ""}</span>
        <input
          type="text"
          style={inputStyles}
          placeholder="添加代办事项"
          value={this.props.value}
          onChange={this.props.onValueChange}
        />
        <span
          style={closeButtonS}
          onClick={this.handleCancelClicked}
          onMouseEnter={this.handleCloseButtonMouseEnter}
          onMouseLeave={this.handleCloseButtonMouseLeave}>
          X
        </span>
        <span
          style={addButtonS}
          onClick={this.handleAddClicked}
          onMouseEnter={this.handleAddButtonMouseEnter}
          onMouseLeave={this.handleAddButtonMouseLeave}>
          添加
        </span>
      </div>
    );
  }
}
