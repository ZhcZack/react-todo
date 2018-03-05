import * as React from 'react';

interface AddNewItemPros {
    value: string;
    onValueChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onAddClicked(e: React.MouseEvent<HTMLSpanElement>): void;
    onCancelClicked(e: React.MouseEvent<HTMLSpanElement>): void;
}

export class AddNewItem extends React.Component<AddNewItemPros, {}> {
    render() {
        return (
            <div id="add-new-item">
                <input type="text" id="input-area" placeholder="添加代办事项" value={this.props.value} onChange={this.props.onValueChange} />
                <span id="close-button" className={this.props.value.length > 0 ? '' : 'hide'} onClick={this.props.onCancelClicked}>X</span>
                <span id="add-button" className={this.props.value.length > 0 ? '' : 'hide'} onClick={this.props.onAddClicked}>添加</span>
            </div>
        );
    }
}