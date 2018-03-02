import * as React from 'react'
import { ListServer } from './list-server'

interface ListViewProps {
    // listNames: string[]
}

interface ListViewState {
    listNames: string[]
}


export class ListView extends React.Component<ListViewProps, ListViewState> {
    private server: ListServer
    private count: number

    constructor(props: ListViewProps) {
        super(props)
        this.server = new ListServer()
        this.count = -1
        this.state = {
            listNames: []
        }
    }

    componentWillMount() {
        const names = this.server.names
        this.setState({ listNames: names })
    }

    private addNewList() {
        let names = this.server.names
        let name = `无命名清单${this.count > 0 ? this.count : ''}`
        while (true) {
            if (names.indexOf(name) === -1) {
                names.push(name)
                this.server.addNewList(name)
                this.setState({ listNames: names })
                break
            }
            this.count++
        }
    }

    render() {
        return (
            <div id="listview">
                <ul>
                    {this.state.listNames.map(name => <li className="list-item" key={name}>
                        <span className="item-name">{name}</span>
                        <span className="number-of-items"></span>
                    </li>)}
                </ul>
                <div id="add-new-list" onClick={this.addNewList}>新建清单</div>
            </div>
        )
    }
}