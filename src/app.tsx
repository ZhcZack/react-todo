import * as React from 'react';
import { ListView } from './components/list-view';
import { AreaView } from './components/area-view';

interface AppProps {

}

interface AppState {
    currentListName: string;
}

/** 
 * App主内容区域
 */
export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            currentListName: '我的一天'
        };

        // bind methods
        this.switchList = this.switchList.bind(this);
    }

    /**
     * 切换当前列表
     * @param listName 列表名称
     */
    switchList(listName: string) {
        // console.log('switchList: name is ' + listName);
        this.setState({
            currentListName: listName
        });
    }

    render() {
        return (
            <div id="app">
                <ListView
                    currentListName={this.state.currentListName}
                    switchList={this.switchList} />
                <AreaView
                    listName={this.state.currentListName} />
            </div>
        );
    }
}