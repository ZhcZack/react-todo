import * as React from 'react'

interface HeadProps {
    /**列表名称 */
    listName: string
    /**重命名列表，处理方法 */
    renameList(name: string): void
    /**删除列表，处理方法 */
    deleteList(name: string): void
}

interface HeadState {
    /**是否处于编辑状态 */
    isEdit: boolean
    /**保存编辑后的名称，通过props的值初始化 */
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
        this.deleteClicked = this.deleteClicked.bind(this)
    }

    componentWillReceiveProps(nextProps: HeadProps) {
        // 传入新的listName之后，保存这个值作为编辑的预留名称
        this.setState({
            name: nextProps.listName
        })
    }

    /**
     * 开启重命名编辑状态
     * @param e 鼠标点击事件
     */
    private editButtonClicked(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState(prev => ({
            isEdit: !prev.isEdit
        }))
    }

    /**
     * 保存输入的内容，作为新的列表名
     * @param e 输入内容改变事件
     */
    private inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value
        })
    }

    /**
     * 取消重命名操作
     * @param e 鼠标点击事件
     */
    private cancelClicked(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        this.setState({
            name: this.props.listName,
            isEdit: false
        })
    }

    /**
     * 进行重命名工作，同时关闭编辑状态。
     * @param e 鼠标点击事件
     */
    private renameClicked(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        if (this.state.name !== '') {
            this.props.renameList(this.state.name)
        }
        this.setState({
            isEdit: false
        })
    }

    /**
     * 确认删除列表操作
     * @param e 鼠标点击事件
     */
    private deleteClicked(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        const result = confirm('确定删除此列表吗？')
        if (result) {
            this.props.deleteList(this.state.name)
        }
    }

    render() {
        if (this.props.listName === '我的一天') {
            return (
                <div id="areaview-head">
                    <div className="name">{this.props.listName}</div>
                </div>
            )
        }
        return (
            <div id="areaview-head">
                {!this.state.isEdit ?
                    <div className="name">{this.props.listName}</div>
                    :
                    <input type='text' value={this.state.name} onChange={this.inputChange} />}
                {!this.state.isEdit && <button className="edit-button" onClick={this.editButtonClicked}>重命名</button>}
                {!this.state.isEdit && <button className='delete-button' onClick={this.deleteClicked}>删除</button>}
                {this.state.isEdit && <span>
                    <button onClick={this.renameClicked}>确认</button><button onClick={this.cancelClicked}>取消</button>
                </span>}
            </div>
        )
    }
}

export {
    AreaViewHead as EditableHead
}