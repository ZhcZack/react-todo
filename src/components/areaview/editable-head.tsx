import * as React from 'react'

interface HeadProps {
    /**列表名称 */
    listName: string
    /**重命名列表，处理方法 */
    renameList(name: string): void
    /**删除列表，处理方法 */
    deleteList(name: string): void
    /**
     * 显示/隐藏已完成的todo事项
     */
    switchDoneItems(): void
    /**
     * 是否要显示已完成的todo项目
     */
    doneItemsDisplay: boolean
    /**该列表是否为“基础列表” */
    isPrimaryList: boolean
}

interface HeadState {
    /**是否处于编辑状态 */
    isEdit: boolean
    actionsDisplay: boolean
    /**保存编辑后的名称，通过props的值初始化 */
    name: string
}

class AreaViewHead extends React.Component<HeadProps, HeadState> {
    private actionsList: HTMLUListElement | null
    private renameInput: HTMLInputElement | null

    constructor(props: HeadProps) {
        super(props)
        this.actionsList = null
        this.renameInput = null

        this.state = {
            actionsDisplay: false,
            isEdit: false,
            name: this.props.listName
        }

        this.inputChange = this.inputChange.bind(this)
        this.renameClicked = this.renameClicked.bind(this)
        this.deleteClicked = this.deleteClicked.bind(this)
        this.handleSwitch = this.handleSwitch.bind(this)
        this.inputBlur = this.inputBlur.bind(this)
        this.actionsListBlur = this.actionsListBlur.bind(this)
        this.switchDoneItems = this.switchDoneItems.bind(this)
    }

    componentWillReceiveProps(nextProps: HeadProps) {
        // 传入新的listName之后，保存这个值作为编辑的预留名称
        this.setState({
            name: nextProps.listName,
            isEdit: false,
            actionsDisplay: false
        })
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
     * 进行重命名工作
     * @param e 鼠标点击事件
     */
    private renameClicked(e: React.MouseEvent<HTMLLIElement>) {
        // e.stopPropagation()

        this.setState({
            isEdit: true,
            actionsDisplay: false
        }, () => {
            if (this.renameInput) {
                this.renameInput.focus()
            }
        })
    }

    /**
     * 确认删除列表操作
     * @param e 鼠标点击事件
     */
    private deleteClicked(e: React.MouseEvent<HTMLLIElement>) {
        e.stopPropagation()
        const result = confirm('确定删除此列表吗？')
        if (result) {
            this.props.deleteList(this.state.name)
        }
        this.setState({
            isEdit: false,
            actionsDisplay: false
        })
    }

    /**
     * 显示/隐藏操作列表的视图
     * @param e 鼠标点击事件
     */
    private handleSwitch(e: React.MouseEvent<HTMLButtonElement>) {
        const prevState = this.state.actionsDisplay
        this.setState({
            actionsDisplay: !prevState
        }, () => {
            if (this.actionsList) {
                this.actionsList.focus()
            }
        })
    }

    /**
     * 当焦点从输入框移走时，进行列表的重命名工作
     * @param e 焦点移走事件
     */
    private inputBlur(e: React.FocusEvent<HTMLInputElement>) {
        e.stopPropagation()
        this.props.renameList(this.state.name)
        this.setState({
            isEdit: false,
            actionsDisplay: false
        })
    }

    /**
     * 当焦点从下拉列表中移走时，隐藏吊下拉菜单。
     * 
     * 不过我对浏览器的“焦点”这个东西理解的还不够好，要好好学习一个。
     * @param e 焦点移走事件
     */
    private actionsListBlur(e: React.FocusEvent<HTMLUListElement>) {
        e.stopPropagation()
        this.setState({
            actionsDisplay: false,
            isEdit: false
        })
    }

    private switchDoneItems(e: React.MouseEvent<HTMLLIElement>) {
        e.stopPropagation()
        this.props.switchDoneItems()
        this.setState({
            actionsDisplay: false
        })
    }

    render() {
        if (this.props.isPrimaryList) {
            return (
                <div id="areaview-head">
                    <div className="name">{this.props.listName}</div>
                </div>
            )
        }
        return (
            <div id="areaview-head">
                <div className={this.state.isEdit ? 'hide' : 'name'}>{this.props.listName}</div>
                <input
                    className={this.state.isEdit ? '' : 'hide'}
                    type='text'
                    value={this.state.name}
                    onChange={this.inputChange}
                    ref={input => this.renameInput = input}
                    onBlur={this.inputBlur} />
                <button className='actions-switcher' onClick={this.handleSwitch}>···</button>
                <ul
                    className={this.state.actionsDisplay ? 'actions actions-display' : 'actions'}
                    ref={list => this.actionsList = list}
                    onBlur={this.actionsListBlur} >
                    <li className="action-showDoneItems" onClick={this.switchDoneItems}>{this.props.doneItemsDisplay ? '隐藏' : '显示'}已完成的项目</li>
                    <li className='action-edit' onClick={this.renameClicked}>重命名列表</li>
                    <li className="action-delete" onClick={this.deleteClicked}>删除列表</li>
                </ul>
            </div>
        )
    }
}

export {
    AreaViewHead as EditableHead
}