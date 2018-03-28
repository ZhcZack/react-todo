import * as React from 'react'

interface ColorThemePickerProps {
    onColorPick(color: string): void
}

export class ColorThemePicker extends React.Component<ColorThemePickerProps, {}> {
    private colors = [
        { name: 'purple', value: '#a525a5' },
        { name: 'pink', value: '#FFC0CB' },
        { name: 'green', value: '#34bc34' },
        { name: 'orange', value: '#f29f08' },
        { name: 'skyblue', value: '#87cefa' },
    ]

    render() {
        return (
            <div className="color-picker">
                <p>主题</p>
                <ul>
                    {this.colors.map(color => (
                        <li
                            style={{ backgroundColor: color.value }}
                            onClick={e => this.props.onColorPick(color.value)}
                            key={color.name}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}
