/**
 * 整个Todo App区域组件，负责一切功能
 */

import * as React from 'react';
import { ListView } from './components/listview/ListView';
import { AreaView } from './components/areaview/AreaView';
import { DetailView } from './components/detailview/DetailView';
import { DataServer } from './model/data-server';
import { AppTodoList, ListInfo, TodoItem, TodoList } from './model/interface';
import { Alert, AlertType } from './components/util/GlobalAlert';
// import { log } from './lib';

import { useLastModifiedLastName } from './hooks/useLastModifiedListName';
import { useListInfo } from './hooks/useListInfo';

// import * as styles from './App.module.css';

// 样式表
// const styles: { [prop: string]: string } = require('./App.module.css');
import style from './App.module.css';
import { useState } from 'react';
import { AppTodoListFactory } from './model/AppTodoListFactory';
import { AppTodoItemFactory } from './model/AppTodoItemFactory';

/**
 * App主内容区域
 */

const Server = DataServer.getInstance();
let dragData: string | undefined = undefined;
const primaryListname = '我的一天';

export function App() {
    const [lastModifiedListName, { setName: setLastModifiedListName }] = useLastModifiedLastName('');
    const [displayDataErrorAlert, setDisplayDataErrorAlert] = React.useState(false);
    const [displayDeleteListAlert, setDisplayDeleteListAlert] = React.useState(false);
    const [dataErrorMessage, setDataErrorMessage] = React.useState('');
    const [deleteConfirmMessage] = React.useState('是否要删除列表？');

    // const [listInfo, {
    //     addList, updateList, toggleList,
    //     reloadList, renameList: renameListHook, addItemInList,
    //     updateThemeInList, removeItemInList, removeList,
    // }] = useListInfo([]);

    const [todoList, setTodoList] = useState([] as AppTodoList[]);

    const [itemsOfList, setItemsOfList] = React.useState([] as TodoItem[]);
    const [detailItem, setDetailItem] = React.useState(undefined as TodoItem | undefined);

    React.useEffect(() => {
        // initFetch();
    }, []);

    // function initFetch() {
    //     new Promise<ListInfo[]>((resolve, reject) => {
    //         const infos: ListInfo[] = JSON.parse(Server.listInfos);
    //         if (Array.isArray(infos)) {
    //             resolve(infos);
    //         }
    //     })
    //         .then(infos => {
    //             // setListInfos(infos);
    //             updateList(infos);
    //             return new Promise((res: (name: string) => void, rej) => {
    //                 const name = Server.lastModified;
    //                 setLastModifiedListName(name);
    //                 res(name);
    //             });
    //         })
    //         .then(listName => {
    //             return new Promise((res: (items: TodoItem[]) => void, rej: (error: string) => void) => {
    //                 const items = JSON.parse(Server.itemsOfList(listName)) as TodoItem[];
    //                 let message = Server.loadError;
    //                 if (message) {
    //                     rej('local data error');
    //                 }
    //                 if (Array.isArray(items)) {
    //                     res(items);
    //                 } else {
    //                     rej('local data error');
    //                 }
    //                 items.forEach(item => {
    //                     if (
    //                         item.name === undefined ||
    //                         item.done === undefined ||
    //                         item.time === undefined ||
    //                         item.inPrimaryList === undefined ||
    //                         item.source === undefined
    //                     ) {
    //                         rej('local data error');
    //                     }
    //                 });
    //             });
    //         })
    //         .then(
    //             items => {
    //                 setItemsOfList(items);
    //             },
    //             error => {
    //                 // console.log('error')
    //                 new Promise((res: (value: string | undefined) => void, rej) => {
    //                     let message = Server.loadError;
    //                     res(message);
    //                 }).then(message => {
    //                     // console.log('error')
    //                     setDisplayDeleteListAlert(message !== undefined);
    //                     setDataErrorMessage(message ? message : '');
    //                 });
    //             },
    //         );
    // }

    function addNewList(name: string) {
        let list = todoList.slice();
        let index = -1;
        for (let i = 0; i < list.length; i++) {
            if (list[i].name === name) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            return;
        }
        // Server.addNewList(name);
        list.forEach(info => {
            info.active = false;
        });
        list.push(AppTodoListFactory.getInstance().makeTodoList(name, [], true, '#87cefa', false));
        // list.push({
        //     name: name,
        //     todos: [],
        //     active: true,
        //     theme: '#87cefa',
        //     primary: false,
        // });
        setLastModifiedListName(name);
        setTodoList(list);
        // addList(name);
        setItemsOfList([]);
    }

    function handleAddNewList() {
        function getListname(): string {
            const basename = 'No title list ';
            let index = 1;
            let result = true;
            while (result) {
                if (todoList.map(list => list.name).indexOf(basename + index) >= 0) {
                    index += 1;
                    if (index >= 100) {
                        index = Math.floor(Math.random() * 100 + 100);
                        result = false;
                    }
                } else {
                    result = false;
                }
            }
            return basename + index;
        }

        const list = todoList.slice();
        list.forEach(l => l.active = false);
        list.push(AppTodoListFactory.getInstance().makeTodoList(getListname(), [], true, '#aabbcc', false));
        // list.push({
        //     name: getListname(),
        //     todos: [],
        //     active: true,
        //     theme: '#aabbcc',
        //     primary: false,
        // });
        setTodoList(list);
    }

    function switchList(toList: AppTodoList) {
        const list = todoList.slice();
        list.forEach(l => {
            l.active = l.id === toList.id;
        });
        setTodoList(list);
        // Server.lastModified = name;
        // const list = todoList.slice();
        // list.forEach(info => {
        //     info.active = info.name === name;
        // });
        // setTodoList(list);
        // toggleList(name);
        // setLastModifiedListName(name);
        // fetchItems();
    }

    function fetchItems() {
        const promise: Promise<TodoItem[]> = new Promise((res, rej) => {
            const listname = Server.lastModified;
            const items = JSON.parse(Server.itemsOfList(listname));
            if (Array.isArray(items)) {
                res(items);
            }
        });
        promise.then(items => {
            setItemsOfList(items);
        });
    }

    function handleDrop(targetListname: string) {
        if (!dragData) {
            return;
        }
        const data = JSON.parse(dragData);
        const sourceListname = data.listName as string;
        const itemData = JSON.parse(data.data) as TodoItem;

        if (sourceListname === targetListname) {
            return;
        }

        dragData = undefined;

        const todos = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];
        const list = JSON.parse(JSON.stringify(todoList)) as AppTodoList[];

        if (targetListname === primaryListname) {
            copyItemToPrimaryList(itemData, sourceListname);
        } else {
            // 拉进哪个列表，source就是哪个列表，同时primary为false
            // Server.deleteItemInList(itemData.name, sourceListname);
            itemData.source = targetListname;
            itemData.inPrimaryList = false;
            // Server.addNewItemInList(itemData, targetListname);

            let itemIndex = 0;
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].name === itemData.name) {
                    itemIndex = i;
                    break;
                }
            }

            todos.splice(itemIndex, 1);
            // reloadList();
            setTodoList(list);
            setItemsOfList(todos);
            setDetailItem(undefined);
        }
    }

    function copyItemToPrimaryList(itemData: TodoItem, sourceListname: string) {
        // todo的source为来源列表，并且primary标记为true
        const todos = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];

        itemData.source = sourceListname;
        itemData.inPrimaryList = true;
        Server.addNewItemInList(itemData, primaryListname);
        // this.server.markItemPrimary(itemData.name, sourceListName);
        Server.markItemPrimaryStatus(itemData.name, sourceListname, true);
        for (let todo of todos) {
            if (todo.name === itemData.name) {
                todo.inPrimaryList = true;
            }
        }
        if (sourceListname === primaryListname) {
            todos.push({
                name: itemData.name,
                done: itemData.done,
                time: itemData.time,
                inPrimaryList: true,
                comments: itemData.comments,
                source: primaryListname,
            });
        }
        // reloadList();

        // 根据todos的信息来更新detailItem的内容
        for (let todo of todos) {
            if (detailItem && todo.name === detailItem.name) {
                setDetailItem(todo);
            }
        }
        setItemsOfList(todos);
    }

    function itemClicked(itemname: string, listname: string) {
        let todos = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];
        todos = todos.filter(todo => todo.name === itemname);
        setDetailItem(todos[0]);
    }

    function renameList(oldName: string, newName: string) {
        Server.renameList(oldName, newName);

        const list = JSON.parse(JSON.stringify(todoList)) as AppTodoList[];
        for (let info of list) {
            if (info.name === oldName) {
                info.name = newName;
                break;
            }
        }

        const todos = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];
        todos.forEach(todo => {
            todo.source = newName;
        });

        setTodoList(list);
        // renameListHook(oldName, newName);
        setLastModifiedListName(newName);
        setItemsOfList(todos);
    }

    // add item in active list
    function handleAddNewItemInList(name: string) {
        const list = todoList.slice();
        list.forEach(l => {
            if (l.active) {
                const todos = l.todos.slice();
                todos.push(AppTodoItemFactory.getInstance().makeTodoItem(name, false, l.name,
                    l.name === primaryListname, undefined));
                // todos.push({
                //     name,
                //     done: false,
                //     time: new Date().toLocaleDateString().split(' ')[0],
                //     comments: undefined,
                //     source: l.name,
                //     inPrimaryList: l.name === primaryListname,
                // });
                l.todos = todos;
            }
        });
        setTodoList(list);
    }

    function addNewItemInList(itemName: string, listName: string) {
        const items = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === itemName) {
                return;
            }
        }

        // Server.addNewItemInList(itemName, listName);

        const list = JSON.parse(JSON.stringify(todoList)) as AppTodoList[];
        list.forEach(info => {
            if (info.name === listName) {
                // info.count++;
                const items = info.todos.slice();
                items.push(AppTodoItemFactory.getInstance().makeTodoItem(itemName, false, listName,
                    listName === primaryListname, undefined));
                // items.push({
                //     name: itemName,
                //     done: false,
                //     time: new Date().toLocaleDateString().split(' ')[0],
                //     comments: undefined,
                //     source: listName,
                //     inPrimaryList: listName === primaryListname,
                // });
                info.todos = items;
            }
        });
        setTodoList(list);

        // // 额，这样做对吗？
        // items.push({
        //     name: itemName,
        //     done: false,
        //     time: new Date().toLocaleDateString().split(' ')[0],
        //     comments: undefined,
        //     source: listName,
        //     inPrimaryList: listName === primaryListname,
        // });
        //
        // setTodoList(list);
        // // addItemInList(listName);
        // setItemsOfList(items);
    }

    function handleToggleItemInList(item: TodoItem) {
        todoList.filter(list => list.active).forEach(list => {
            list.todos.forEach(todo => {
                if (todo === item) {
                    todo.done = !todo.done;
                }
            });
        });
        const list = todoList.slice();
        setTodoList(list);
        // let itemIndex = -1;
        // todoList.forEach(list => {
        //     if (list.active) {
        //         for (let i = 0; i < list.todos.length; i++) {
        //             if (list.todos[i] === item) {
        //                 itemIndex = i;
        //                 break;
        //             }
        //         }
        //     }
        // });
        // if (itemIndex === -1) {
        //     return;
        // }
        // const list = todoList.slice();
        // list.forEach(list => {
        //     if (list.active) {
        //         let todos = list.todos.slice();
        //         todos[itemIndex].done = !todos[itemIndex].done;
        //     }
        // });
        // setTodoList(list);
    }

    function toggleItemInList(itemName: string, listName: string) {
        /** 是否在primary list中进行的操作 */
        let actionInPrimary = listName === primaryListname;
        /** 是否将todo切换为完成状态 */
        let switchDone = false;
        /** item所在的其他列表名称 */
        let sourceListName = '';
        let item: TodoItem | undefined = undefined;

        const todos = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];
        const list = JSON.parse(JSON.stringify(todoList)) as AppTodoList[];
        for (let todo of todos) {
            if (todo.name === itemName) {
                item = Object.assign({}, todo);
                todo.done = !todo.done;
                sourceListName = todo.source ? todo.source : '';
                break;
            }
        }

        if (!item) {
            // console.log(`item: ${item}`);
            return;
        }

        // 从todos中得知状态为“已完成”的todo的数量
        let count = 0;
        todos.forEach(todo => {
            if (!todo.done) {
                count += 1;
            }
        });
        for (let info of list) {
            if (info.name === listName) {
                switchDone = count < info.todos.length;
                break;
            }
        }

        /**
         * 三种情况：
         * 1：点击的todo在primary list中：
         *  1.1：在primary list中点击
         *  1.2：在其他列表中点击
         * 2:点击的todo在其他列表中
         * 三种情况分别处理
         * （我貌似把这个东西搞得挺麻烦，这才一种特殊情况啊，要是后面多起来了不是要死人的节奏？）
         */
        if (item.inPrimaryList) {
            if (actionInPrimary) {
                Server.toggleItemInList(item.name, primaryListname);
                Server.toggleItemInList(item.name, sourceListName);
                for (let info of list) {
                    if (info.name === primaryListname || info.name === sourceListName) {
                        // info.count += switchDone ? -1 : 1; todo: need fix
                    }
                }
            } else {
                Server.toggleItemInList(item.name, primaryListname);
                Server.toggleItemInList(item.name, listName);
                for (let info of list) {
                    if (info.name === primaryListname || info.name === sourceListName) {
                        // info.count += switchDone ? -1 : 1; todo: need fix
                    }
                }
            }
        } else {
            Server.toggleItemInList(item.name, listName);
            for (let info of list) {
                if (info.name === listName) {
                    // info.count = count; todo: need fix
                }
            }
        }

        setItemsOfList(todos);
        setTodoList(list);
        // updateList(infos);
        // 如果点击的就是要详细显示的TodoItem，则要更新detailItem的状态
        if (detailItem && detailItem.name === itemName) {
            let index = 0;
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].name === itemName) {
                    index = i;
                    break;
                }
            }
            setDetailItem(JSON.parse(JSON.stringify(todos[index])) as TodoItem);
        }
    }

    function handleColorPick(color: string, list: AppTodoList) {
        const lists = todoList.slice();
        lists.forEach(l => {
            if (l.id === list.id) {
                l.theme = color;
            }
        });
        setTodoList(lists);
        // Server.changeColorThemeForList(color, lastModifiedListName);
        // const list = JSON.parse(JSON.stringify(todoList)) as AppTodoList[];
        // list.forEach(info => {
        //     if (info.name === lastModifiedListName) {
        //         info.theme = color;
        //     }
        // });
        // setTodoList(list);
        // updateThemeInList(lastModifiedListName, color);
    }

    function handleDeleteFromDetailView() {
        if (!detailItem) {
            return;
        }

        const itemName = detailItem.name;
        const listName = lastModifiedListName;
        Server.deleteItemInList(itemName, listName);

        const list = JSON.parse(JSON.stringify(todoList)) as AppTodoList[];
        list.forEach(info => {
            if (info.name === listName) {
                // info.count--; // todo: need fix
            }
        });

        const todos = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];
        let itemIndex = 0;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name === itemName) {
                itemIndex = i;
                break;
            }
        }
        todos.splice(itemIndex, 1);

        setDetailItem(undefined);
        setTodoList(list);
        // removeItemInList(listName);
        setItemsOfList(todos);
        // 删除了todo之后，detailItem自然就没有了
    }

    function handleToggleFromDetailView() {
        if (!detailItem) {
            return;
        }
        const itemName = detailItem.name;
        const listName = lastModifiedListName;

        toggleItemInList(itemName, listName);

        const todos = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];
        let index = 0;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name === itemName) {
                index = i;
                break;
            }
        }
        todos[index].done = !todos[index].done;
        setDetailItem(todos[index]);
    }

    function handleCommentsChange(value: string) {
        if (!detailItem) {
            return;
        }
        Server.changeItemCommentsInList(
            value,
            detailItem.name,
            lastModifiedListName,
        );

        const todos = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];
        let index = 0;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name === detailItem.name) {
                index = i;
                break;
            }
        }
        todos[index].comments = value;

        setItemsOfList(todos);
        setDetailItem(detailItem ? JSON.parse(JSON.stringify(todos[index])) as TodoItem : undefined);
    }

    function copyItemToPrimaryListFromDetailView() {
        if (!detailItem) {
            return;
        }
        const item = JSON.parse(JSON.stringify(detailItem)) as TodoItem;
        copyItemToPrimaryList(item, lastModifiedListName);
        // 对detail view的直接更改肯定要更新detailItem的内容
        item.inPrimaryList = true;
        setDetailItem(item);
    }

    function cancelCopyToPrimaryList() {
        if (!detailItem) {
            return;
        }
        const item = JSON.parse(JSON.stringify(detailItem)) as TodoItem;
        const list = JSON.parse(JSON.stringify(todoList)) as AppTodoList[];
        const todos = JSON.parse(JSON.stringify(itemsOfList)) as TodoItem[];

        let currentList = '';
        let _detailItem: TodoItem | undefined = undefined;

        for (let info of list) {
            if (info.name === primaryListname) {
                // info.count -= 1; todo: need fix
            }
            if (info.active) {
                currentList = info.name;
            }
        }

        Server.deleteItemInList(item.name, primaryListname);
        Server.markItemPrimaryStatus(item.name, currentList, false);

        for (let todo of todos) {
            if (todo.name === item.name) {
                todo.inPrimaryList = false;
                _detailItem = todo;
                break;
            }
        }

        // 同样的问题，要区分detail item是来自于primary list还是其他列表，又得分情况处理。
        let itemIndex = -1;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name === item.name) {
                // 如果来自于primary list则需要删掉这个todo
                if (lastModifiedListName === primaryListname) {
                    itemIndex = i;
                }
                todos[i].inPrimaryList = false;
                _detailItem = todos[i];
                break;
            }
        }
        if (itemIndex > -1) {
            todos.splice(itemIndex, 1);
        }

        setTodoList(list);
        // updateList(infos);
        setItemsOfList(todos);
        setDetailItem(_detailItem);
    }

    function deleteList(listname?: string) {
        const name = listname ? listname : lastModifiedListName;
        Server.deleteList(name);

        const infos = todoList.slice();
        let index = 0;
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].name === name) {
                index = i;
                break;
            }
        }
        infos[0].active = true;
        infos.splice(index, 1);

        setTodoList(infos);
        // removeList(name);
        setLastModifiedListName(infos[0].name);
        setDisplayDeleteListAlert(false);
        // 这里要继续使用这个方法，因为之前的todos要被清空换新
        fetchItems();
    }

    const activeList = (function() {
        let result: AppTodoList | undefined = undefined;
        todoList.slice().forEach(info => {
            if (info.active) {
                result = info;
            }
        });
        return result;
    }());

    return (
        <div className={style.app}>
            <ListView
                todoList={todoList}
                addNewList={handleAddNewList}
                switchList={switchList}
                onDrop={handleDrop}
            />
            {activeList && <AreaView
              todoList={activeList}
              shrink={detailItem !== undefined}
              itemClicked={itemClicked}
              renameList={renameList}
              shouldDeleteList={() => setDisplayDeleteListAlert(true)}
              addNewItemInList={handleAddNewItemInList}
              toggleItemInList={handleToggleItemInList}
              onDragStart={(data: string) => dragData = data}
              onDragEnd={() => dragData = undefined}
              onColorPick={handleColorPick}
            />}
            {/*<DetailView*/}
            {/*listName={lastModifiedListName}*/}
            {/*item={detailItem}*/}
            {/*onCloseClicked={() => setDetailItem(undefined)}*/}
            {/*onDeleteClicked={handleDeleteFromDetailView}*/}
            {/*onToggleClicked={handleToggleFromDetailView}*/}
            {/*onCommentsChange={handleCommentsChange}*/}
            {/*onCopyToPrimary={copyItemToPrimaryListFromDetailView}*/}
            {/*onCancelCopyToPrimary={cancelCopyToPrimaryList}*/}
            {/*/>*/}
            {/*{displayDataErrorAlert && (*/}
            {/*<Alert*/}
            {/*display={displayDataErrorAlert}*/}
            {/*message={dataErrorMessage}*/}
            {/*type={AlertType.Alert}*/}
            {/*alertDefaultAction={() => {*/}
            {/*setDisplayDataErrorAlert(false);*/}
            {/*setDisplayDeleteListAlert(false);*/}
            {/*}}*/}
            {/*/>*/}
            {/*)}*/}
            {/*{displayDeleteListAlert && (*/}
            {/*<Alert*/}
            {/*display={displayDeleteListAlert}*/}
            {/*message={deleteConfirmMessage}*/}
            {/*type={AlertType.Confirm}*/}
            {/*alertDefaultAction={() => {*/}
            {/*setDisplayDataErrorAlert(false);*/}
            {/*setDisplayDeleteListAlert(false);*/}
            {/*}}*/}
            {/*alertConfirmAction={deleteList}*/}
            {/*/>*/}
            {/*)}*/}
        </div>
    );
}