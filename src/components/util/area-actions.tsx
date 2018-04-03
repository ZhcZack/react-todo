import * as React from 'react'
import { ColorThemePicker } from '../areaview/colortheme-picker'
import { mix } from '../../lib'

interface Props {
  /**
   * 是否显示操作区域
   */
  actionsShouldDisplay: boolean
  /**
   * 是否要显示已完成的项目
   */
  doneItemsDisplay: boolean
  onColorPick(color: string): void
  switchDoneItems(): void
  renameClicked(): void
  deleteClicked(): void
}

interface State {
  /**
   * “显示/隐藏已完成”按钮hover状态
   */
  showDoneItemsHover: boolean
  /**
   * “重命名”按钮hover状态
   */
  renameHover: boolean
  /**
   * “删除列表”按钮hover状态
   */
  deleteHover: boolean
}

/**
 * 操作菜单的样式
 */
const actionStyles = {
  position: 'absolute',
  top: 'calc(100% + 5px)',
  right: 10,
  visibility: 'hidden',
  width: 322,
  listStyleType: 'none',
  backgroundColor: 'white',
  border: '1px solid rgba(206, 197, 197, 0.5)',
  padding: 10,
  marginRight: 0,
} as React.CSSProperties
const actionDisplay = {
  visibility: 'visible',
}

/**
 * 操作菜单按钮的样式
 */
const actionButtonStyles = {
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
} as React.CSSProperties
const actionButtonHover = {
  backgroundColor: 'rgba(206, 197, 197, 0.2)',
}

export class AreaActions extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showDoneItemsHover: false,
      renameHover: false,
      deleteHover: false,
    }
  }
  render() {
    const actionShouldDisplay = this.props.actionsShouldDisplay
    let showDoneS = mix(actionButtonStyles)
    let renameS = mix(actionButtonStyles)
    let deleteS = mix(actionButtonStyles, { color: 'red' })
    if (this.state.showDoneItemsHover) {
      showDoneS = mix(showDoneS, actionButtonHover)
    }
    if (this.state.renameHover) {
      renameS = mix(renameS, actionButtonHover)
    }
    if (this.state.deleteHover) {
      deleteS = mix(deleteS, actionButtonHover)
    }
    return (
      <div
        className={actionShouldDisplay ? 'animated fadeIn' : 'animated'}
        style={actionShouldDisplay ? mix(actionStyles, actionDisplay) : actionStyles}>
        <ColorThemePicker onColorPick={this.props.onColorPick} />
        <ul>
          <li
            style={showDoneS}
            onClick={e => {
              e.stopPropagation()
              this.props.switchDoneItems()
            }}
            onMouseEnter={e => {
              e.stopPropagation()
              this.setState({ showDoneItemsHover: true })
            }}
            onMouseLeave={e => {
              e.stopPropagation()
              this.setState({ showDoneItemsHover: false })
            }}>
            {this.props.doneItemsDisplay ? '隐藏' : '显示'}已完成的项目
          </li>
          <li
            style={renameS}
            onClick={e => {
              e.stopPropagation()
              this.props.renameClicked()
            }}
            onMouseEnter={e => {
              e.stopPropagation()
              this.setState({ renameHover: true })
            }}
            onMouseLeave={e => {
              e.stopPropagation()
              this.setState({ renameHover: false })
            }}>
            重命名列表
          </li>
          <li
            style={deleteS}
            onClick={e => {
              e.stopPropagation()
              this.props.deleteClicked()
            }}
            onMouseEnter={e => {
              e.stopPropagation()
              this.setState({ deleteHover: true })
            }}
            onMouseLeave={e => {
              e.stopPropagation()
              this.setState({ deleteHover: false })
            }}>
            删除列表
          </li>
        </ul>
      </div>
    )
  }
}
