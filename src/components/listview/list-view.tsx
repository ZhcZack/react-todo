import * as React from 'react'
import { ListContent } from './list-content'
import { ListInfo } from '../../model/interface'
import AddListButton from './addListButton'

interface ListViewProps {
  /**当前进行处理的列表名称 */
  // currentListName: string
  /**所有列表名称 */
  listInfos: ListInfo[]
  /**添加新列表 */
  addNewList(name: string): void
  /**切换area view显示的列表 */
  switchList(listName: string): void
  onDrop(targetListName: string): void
  actionsDisplay: boolean
  onActionsDisplayClick(): void
}

interface ListViewState {}

/**
 * “新建清单”按钮的样式
 */
const AddButtonStyles = {
  height: 40,
  padding: '0 10px',
  cursor: 'pointer',
  color: 'blue',
}

const viewStyles = {
  width: 280,
  position: 'relative',
  overflow: 'hidden',
  borderRight: '1px solid rgba(206, 197, 197, 0.5)',
} as React.CSSProperties

/**
 * 列表目录
 */
export class ListView extends React.Component<ListViewProps, ListViewState> {
  /**用于命名新列表的计数器 */
  private count: number

  constructor(props: ListViewProps) {
    super(props)
    this.count = -1

    // bind methods
    this.addNewList = this.addNewList.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * 用户点击处理函数
   * @param e `click`事件
   */
  private handleClick(e: React.MouseEvent<HTMLLIElement>, name: string) {
    e.stopPropagation()
    // console.log('handleClick: name is ' + name);
    this.props.switchList(name)
  }

  /**
   * 添加新列表
   */
  private addNewList() {
    let result = true
    let name = ''
    while (result) {
      name = this.getListName()
      result = this.props.listInfos.some(list => {
        return list.name == name
      })
    }
    this.props.addNewList(name)
  }

  /**
   * 返回添加的新列表的名称
   */
  private getListName(): string {
    this.count++
    return `无命名清单${this.count > 0 ? this.count : ''}`
  }

  render() {
    return (
      <div
        style={viewStyles}
        onClick={e => {
          e.stopPropagation()
          this.props.actionsDisplay && this.props.onActionsDisplayClick()
        }}>
        <ListContent
          // currentListName={this.props.currentListName}
          listInfos={this.props.listInfos}
          onClick={this.handleClick}
          onDrop={this.props.onDrop}
        />
        <AddListButton onClick={this.addNewList} />
      </div>
    )
  }
}
