import * as React from 'react'
import { ListInfo } from '../../model/interface'

interface ListContentProps {
    listInfos: ListInfo[]
    currentListName: string
    onClick(e: React.MouseEvent<HTMLLIElement>, name: string): void
}

interface ListContentState {

}

export class ListContent extends React.Component<ListContentProps, ListContentState> {
    render() {
        return (
            <ul>
                {this.props.listInfos.map(info => <li className={this.props.currentListName === info.name ? 'list-item active' : 'list-item'} key={info.name} onClick={e => this.props.onClick(e, info.name)}>
                    <span className="item-name">{info.name}</span>
                    <span className="number-of-items">{info.count > 0 ? info.count : ''}</span>
                </li>)}
            </ul>
        )
    }
}