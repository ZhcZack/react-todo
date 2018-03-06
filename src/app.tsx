import * as React from 'react';
import { ListView } from './components/list-view';
import { AreaView } from './components/areaview/area-view';
import { ListServer } from './components/list-server';


interface AppProps {

}

interface AppState {
    /**最后处理todo事项的列表名称 */
    lastModifiedListName: string;
    /**列表们的名称 */
    listNames: string[];
}

/** 
 * App主内容区域
 */
export class App extends React.Component<AppProps, AppState> {
    /**列表服务 */
    private server: ListServer;

    constructor(props: AppProps) {
        super(props);
        this.server = new ListServer();
        this.state = {
            lastModifiedListName: this.server.lastModified,
            listNames: this.server.names
        };

        // bind methods
        this.switchList = this.switchList.bind(this);
        this.addNewList = this.addNewList.bind(this);
        this.renameList = this.renameList.bind(this)
    }

    private renameList(oldName: string, newName: string) {
        this.server.renameList(oldName, newName)
        this.setState({
            listNames: this.server.names,
            lastModifiedListName: newName
        })
    }

    /**
     * 切换当前列表
     * @param listName 列表名称
     */
    private switchList(listName: string) {
        // console.log('switchList: name is ' + listName);
        this.server.lastModified = listName;
        this.setState({
            lastModifiedListName: listName
        });
    }

    /**
     * 添加新列表
     * @param listName 列表名称
     */
    private addNewList(listName: string) {
        let names = this.state.listNames;
        if (names.indexOf(listName) !== -1) { return; }
        this.server.addNewList(listName);
        this.server.lastModified = listName;
        this.setState({
            lastModifiedListName: listName,
            listNames: this.server.names
        });
    }

    render() {
        return (
            <div id="app">
                <ListView
                    currentListName={this.state.lastModifiedListName}
                    switchList={this.switchList}
                    addNewList={this.addNewList}
                    listNames={this.state.listNames} />
                <AreaView
                    listName={this.state.lastModifiedListName}
                    renameList={this.renameList} />
            </div>
        );
    }
}