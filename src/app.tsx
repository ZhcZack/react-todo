import * as React from 'react'
import { ListView } from './components/listview/list-view'
import { AreaView } from './components/areaview/area-view'
import { DetailView } from './components/detailview/detail-view'
import { DataServer } from './model/data-server'
import { TodoItem, ListInfo } from './model/interface'
import { Alert } from './components/util/global-alert'

interface AppProps {}

interface AppState {
    /**最后处理todo事项的列表名称 */
    lastModifiedListName: string
    /**
     * 列表们的信息
     */
    listInfos: ListInfo[]
    /**
     * 一个列表中的所有todo事项
     */
    itemsOfList: TodoItem[]
    /**detail view中显示/编辑的todo事项 */
    detailItem?: TodoItem
    /**area view的主题颜色 */
    // colorTheme: string
    /**
     * area view操作列表是否要显示
     */
    actionsShouldDisplay: boolean
    /**
     * 提示框是否要显示
     */
    alertShouldDisplay: boolean
    /**
     * 提示框内容
     */
    alertMessage: string
}

/**
 * App主内容区域
 */
export class App extends React.Component<AppProps, AppState> {
    /**列表服务 */
    private server: DataServer
    /**拖拽过程中的数据 */
    private dragData?: string
    private primaryListName = '我的一天'

    constructor(props: AppProps) {
        super(props)
        this.server = new DataServer()

        this.state = {
            lastModifiedListName: '',
            listInfos: [],
            itemsOfList: [],
            detailItem: undefined,
            // colorTheme: this.server.themeForList(this.server.lastModified),
            actionsShouldDisplay: false,
            alertShouldDisplay: false,
            alertMessage: '',
        }

        // bind methods
        this.switchList = this.switchList.bind(this)
        this.itemClicked = this.itemClicked.bind(this)
        this.addNewList = this.addNewList.bind(this)
        this.renameList = this.renameList.bind(this)
        this.deleteList = this.deleteList.bind(this)
        this.addNewItemInList = this.addNewItemInList.bind(this)
        this.toggleItemInList = this.toggleItemInList.bind(this)
        this.handleToggleFromDetailView = this.handleToggleFromDetailView.bind(
            this,
        )
        this.handleCloseFromDetailView = this.handleCloseFromDetailView.bind(
            this,
        )
        this.handleDeleteFromDetailView = this.handleDeleteFromDetailView.bind(
            this,
        )
        this.handleCommentsChange = this.handleCommentsChange.bind(this)
        this.handleDragStart = this.handleDragStart.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
        this.handleDragEnd = this.handleDragEnd.bind(this)
        this.handleColorPick = this.handleColorPick.bind(this)
        this.toggleActionsDisplay = this.toggleActionsDisplay.bind(this)
        this.handleConfirmClicked = this.handleConfirmClicked.bind(this)
    }

    /**
     * 一开始载入界面时从“远端”获取必要数据的函数
     *
     *
     */
    private initFetch() {
        new Promise<ListInfo[]>((resolve, reject) => {
            const infos: ListInfo[] = JSON.parse(this.server.listInfos)
            if (Array.isArray(infos)) {
                resolve(infos)
            }
        })
            .then(infos => {
                this.setState({
                    listInfos: infos,
                })
                // let info = infos.filter(
                //   info => info.name === this.state.lastModifiedListName,
                // )
                // return info[0].name
                return new Promise((res: (name: string) => void, rej) => {
                    const name = this.server.lastModified
                    this.setState({
                        lastModifiedListName: name,
                    })
                    res(name)
                })
            })
            .then(listName => {
                return new Promise(
                    (
                        res: (items: TodoItem[]) => void,
                        rej: (error: string) => void,
                    ) => {
                        const items = JSON.parse(
                            this.server.itemsOfList(listName),
                        ) as TodoItem[]
                        let message = this.server.loadError
                        if (message) {
                            rej('local data error')
                        }
                        if (Array.isArray(items)) {
                            res(items)
                        } else {
                            rej('local data error')
                        }
                        items.forEach(item => {
                            if (
                                item.name === undefined ||
                                item.done === undefined ||
                                item.time === undefined ||
                                item.inPrimaryList === undefined ||
                                item.source === undefined
                            ) {
                                rej('local data error')
                            }
                        })
                    },
                )
            })
            .then(
                items => {
                    this.setState({
                        itemsOfList: items,
                    })
                },
                error => {
                    // console.log('error')
                    new Promise(
                        (res: (value: string | undefined) => void, rej) => {
                            let message = this.server.loadError
                            res(message)
                        },
                    ).then(message => {
                        // console.log('error')
                        this.setState({
                            alertShouldDisplay: message !== undefined,
                            alertMessage: message ? message : '',
                        })
                    })
                },
            )
    }

    /**
     * 从“远端”获取列表们的信息
     */
    private fetchListInfo() {
        let p: Promise<ListInfo[]> = new Promise((res, rej) => {
            const infos: ListInfo[] = JSON.parse(this.server.listInfos)
            if (Array.isArray(infos)) {
                res(infos)
            }
        })
        p.then(infos => {
            // console.log(infos);
            this.setState({
                listInfos: infos,
            })
        })
    }

    /**
     * 从“远端”获取当前列表中todo事项的信息
     */
    private fetchItems() {
        let p: Promise<TodoItem[]> = new Promise((res, rej) => {
            const listName = this.server.lastModified
            const items = JSON.parse(this.server.itemsOfList(listName))
            if (Array.isArray(items)) {
                res(items)
            }
        })
        p.then(items => {
            this.setState({
                itemsOfList: items,
            })
        })
    }

    /**
     * 从“远端”获取加载错误的信息
     */
    private fetchErrorMessage() {
        let p: Promise<string | undefined> = new Promise((res, rej) => {
            let message = this.server.loadError
            res(message)
        })
        p.then(message => {
            this.setState({
                alertShouldDisplay: message !== undefined,
                alertMessage: message ? message : '',
            })
        })
    }

    componentDidMount() {
        // this.fetchItems()
        // this.fetchListInfo()
        this.initFetch()
    }

    /**
     * 弹窗中”确认“按钮的点击处理函数
     * @param e 鼠标事件
     */
    private handleConfirmClicked(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        this.setState(prevState => ({
            alertShouldDisplay: !prevState.alertShouldDisplay,
        }))
    }

    /**
     * 显示/隐藏area view的操作窗口
     */
    private toggleActionsDisplay() {
        this.setState(prevState => ({
            actionsShouldDisplay: !prevState.actionsShouldDisplay,
        }))
    }

    /**
     * 拖拽完成/结束时的处理方法，将一个todo移动到另一个列表中去。
     * @param targetListName todo要被拖拽到的目标列表名称
     */
    private handleDrop(targetListName: string) {
        if (!this.dragData) {
            return
        }
        const data = JSON.parse(this.dragData)
        const sourceListName = data.listName as string
        const itemData = JSON.parse(data.data) as TodoItem

        // 开始和结束的列表不能是同一个，不然拖拽没有意义
        if (sourceListName === targetListName) {
            return
        }

        this.dragData = undefined

        const todos = JSON.parse(
            JSON.stringify(this.state.itemsOfList),
        ) as TodoItem[]
        const infos = JSON.parse(
            JSON.stringify(this.state.listInfos),
        ) as ListInfo[]

        // 从其他列表拉到“我的一天“
        if (targetListName === this.primaryListName) {
            // todo的source为来源列表，并且primary标记为true
            itemData.source = sourceListName
            itemData.inPrimaryList = true
            this.server.addNewItemInList(itemData, targetListName)
            this.server.markItemPrimary(itemData.name, sourceListName)

            for (let todo of todos) {
                if (todo.name === itemData.name) {
                    todo.inPrimaryList = true
                }
            }
            this.fetchListInfo()
            this.setState({
                itemsOfList: todos,
                detailItem: undefined,
            })
        } else {
            // 拉进哪个列表，source就是哪个列表，同时primary为false
            this.server.deleteItemInList(itemData.name, sourceListName)
            itemData.source = targetListName
            itemData.inPrimaryList = false
            this.server.addNewItemInList(itemData, targetListName)

            let itemIndex = 0
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].name === itemData.name) {
                    itemIndex = i
                    break
                }
            }

            todos.splice(itemIndex, 1)
            this.fetchListInfo()
            this.setState({
                listInfos: infos,
                itemsOfList: todos,
                detailItem: undefined,
            })
        }
    }

    /**
     * 重命名列表
     * @param oldName 旧列表名
     * @param newName 新列表名
     */
    private renameList(oldName: string, newName: string) {
        // console.log(`oldName: ${oldName}, newName: ${newName}`)
        this.server.renameList(oldName, newName)

        const infos = JSON.parse(
            JSON.stringify(this.state.listInfos),
        ) as ListInfo[]
        for (let info of infos) {
            if (info.name === oldName) {
                info.name = newName
                break
            }
        }

        const todos = JSON.parse(
            JSON.stringify(this.state.itemsOfList),
        ) as TodoItem[]
        todos.forEach(todo => {
            todo.source = newName
        })

        this.setState({
            listInfos: infos,
            lastModifiedListName: newName,
            itemsOfList: todos,
        })
    }

    /**
     * 删除列表
     * @param name 要删除的列表名
     */
    private deleteList(name: string) {
        this.server.deleteList(name)

        const infos = this.state.listInfos.slice()
        let index = 0
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].name === name) {
                index = i
                break
            }
        }
        infos[0].isActive = true
        infos.splice(index, 1)

        this.setState({
            listInfos: infos,
            lastModifiedListName: infos[0].name,
            actionsShouldDisplay: false,
            // colorTheme: this.server.themeForList(this.server.lastModified),
            // itemsOfList: this.server.itemsOfList(listName),
        })
        // 这里要继续使用这个方法，因为之前的todos要被清空换新
        this.fetchItems()
    }

    /**
     * 切换当前列表
     * @param listName 列表名称
     */
    private switchList(listName: string) {
        // console.log('switchList: name is ' + listName);
        this.server.lastModified = listName

        const infos = this.state.listInfos.slice()
        infos.forEach(info => {
            info.isActive = false
            if (info.name === listName) {
                info.isActive = true
            }
        })

        this.setState({
            listInfos: infos,
            lastModifiedListName: listName,
            // colorTheme: this.server.themeForList(this.server.lastModified),
            actionsShouldDisplay: false,
            // itemsOfList: this.server.itemsOfList(listName),
        })
        // 这里也要使用这个方法，因为切换列表也要清空换新。
        this.fetchItems()
    }

    /**
     * 添加新列表
     * @param listName 列表名称
     */
    private addNewList(listName: string) {
        let infos = this.state.listInfos.slice()
        let index = -1
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].name === listName) {
                index = i
                break
            }
        }
        if (index !== -1) {
            return
        }
        this.server.addNewList(listName)

        infos.forEach(info => {
            info.isActive = false
        })
        infos.push({
            name: listName,
            count: 0,
            isActive: true,
            theme: '#87cefa',
            isPrimary: false,
        })

        this.setState({
            lastModifiedListName: listName,
            listInfos: infos,
            itemsOfList: [],
        })
        // this.fetchItems()
    }

    /**
     * 添加新的TodoItem到指定列表
     * @param itemName 新TodoItem的名称
     * @param listName item所在的列表名称
     */
    private addNewItemInList(itemName: string, listName: string) {
        const items = JSON.parse(
            JSON.stringify(this.state.itemsOfList),
        ) as TodoItem[]
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === itemName) {
                return
            }
        }

        this.server.addNewItemInList(itemName, listName)

        const infos = JSON.parse(
            JSON.stringify(this.state.listInfos),
        ) as ListInfo[]
        infos.forEach(info => {
            if (info.name === listName) {
                info.count++
            }
        })

        // 额，这样做对吗？
        items.push({
            name: itemName,
            done: false,
            time: new Date().toLocaleDateString().split(' ')[0],
            comments: undefined,
            source: listName,
            inPrimaryList: listName === this.primaryListName,
        })

        this.setState({
            // itemsOfList: this.server.itemsOfList(this.state.lastModifiedListName),
            listInfos: infos,
            itemsOfList: items,
        })
        // this.fetchItems()
    }

    /**
     * 切换todo的完成状态
     * @param itemName 要切换完成状态的todo名称
     * @param listName 保存该todo的列表名称
     */
    private toggleItemInList(itemName: string, listName: string) {
        /** 是否在primary list中进行的操作 */
        let actionInPrimary = listName === this.primaryListName
        /** 是否将todo切换为完成状态 */
        let switchDone = false
        /** item所在的其他列表名称 */
        let sourceListName = ''

        this.server.toggleItemInList(itemName, listName)

        const todos = JSON.parse(
            JSON.stringify(this.state.itemsOfList),
        ) as TodoItem[]
        for (let todo of todos) {
            if (todo.name === itemName) {
                todo.done = !todo.done
                sourceListName = todo.source ? todo.source : ''
                break
            }
        }

        const infos = JSON.parse(
            JSON.stringify(this.state.listInfos),
        ) as ListInfo[]

        // 从todos中得知状态为“已完成”的todo的数量
        let count = 0
        todos.forEach(todo => {
            if (!todo.done) {
                count += 1
            }
        })
        for (let info of infos) {
            if (info.name === listName) {
                switchDone = count < info.count
                info.count = count
                break
            }
        }

        // 同时也要更新todo所在的所有列表中的完成状态
        for (let info of infos) {
            if (info.name === sourceListName) {
                this.server.toggleItemInList(itemName, sourceListName)
                info.count += switchDone ? -1 : 1
                break
            }
        }

        this.setState({
            itemsOfList: todos,
            listInfos: infos,
        })
        // 如果点击的就是要详细显示的TodoItem，则要更新detailItem的状态
        if (this.state.detailItem && this.state.detailItem.name === itemName) {
            let index = 0
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].name === itemName) {
                    index = i
                    break
                }
            }
            this.setState({
                detailItem: JSON.parse(
                    JSON.stringify(todos[index]),
                ) as TodoItem,
            })
        }
    }

    /**
     * 处理detail view里的“切换状态”请求
     * @param e 鼠标点击事件
     */
    private handleToggleFromDetailView(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        if (!this.state.detailItem) {
            return
        }
        const itemName = this.state.detailItem.name
        const listName = this.state.lastModifiedListName

        this.toggleItemInList(itemName, listName)

        const todos = JSON.parse(
            JSON.stringify(this.state.itemsOfList),
        ) as TodoItem[]
        let index = 0
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name === itemName) {
                index = i
                break
            }
        }
        todos[index].done = !todos[index].done
        this.setState({
            detailItem: todos[index],
        })
    }

    /**
     * 处理detail view里的“关闭detail view”请求
     * @param e 鼠标点击事件
     */
    private handleCloseFromDetailView(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        this.setState({
            detailItem: undefined,
        })
    }

    /**
     * 处理detail view里的“删除todo事项”请求
     * @param e 鼠标点击事件
     */
    private handleDeleteFromDetailView(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        if (!this.state.detailItem) {
            return
        }

        const itemName = this.state.detailItem.name
        const listName = this.state.lastModifiedListName
        this.server.deleteItemInList(itemName, listName)

        const infos = JSON.parse(
            JSON.stringify(this.state.listInfos),
        ) as ListInfo[]
        infos.forEach(info => {
            if (info.name === listName) {
                info.count--
            }
        })

        const todos = JSON.parse(
            JSON.stringify(this.state.itemsOfList),
        ) as TodoItem[]
        let itemIndex = 0
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name === itemName) {
                itemIndex = i
                break
            }
        }
        todos.splice(itemIndex, 1)

        // 删除了todo之后，detailItem自然就没有了
        this.setState({
            detailItem: undefined,
            // itemsOfList: this.server.itemsOfList(listName),
            listInfos: infos,
            itemsOfList: todos,
        })
        // this.fetchItems()
    }

    /**
     * 更改todo事项的备注
     * @param value todo事项的新备注
     */
    private handleCommentsChange(value: string) {
        if (!this.state.detailItem) {
            return
        }
        this.server.changeItemCommentsInList(
            value,
            this.state.detailItem.name,
            this.state.lastModifiedListName,
        )

        const todos = JSON.parse(
            JSON.stringify(this.state.itemsOfList),
        ) as TodoItem[]
        let index = 0
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name === this.state.detailItem.name) {
                index = i
                break
            }
        }
        todos[index].comments = value

        this.setState(prevState => ({
            detailItem: prevState.detailItem
                ? (JSON.parse(JSON.stringify(todos[index])) as TodoItem)
                : undefined,
            itemsOfList: todos,
        }))
        // this.fetchItems()
    }

    /**
     * 详细显示鼠标点击的todo项目
     * @param itemName 要详细显示的todo名称
     * @param listName 该todo所在的列表名称
     */
    private itemClicked(itemName: string, listName: string) {
        let todos = JSON.parse(
            JSON.stringify(this.state.itemsOfList),
        ) as TodoItem[]
        todos = todos.filter(todo => todo.name === itemName)
        this.setState({
            detailItem: todos[0],
        })
    }

    /**
     * 保存拖拽数据
     * @param data 拖拽的todo事项数据
     */
    private handleDragStart(data: string) {
        this.dragData = data
        // console.log(`dragData: ${data.toString()}, type: ${typeof data}`)
    }

    /**拖拽结束/被取消时清除保存的拖拽数据 */
    private handleDragEnd() {
        this.dragData = undefined
    }

    /**
     * 更改列表的主题色
     * @param color 新的主题色
     */
    private handleColorPick(color: string) {
        this.server.changeColorThemeForList(
            color,
            this.state.lastModifiedListName,
        )
        const infos = JSON.parse(
            JSON.stringify(this.state.listInfos),
        ) as ListInfo[]
        infos.forEach(info => {
            if (info.name === this.state.lastModifiedListName) {
                info.theme = color
            }
        })
        this.setState({
            listInfos: infos,
        })
    }

    render() {
        let listInfo: ListInfo = {} as ListInfo
        this.state.listInfos.slice().forEach(info => {
            if (info.name === this.state.lastModifiedListName) {
                listInfo = info
            }
        })
        // const infos = this.state.listInfos.splice(0)
        // console.log(`infos: ${infos}`)
        return (
            <React.Fragment>
                <ListView
                    // currentListName={this.state.lastModifiedListName}
                    switchList={this.switchList}
                    addNewList={this.addNewList}
                    listInfos={this.state.listInfos}
                    onDrop={this.handleDrop}
                    actionsDisplay={this.state.actionsShouldDisplay}
                    onActionsDisplayClick={this.toggleActionsDisplay}
                />
                <AreaView
                    shrink={this.state.detailItem !== undefined}
                    listInfo={listInfo}
                    todoItems={this.state.itemsOfList}
                    renameList={this.renameList}
                    deleteList={this.deleteList}
                    addNewItemInList={this.addNewItemInList}
                    toggleItemInList={this.toggleItemInList}
                    itemClicked={this.itemClicked}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                    onColorPick={this.handleColorPick}
                    onActionsDisplayClick={this.toggleActionsDisplay}
                    actionsShouldDisplay={this.state.actionsShouldDisplay}
                />
                <DetailView
                    listName={this.state.lastModifiedListName}
                    item={this.state.detailItem}
                    onCloseClicked={this.handleCloseFromDetailView}
                    onDeleteClicked={this.handleDeleteFromDetailView}
                    onToggleClicked={this.handleToggleFromDetailView}
                    onCommentsChange={this.handleCommentsChange}
                />
                {this.state.alertShouldDisplay && (
                    <Alert
                        display={this.state.alertShouldDisplay}
                        message={this.state.alertMessage}
                        onConfirmClicked={this.handleConfirmClicked}
                    />
                )}
            </React.Fragment>
        )
    }
}
