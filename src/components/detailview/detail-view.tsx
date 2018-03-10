import * as React from 'react'
import { TodoItem } from '../../model/interface'

interface DetailViewProps {
    item?: TodoItem;
    onCloseClicked(e: React.MouseEvent<HTMLSpanElement>): void;
    onDeleteClicked(e: React.MouseEvent<HTMLSpanElement>): void;
    onToggleClicked(e: React.MouseEvent<HTMLSpanElement>): void;
}

export class DetailView extends React.Component<DetailViewProps, {}> {
    constructor(props: DetailViewProps) {
        super(props)
    }

    render() {
        if (!this.props.item) {
            return null
        }
        const checkboxStatus = `custom-checkbox ${this.props.item.done ? 'checked' : ''}`;
        return (
            <div id="detailview" className={this.props.item ? '' : 'hide'}>
                <div className="title-content">
                    <div className={checkboxStatus} onClick={this.props.onToggleClicked}>√</div>
                    <span className="title">{this.props.item.name}</span>
                </div>
                <div className="actions">
                    <span className="disappear" onClick={this.props.onCloseClicked}>&gt;</span>
                    <span className="create-time">创建于{this.props.item.time}</span>
                    <span className="delete" onClick={this.props.onDeleteClicked}>删除</span>
                </div>
            </div>
        );
    }
}