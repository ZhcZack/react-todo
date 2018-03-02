import * as React from 'react'
import { TodoItem } from '../interface'

interface DetailViewProps {
    item?: TodoItem
}

export class DetailView extends React.Component<DetailViewProps, {}> {
    constructor(props: DetailViewProps) {
        super(props)
    }

    render() {
        if (!this.props.item) {
            return null
        }
        return (
            <div id="detailview">
                <div className="title-content">
                    <div className="custom-checkbox">√</div>
                    <span className="title">{this.props.item.name}</span>
                </div>
                <div className="actions">
                    <span className="disappear">&lt;</span>
                    <span className="create-time">创建于{this.props.item.time}</span>
                    <span className="delete">删除</span>
                </div>
            </div>
        )
    }
}