import * as React from 'react'

interface AddNewItemPros {
    /**input的值，确保输入的内容与props的值保持一致 */
    value: string
    /**输入改变的事件处理函数 */
    onValueChange(e: React.ChangeEvent<HTMLInputElement>): void
    /**点击“添加”之后，添加新todo事项的处理函数 */
    onAddClicked(e: React.MouseEvent<HTMLSpanElement>): void
    /**取消输入的处理函数 */
    onCancelClicked(e: React.MouseEvent<HTMLSpanElement>): void
}

interface AddNewItemState {}

export class AddNewItem extends React.Component<AddNewItemPros, AddNewItemState> {
    render() {
        const emptyValue = this.props.value === ''
        return (
            <div id="add-new-item">
                <span className={emptyValue ? 'symbol' : 'custom-checkbox'}>
                    {emptyValue ? '+' : ''}
                </span>
                <input
                    type="text"
                    id="input-area"
                    placeholder="添加代办事项"
                    value={this.props.value}
                    onChange={this.props.onValueChange}
                />
                <span
                    id="close-button"
                    className={emptyValue ? 'hide' : ''}
                    onClick={this.props.onCancelClicked}>
                    X
                </span>
                <span
                    id="add-button"
                    className={emptyValue ? 'hide' : ''}
                    onClick={this.props.onAddClicked}>
                    添加
                </span>
            </div>
        )
    }
}
