import * as React from 'react'

interface HeadProps {
    listName: string
    renameList(name: string): void
}

interface HeadState {
    isEdit: boolean
    name: string
}

class AreaViewHead extends React.Component<HeadProps, HeadState> {
    constructor(props: HeadProps) {
        super(props)
        this.state = {
            isEdit: false,
            name: this.props.listName
        }

        this.editButtonClicked = this.editButtonClicked.bind(this)
        this.cancelClicked = this.cancelClicked.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.renameClicked = this.renameClicked.bind(this)
    }

    private editButtonClicked(e: React.MouseEvent<HTMLSpanElement>) {
        this.setState(prev => ({
            isEdit: !prev.isEdit
        }))
    }

    private inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value
        })
    }

    private cancelClicked(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        this.setState({
            name: this.props.listName,
            isEdit: false
        })
    }

    private renameClicked(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        this.props.renameList(this.state.name)
        this.setState({
            isEdit: false
        })
    }

    render() {
        return (
            <div id="areaview-head">
                {!this.state.isEdit ?
                    <div className="name">{this.props.listName}</div>
                    :
                    <input type='text' value={this.state.name} onChange={this.inputChange} />}
                {!this.state.isEdit && <span className="edit-button" onClick={this.editButtonClicked}>重命名</span>}
                {this.state.isEdit && <span>
                    <span onClick={this.renameClicked}>确认</span><span onClick={this.cancelClicked}>取消</span>
                </span>}
            </div>
        )
    }
}

export {
    AreaViewHead as EditableHead
}