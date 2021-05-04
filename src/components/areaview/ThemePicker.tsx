/**
 * 列表主题颜色选择器
 *
 * 目前只有五种颜色供选择
 */

import * as React from 'react';

import styles from './ThemePicker.module.css';

interface ThemePickerProps {
    onColorPick(color: string): void;
}

export function ThemePicker(props: ThemePickerProps) {
    const colors = [
        { name: 'purple', value: '#a525a5' },
        { name: 'pink', value: '#FFC0CB' },
        { name: 'green', value: '#34bc34' },
        { name: 'orange', value: '#f29f08' },
        { name: 'skyblue', value: '#87cefa' },
    ];

    return (
        <div className={styles.picker}>
            <p className={styles.text}>主题</p>
            <ul className={styles.pickList}>
                {colors.map(color => (
                    <li
                        className={styles.pickElement}
                        style={{ backgroundColor: color.value }}
                        onClick={e => props.onColorPick(color.value)}
                        key={color.name}
                    />
                ))}
            </ul>
        </div>
    );
}