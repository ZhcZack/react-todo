import { ListInfo } from '../model/interface';
import { useState } from 'react';
import { DataServer } from '../model/data-server';

interface UseListInfoCallbacks {
    addList(name: string): void;

    toggleList(name: string): void;

    reloadList(): void;

    updateList(list: ListInfo[]): void;

    removeList(name: string): void;

    renameList(oldName: string, newName: string): void;

    addItemInList(name: string): void;

    removeItemInList(name: string): void;

    updateCountInList(name: string, count: number): void;

    updateThemeInList(name: string, theme: string): void;
}

export function useListInfo(initialValue: ListInfo[]): [ListInfo[], UseListInfoCallbacks] {
    const [value, setValue] = useState(initialValue);

    const addList = (name: string) => {
        const info: ListInfo = {
            name,
            count: 0,
            isActive: true,
            theme: '#87cefa',
            isPrimary: false,
        };
        const list = value.slice();
        list.push(info);
        setValue(list);
    };

    const toggleList = (name: string) => {
        const list = value.slice();
        list.forEach(info => {
            info.isActive = info.name === name;
        });
        setValue(list);
    };

    const reloadList = () => {
        const promise: Promise<ListInfo[]> = new Promise<ListInfo[]>(res => {
            const info: ListInfo[] = JSON.parse(DataServer.getInstance().listInfos);
            if (Array.isArray(info)) {
                res(info);
            } else {
                res([]);
            }
        });
        promise.then(infos => {
            setValue(infos);
        });
    };

    const updateList = (list: ListInfo[]) => {
        setValue(list);
    };

    const removeList = (name: string) => {
        const list = value.slice();
        let index = -1;
        for (let i = 0; i < list.length; i++) {
            if (list[i].name === name) {
                index = i;
                break;
            }
        }
        if (index < 0) {
            return;
        }
        list[0].isActive = true;
        list.splice(index, 1);
        setValue(list);
    };

    const renameList = (oldName: string, newName: string) => {
        const list = value.slice();
        list.forEach(info => {
            if (info.name === oldName) {
                info.name = newName;
            }
        });
        setValue(list);
        // todo: update items in list
    };

    const addItemInList = (name: string) => {
        const list = value.slice();
        list.forEach(info => {
            if (info.name === name) {
                info.count += 1;
            }
        });
        setValue(list);
    };

    const removeItemInList = (name: string) => {
        const list = value.slice();
        list.forEach(info => {
            if (info.name === name) {
                const count = info.count - 1;
                info.count = count < 0 ? 0 : count;
            }
        });
        setValue(list);
    };

    const updateCountInList = (name: string, count: number) => {
        const list = value.slice();
        list.forEach(info => {
            if (info.name === name) {
                info.count = count;
            }
        });
        setValue(list);
    };

    const updateThemeInList = (name: string, theme: string) => {
        const list = value.slice();
        list.forEach(info => {
            if (info.name === name) {
                info.theme = theme;
            }
        });
        setValue(list);
    };

    return [value, {
        addList, toggleList, reloadList, updateList,
        removeList, renameList, addItemInList,
        removeItemInList, updateCountInList, updateThemeInList,
    }];
}