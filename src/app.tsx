import * as React from 'react'
import { ListView } from './components/list-view'
import { AreaView } from './components/areaview'

export class App extends React.Component {
    render() {
        return (
            <div id="app">
                <ListView />
                <AreaView
                    listName={'我的一天'} />
            </div>
        );
    }
}