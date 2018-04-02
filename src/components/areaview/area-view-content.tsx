import * as React from "react";
import { TodoItem } from "../../model/interface";
import { AreaViewItem } from "./area-view-item";

interface AreaViewContentProps {
  /**要显示的todo事项 */
  items: TodoItem[];
  /**切换todo事项的完成状态，处理方法 */
  checkboxClicked(e: React.MouseEvent<HTMLDivElement>, name: string): void;
  /**在detail view里显示/编辑todo事项的详细内容，处理方法 */
  itemClicked(e: React.MouseEvent<HTMLLIElement>, name: string): void;
  /**拖拽todo事项 */
  onDragStart(data: string): void;
  /**拖拽结束 */
  onDragEnd(): void;
  /**是否显示已标记为“完成”的项目 */
  showDoneItems: boolean;
  /**
   * 这个区域属不属于基本列表
   */
  isPrimary: boolean;
}

const viewStyles = {
  maxHeight: "calc(100vh - 200px -60px)",
  overflow: "auto",
} as React.CSSProperties;
const viewListStyles = {
  margin: "0 20px",
};

interface AreaViewContentState {}

export class AreaViewContent extends React.Component<AreaViewContentProps, AreaViewContentState> {
  private createList(): (JSX.Element | null)[] {
    return this.props.items.map(item => {
      if (this.props.showDoneItems) {
        return (
          <AreaViewItem
            isPrimary={this.props.isPrimary}
            item={item}
            onItemClicked={this.props.itemClicked}
            onCheckboxClicked={this.props.checkboxClicked}
            onDragStart={this.props.onDragStart}
            onDragEnd={this.props.onDragEnd}
            key={item.name}
          />
        );
      }
      if (item.done && !this.props.isPrimary) {
        return null;
      }
      return (
        <AreaViewItem
          isPrimary={this.props.isPrimary}
          item={item}
          onItemClicked={this.props.itemClicked}
          onCheckboxClicked={this.props.checkboxClicked}
          onDragStart={this.props.onDragStart}
          onDragEnd={this.props.onDragEnd}
          key={item.name}
        />
      );
    });
  }
  render() {
    return (
      <div style={viewStyles}>
        <ul style={viewListStyles}>{this.createList()}</ul>
      </div>
    );
  }
}
