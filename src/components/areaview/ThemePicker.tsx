import * as React from "react";
import { mix } from "../../lib";

const styles: { [prop: string]: string } = require("./ThemePicker.css");

interface ThemePickerProps {
    onColorPick(color: string): void;
}

/**
 * 组件最外层样式
 */
// const colorPickerStyles = {
//     marginBottom: 10,
// };
/**
 * 文字部分样式
 */
// const themeTextStyles = {
//     marginBottom: 10,
// };
/**
 * 颜色列表的样式
 */
// const pickerListStyles = {
//     listStyleType: "none",
//     display: "flex",
//     flexWrap: "wrap",
//     height: 50,
//     justifyContent: "space-between",
// } as React.CSSProperties;
/**
 * 每个颜色项目的样式
 */
// const listElementStyles = {
//     width: 50,
//     height: 50,
//     cursor: "pointer",
// };

export class ThemePicker extends React.Component<ThemePickerProps, {}> {
    private colors = [
        { name: "purple", value: "#a525a5" },
        { name: "pink", value: "#FFC0CB" },
        { name: "green", value: "#34bc34" },
        { name: "orange", value: "#f29f08" },
        { name: "skyblue", value: "#87cefa" },
    ];

    render() {
        return (
            <div className={styles.picker}>
                <p className={styles.text}>主题</p>
                <ul className={styles.pickList}>
                    {this.colors.map(color => (
                        <li
                            className={styles.pickElement}
                            style={{ backgroundColor: color.value }}
                            onClick={e => this.props.onColorPick(color.value)}
                            key={color.name}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
