import * as React from 'react'
import { ListView } from './components/listview/list-view'
import { AreaView } from './components/areaview/area-view'
import { DetailView } from './components/detailview/detail-view'
import { DataServer } from './model/data-server'
import { TodoItem, ListInfo } from './model/interface'


interface AppProps {

}

interface AppState {
    /**最后处理todo事项的列表名称 */
    lastModifiedListName: string
    /**列表们的名称 */
    listInfos: ListInfo[]
    /**一个列表中的所有todo事项 */
    itemsOfList: TodoItem[]
    /**detail view中显示/编辑的todo事项 */
    detailItem?: TodoItem
}

/** 
 * App主内容区域
 */
export class App extends React.Component<AppProps, AppState> {
    /**列表服务 */
    private server: DataServer

    constructor(props: AppProps) {
        super(props);
        this.server = new DataServer()
        this.state = {
            lastModifiedListName: this.server.lastModified,
            listInfos: this.server.listInfos,
            itemsOfList: this.server.itemsOfList(this.server.lastModified),
            detailItem: undefined
        };

        // bind methods
        this.switchList = this.switchList.bind(this)
        this.itemClicked = this.itemClicked.bind(this)
        this.addNewList = this.addNewList.bind(this)
        this.renameList = this.renameList.bind(this)
        this.deleteList = this.deleteList.bind(this)
        this.addNewItemInList = this.addNewItemInList.bind(this)
        this.toggleItemInList = this.toggleItemInList.bind(this)
        this.handleToggleFromDetailView = this.handleToggleFromDetailView.bind(this)
        this.handleCloseFromDetailView = this.handleCloseFromDetailView.bind(this)
        this.handleDeleteFromDetailView = this.handleDeleteFromDetailView.bind(this)
        this.handleCommentsChange = this.handleCommentsChange.bind(this)
    }

    /**
     * 重命名列表
     * @param oldName 旧列表名
     * @param newName 新列表名
     */
    private renameList(oldName: string, newName: string) {
        console.log(`oldName: ${oldName}, newName: ${newName}`)
        this.server.renameList(oldName, newName)
        this.setState({
            listInfos: this.server.listInfos,
            lastModifiedListName: this.server.lastModified
        })
    }

    /**
     * 删除列表
     * @param name 要删除的列表名
     */
    private deleteList(name: string) {
        this.server.deleteList(name)
        this.setState({
            listInfos: this.server.listInfos,
            lastModifiedListName: this.server.lastModified,
            itemsOfList: this.server.itemsOfList(this.server.lastModified)
        })
    }

    /**
     * 切换当前列表
     * @param listName 列表名称
     */
    private switchList(listName: string) {
        // console.log('switchList: name is ' + listName);
        this.server.lastModified = listName
        this.setState({
            itemsOfList: this.server.itemsOfList(listName),
            lastModifiedListName: listName
        })
    }

    /**
     * 添加新列表
     * @param listName 列表名称
     */
    private addNewList(listName: string) {
        let infos = this.state.listInfos
        let index = -1
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].name === listName) {
                index = i
                break
            }
        }
        if (index !== -1) { return }
        this.server.addNewList(listName)
        this.setState({
            lastModifiedListName: listName,
            listInfos: this.server.listInfos,
            itemsOfList: this.server.itemsOfList(listName)
        })
    }

    /**
     * 添加新的TodoItem到指定列表
     * @param itemName 新TodoItem的名称
     * @param listName item所在的列表名称
     */
    private addNewItemInList(itemName: string, listName: string) {
        this.server.addNewItemInList(itemName, listName)
        this.setState({
            itemsOfList: this.server.itemsOfList(this.state.lastModifiedListName),
            listInfos: this.server.listInfos
        })
    }

    /**
     * 切换todo的完成状态
     * @param itemName 要切换完成状态的todo名称
     * @param listName 该todo所在的列表名
     */
    private toggleItemInList(itemName: string, listName: string) {
        this.server.toggleItemInList(itemName, listName)
        this.setState({
            itemsOfList: this.server.itemsOfList(listName)
        })
        // 如果点击的就是要详细显示的TodoItem，则要更新detailItem的状态
        if (this.state.detailItem && this.state.detailItem.name === itemName) {
            this.setState({
                detailItem: this.server.itemInList(itemName, listName)
            })
        }
    }

    /**
     * 处理detail view里的“切换状态”请求
     * @param e 鼠标点击事件
     */
    private handleToggleFromDetailView(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        if (!this.state.detailItem) { return }
        const itemName = this.state.detailItem.name
        const listName = this.state.lastModifiedListName

        this.toggleItemInList(itemName, listName)
        this.setState({
            detailItem: this.server.itemInList(itemName, listName)
        })
    }

    /**
     * 处理detail view里的“关闭detail view”请求
     * @param e 鼠标点击事件
     */
    private handleCloseFromDetailView(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        this.setState({
            detailItem: undefined
        })
    }

    /**
     * 处理detail view里的“删除todo事项”请求
     * @param e 鼠标点击事件
     */
    private handleDeleteFromDetailView(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        if (!this.state.detailItem) { return }

        const itemName = this.state.detailItem.name
        const listName = this.state.lastModifiedListName
        this.server.deleteItemInList(itemName, listName)
        // 删除了todo之后，detailItem自然就没有了
        this.setState({
            detailItem: undefined,
            itemsOfList: this.server.itemsOfList(listName),
            listInfos: this.server.listInfos
        })
    }

    private handleCommentsChange(value: string) {
        if (!this.state.detailItem) { return }
        this.server.changeItemCommentsInList(value, this.state.detailItem.name, this.state.lastModifiedListName)
        this.setState(prevState => ({
            detailItem: prevState.detailItem ? this.server.itemInList(prevState.detailItem.name, prevState.lastModifiedListName) : undefined,
            itemsOfList: this.server.itemsOfList(prevState.lastModifiedListName)
        }))
    }

    /**
     * 详细显示鼠标点击的todo项目
     * @param itemName 要详细显示的todo名称
     * @param listName 该todo所在的列表名称
     */
    private itemClicked(itemName: string, listName: string) {
        this.setState({
            detailItem: this.server.itemInList(itemName, listName)
        })
    }

    render() {
        return (
            <div id="app">
                <ListView
                    currentListName={this.state.lastModifiedListName}
                    switchList={this.switchList}
                    addNewList={this.addNewList}
                    listInfos={this.state.listInfos} />
                <AreaView
                    shrink={this.state.detailItem !== undefined}
                    listName={this.state.lastModifiedListName}
                    todoItems={this.state.itemsOfList}
                    renameList={this.renameList}
                    deleteList={this.deleteList}
                    addNewItemInList={this.addNewItemInList}
                    toggleItemInList={this.toggleItemInList}
                    itemClicked={this.itemClicked} />
                <DetailView
                    item={this.state.detailItem}
                    onCloseClicked={this.handleCloseFromDetailView}
                    onDeleteClicked={this.handleDeleteFromDetailView}
                    onToggleClicked={this.handleToggleFromDetailView}
                    onCommentsChange={this.handleCommentsChange} />
            </div>
        )
    }
}