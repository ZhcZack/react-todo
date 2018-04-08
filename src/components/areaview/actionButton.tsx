import * as React from "react";
import { mix } from "../../lib";

const styles: { [prop: string]: string } = require("./ActionButton.css");

interface Props {
    /**
     * 可拓展的样式
     */
    style?: React.CSSProperties;
    /**
     * 按钮的点击事件
     */
    onClick(): void;
    /**
     * 按钮的文本内容
     */
    text: string;
}

interface State {
    // /**
    //  * 按钮的hover状态
    //  */
    // hover: boolean
}

// const styles: React.CSSProperties = {
//   height: 40,
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   cursor: 'pointer',
// }
// const hoverStyle: React.CSSProperties = {
//   backgroundColor: 'rgba(206, 197, 197, 0.2)',
// }

/**
 * 操作列表里的选项按钮
 */
export class ActionButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // this.state = {
        //   hover: false,
        // }

        // bind methods
        this.handleClick = this.handleClick.bind(this);
        // this.mouseEnter = this.mouseEnter.bind(this)
        // this.mouseLeave = this.mouseLeave.bind(this)
    }
    render() {
        // let S = mix(styles, this.props.style ? this.props.style : {})
        // if (this.state.hover) {
        //   S = mix(S, hoverStyle)
        // }
        return (
            <li
                className={styles.button}
                onClick={this.handleClick}
                // onMouseEnter={this.mouseEnter}
                // onMouseLeave={this.mouseLeave}
            >
                {this.props.text}
            </li>
        );
    }

    private handleClick(e: React.MouseEvent<HTMLLIElement>) {
        e.stopPropagation();
        this.props.onClick();
    }

    // private mouseEnter(e: React.MouseEvent<HTMLLIElement>) {
    //   e.stopPropagation()
    //   this.setState({
    //     hover: true,
    //   })
    // }

    // private mouseLeave(e: React.MouseEvent<HTMLLIElement>) {
    //   e.stopPropagation()
    //   this.setState({
    //     hover: false,
    //   })
    // }
}
