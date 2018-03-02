import * as React from 'react'
import { TodoItem } from '../interface'
import { DetailView } from './detailview'

interface AreaViewProps {
    listName: string
}

interface AreaViewState {
    listName: string
    detailItem?: TodoItem
    inputValue: string
}

export class AreaView extends React.Component<AreaViewProps, AreaViewState> {
    constructor(props: AreaViewProps) {
        super(props)
        this.state = {
            listName: this.props.listName,
            detailItem: undefined,
            inputValue: ''
        }
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        this.setState({
            inputValue: value
        })
    }

    render() {
        return (
            <div id="areaview-area">
                <div id="areaview">
                    <div id="areaview-head">
                        <div className="name">{this.state.listName}</div>
                    </div>
                    <div id="areaview-content"></div>
                    <div id="add-new-item">
                        <input type="text" id="input-area" placeholder="添加代办事项" value={this.state.inputValue} onChange={this.handleInput} />
                        <span id="close-button" className={this.state.inputValue.length > 0 ? '' : 'hide'}>X</span>
                        <span id="add-button" className={this.state.inputValue.length > 0 ? '' : 'hide'}>添加</span>
                    </div>
                </div>
                {this.state.detailItem && <DetailView />}
            </div>
        )
    }
}