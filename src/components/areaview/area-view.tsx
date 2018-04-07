import * as React from 'react'
import { TodoItem, TodoList, ListInfo } from '../../model/interface'
import { DetailView } from './../detailview/detail-view'
import { AddNewItem } from './add-new-item'
import { AreaViewContent } from './area-view-content'
import { EditableHead } from './editable-head'
import { mix } from '../../lib'

interface Props {
  /**
   * 列表的信息
   */
  listInfo: ListInfo
  /**列表下的所有todo事项 */
  todoItems: TodoItem[]
  /**列表是否要紧缩 */
  shrink: boolean
  /**todo事项点击，处理方法 */
  itemClicked(itemName: string, listName: string): void
  /**重命名列表，处理方法 */
  renameList(oldName: string, newName: string): void
  /**删除列表处理方法 */
  shouldDeleteList(): void
  /**在列表中添加新todo项目，处理方法 */
  addNewItemInList(itemName: string, listName: string): void
  /**切换todo事项完成状态，处理方法 */
  toggleItemInList(itemName: string, listName: string): void
  /**拖拽todo事项 */
  onDragStart(data: string): void
  /**拖拽结束/被取消 */
  onDragEnd(): void
  /**
   * 主题选择处理函数
   * @param color 主题色
   */
  onColorPick(color: string): void
  /**
   * 显示/隐藏操作区域
   */
  onActionsDisplayClick(): void
  /**
   * 操作区域是否要显示在屏幕上
   */
  actionsShouldDisplay: boolean
}

interface State {
  /**文本框输入的数据内容 */
  inputValue: string
  showDoneItems: boolean
}

const viewStyles: React.CSSProperties = {
  width: 'calc(100% - 280px)',
  overflow: 'hidden',
}
const viewShrinkStyles = {
  width: 'calc(100% - 280px - 280px)',
}

export class AreaView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputValue: '',
      showDoneItems: false,
    }

    // bind methods
    this.handleInput = this.handleInput.bind(this)
    this.cancelInput = this.cancelInput.bind(this)
    this.toggleItem = this.toggleItem.bind(this)
    this.displayDetailView = this.displayDetailView.bind(this)
    this.addNewItem = this.addNewItem.bind(this)
    this.renameList = this.renameList.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.switchDoneItems = this.switchDoneItems.bind(this)
  }

  render() {
    const listInfo = this.props.listInfo

    return (
      <div
        style={this.props.shrink ? mix(viewStyles, viewShrinkStyles) : viewStyles}
        onClick={e => {
          e.stopPropagation()
          this.props.actionsShouldDisplay && this.props.onActionsDisplayClick()
        }}>
        <EditableHead
          isPrimaryList={listInfo.isPrimary}
          listName={listInfo.name}
          colorTheme={listInfo.theme}
          renameList={this.renameList}
          shouldDeleteList={this.props.shouldDeleteList}
          switchDoneItems={this.switchDoneItems}
          doneItemsDisplay={this.state.showDoneItems}
          onColorPick={this.props.onColorPick}
          onActionsDisplayClick={this.props.onActionsDisplayClick}
          actionsShouldDisplay={this.props.actionsShouldDisplay}
        />
        <AreaViewContent
          isPrimary={listInfo.isPrimary}
          items={this.props.todoItems}
          checkboxClicked={this.toggleItem}
          itemClicked={this.displayDetailView}
          onDragStart={this.handleDragStart}
          onDragEnd={this.props.onDragEnd}
          showDoneItems={this.state.showDoneItems}
        />
        <AddNewItem
          value={this.state.inputValue}
          onValueChange={this.handleInput}
          onAddClicked={this.addNewItem}
          onCancelClicked={this.cancelInput}
        />
      </div>
    )
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.listInfo.name != prevState.inputValue) {
      return {
        inputValue: '',
      }
    }
  }

  /**
   * @deprecated from v16.3 deprecated
   */
  // componentWillReceiveProps(nextProps: Props) {
  //   // 切换列表的时候将输入框中的内容清空
  //   if (nextProps.listInfo.name !== this.props.listInfo.name) {
  //     this.setState({
  //       inputValue: '',
  //     })
  //   }
  // }

  /**
   * 显示/隐藏已完成的todo事项
   */
  private switchDoneItems() {
    this.setState(prev => ({
      showDoneItems: !prev.showDoneItems,
    }))
  }

  /**
   * 往数据中添加拖拽事项所在的列表名称
   * @param data todo事项的原始数据
   */
  private handleDragStart(data: string) {
    const obj = JSON.parse(data)
    // console.log(`obj: ${obj}, type: ${typeof obj}`)
    const newData = JSON.stringify({
      listName: this.props.listInfo.name,
      data,
    })
    this.props.onDragStart(newData)
  }

  /**
   * 更改列表名称
   * @param name 新的列表名称
   */
  private renameList(name: string) {
    this.props.renameList(this.props.listInfo.name, name)
  }

  /**
   * 处理文本框的输入内容
   * @param e input的`value`变动事件
   */
  private handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target)
    const value = e.target.value
    this.setState({
      inputValue: value,
    })
  }

  /**
   * 切换item的完成状态
   * @param e 鼠标点击事件
   * @param name `TodoItem`的名称
   */
  private toggleItem(e: React.MouseEvent<HTMLDivElement>, name: string) {
    e.stopPropagation()
    // 切换完成状态
    this.props.toggleItemInList(name, this.props.listInfo.name)
  }

  /**
   * 添加新的`TodoItem`
   * @param e 鼠标点击事件
   */
  private addNewItem() {
    this.props.addNewItemInList(this.state.inputValue, this.props.listInfo.name)
    this.setState({
      inputValue: '',
    })
  }

  /**
   * 中止文本框输入
   * @param e 鼠标点击事件
   */
  private cancelInput() {
    this.setState({ inputValue: '' })
  }

  /**
   * 在detail view显示选中`TodoItem`的详细内容
   * @param e 鼠标点击事件
   * @param name 选中`TodoItem`的名称
   */
  private displayDetailView(e: React.MouseEvent<HTMLLIElement>, name: string) {
    this.props.itemClicked(name, this.props.listInfo.name)
  }
}
