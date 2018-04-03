import * as React from 'react'
import { mix } from '../../lib'

interface Props {
  display: boolean
  message: string
  onConfirmClicked(): void
}

interface State {
  confirmButtonHover: boolean
}

/**
 * 提示框后的全屏背景遮罩层样式
 */
const backgroundStyles: React.CSSProperties = {
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  zIndex: 2,
  visibility: 'hidden',
  backgroundColor: 'rgba(90, 85, 85, 0.37)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
const backgroundDisplay: React.CSSProperties = {
  visibility: 'visible',
}

/**
 * 提示框的样式
 */
const alertStyles: React.CSSProperties = {
  width: '30vw',
  height: '30vh',
  backgroundColor: 'white',
  borderRadius: 8,
  borderColor: 'rgba(206, 197, 197, 0.5)',
  padding: 10,
  display: 'flex',
  flexWrap: 'wrap',
}
/**
 * alert的直接子元素样式
 */
const alertDirectStyles: React.CSSProperties = {
  width: '100%',
}
/**
 * 提示框操作部分的样式
 */
const alertActionStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column-reverse',
  width: '100%',
}
/**
 * “确认”按钮样式
 */
const confirmButtonStyles: React.CSSProperties = {
  height: 30,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: 'backgroud-color 0.3s',
}
const confirmButtonHover: React.CSSProperties = {
  backgroundColor: 'rgba(206, 197, 197, 0.5)',
}

export class Alert extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      confirmButtonHover: false,
    }

    // bind methods
    this.handleConfirmClicked = this.handleConfirmClicked.bind(this)
    this.handleConfirmMouseEnter = this.handleConfirmMouseEnter.bind(this)
    this.handleConfirmMouseLeave = this.handleConfirmMouseLeave.bind(this)
  }

  private handleConfirmClicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    this.props.onConfirmClicked()
  }

  private handleConfirmMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    this.setState({
      confirmButtonHover: true,
    })
  }

  private handleConfirmMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    this.setState({
      confirmButtonHover: false,
    })
  }

  render() {
    let backgroundS = mix(backgroundStyles)
    if (this.props.display) {
      backgroundS = mix(backgroundS, backgroundDisplay)
    }
    let confirmS = this.state.confirmButtonHover
      ? mix(confirmButtonStyles, confirmButtonHover)
      : confirmButtonStyles
    return (
      <div style={backgroundS}>
        <div style={alertStyles}>
          <p style={alertDirectStyles}>{this.props.message}</p>
          <p style={alertActionStyles}>
            <button
              style={confirmS}
              onClick={this.handleConfirmClicked}
              onMouseEnter={this.handleConfirmMouseEnter}
              onMouseLeave={this.handleConfirmMouseLeave}>
              好的
            </button>
          </p>
        </div>
      </div>
    )
  }
}
