import * as React from 'react'
import { mix, log } from '../../lib'

interface AddListButtonProps {
  onClick(): void
}

interface AddListButtonState {
  hover: boolean
}

const styles = {
  height: 40,
  padding: '0 10px',
  cursor: 'pointer',
  color: 'blue',
}

const hoverStyles = {
  backgroundColor: 'rgba(206, 197, 197, 0.5)',
}

const spanStyles = {
  fontSize: '1.5em',
  marginRight: 10,
}

export default class AddListButton extends React.Component<AddListButtonProps, AddListButtonState> {
  constructor(props: AddListButtonProps) {
    super(props)
    this.state = {
      hover: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.buttonMouseEnter = this.buttonMouseEnter.bind(this)
    this.buttonMouseLeave = this.buttonMouseLeave.bind(this)
  }

  private handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    this.props.onClick()
  }

  private buttonMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    this.setState({
      hover: true,
    })
  }

  private buttonMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    this.setState({
      hover: false,
    })
  }
  render() {
    const s = this.state.hover ? mix(styles, hoverStyles) : styles
    // log(s)
    return (
      <div
        style={s}
        onClick={this.props.onClick}
        onMouseEnter={this.buttonMouseEnter}
        onMouseLeave={this.buttonMouseLeave}>
        <span style={spanStyles}>+</span>新建清单
      </div>
    )
  }
}
