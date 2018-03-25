import { TodoItem, TodoList, ListInfo } from './interface'
import { TodoItemClass } from './todo-item'
import { TodoListClass } from './todo-list'

/**数据保存的格式 */
interface Data {
  lists: TodoList[]
  lastModified: string
}

// interface JSONable {
//     toJSON(): string
// }

export class DataServer {
  // private data: Data
  private todoLists: TodoListClass[]
  /**最后操作的列表名称 */
  private listName: string
  /**
   * 初始化数据出错时的错误信息
   */
  private loadDataError: string

  constructor() {
    // this.data = {} as Data
    this.todoLists = []
    this.listName = ''
    this.loadDataError = ''
    this.load()
  }

  get loadError(): string | undefined {
    return this.loadDataError.length > 0
      ? '初始化数据出错，已重新载入。'
      : undefined
  }

  /**要保存到本地中的数据 */
  get data(): { data: Data } {
    return {
      data: {
        lists: this.todoLists,
        lastModified: this.listName,
      },
    }
  }

  /**
   * 返回列表名称的数组集合
   */
  get lists(): string[] {
    let result: string[] = []
    for (let list of this.todoLists) {
      result.push(list.name)
    }
    return result
  }

  isPrimaryList(listName: string): boolean {
    return listName === '我的一天'
  }

  /**
   * 返回列表中所有的todo项目
   * @param listName 列表名称
   */
  itemsOfList(listName: string): string {
    const listIndex = this.listNameIndex(listName)
    if (listIndex < 0) {
      return ''
    }
    const items = this.todoLists[listIndex].items
    return JSON.stringify(items)
  }

  /**
   * 返回所有列表的一些信息
   *
   * 名称（`name`）
   *
   * 未完成todo项目的个数(`count`)
   */
  get listInfos(): string {
    const infos: ListInfo[] = []
    this.todoLists.forEach(list => {
      const info = list.listInfo
      if (info.name === this.lastModified) {
        // console.log(`info name: ${info.name}, list name: ${this.lastModified}`);
        info.isActive = true
      }
      infos.push(info)
    })
    return JSON.stringify(infos)
  }

  /**
   * 返回列表的名称（`name`）以及所有todo项目的个数（`count`）
   */
  get listTotalInfos(): string {
    const infos: ListInfo[] = []
    this.todoLists.forEach(list => {
      const info = list.listInfo
      if (info.name === this.lastModified) {
        info.isActive = true
      }
      infos.push(list.listTotalInfo)
    })
    return JSON.stringify(infos)
  }

  /**
   * 返回列表的主题色
   * @param listName 列表名称
   */
  themeForList(listName: string): string {
    const listIndex = this.listNameIndex(listName)
    if (listIndex < 0) {
      return '#87ceeb'
    }
    const list = this.todoLists[listIndex]
    return list.colorTheme
  }

  /**
   * 给指定列表更改主题色
   * @param color 列表新的主题色
   * @param listName 要更改的列表名称
   */
  changeColorThemeForList(color: string, listName: string) {
    const listIndex = this.listNameIndex(listName)
    if (listIndex < 0) {
      return
    }
    const list = this.todoLists[listIndex]
    list.colorTheme = color
    this.save()
  }

  /**
   * 返回指定列表中的指定todo项目
   * @param itemName 要得到的todo项目名称
   * @param listName 该项目所在的列表名称
   */
  itemInList(itemName: string, listName: string): TodoItem | undefined {
    // console.log(`itemName: ${itemName}`)
    const listIndex = this.listNameIndex(listName)
    if (listIndex < 0) {
      return
    }
    const items = this.todoLists[listIndex].items
    for (let i = 0; i < items.length; i++) {
      if (items[i].name === itemName) {
        // console.log(`copy: ${items[i].copy}`)
        return items[i].copy
      }
    }
    return undefined
  }

  /**
   * 最后进行操作的列表名称
   */
  get lastModified(): string {
    const name = this.listName
    return name === '' ? '我的一天' : name
  }

  set lastModified(name: string) {
    this.listName = name
    this.save()
  }

  /**
   * 添加新列表
   * @param name 新列表名称
   */
  addNewList(name: string) {
    const listIndex = this.listNameIndex(name)
    if (listIndex !== -1) {
      return
    }
    const list = new TodoListClass(name)
    this.todoLists.push(list)
    this.listName = name
    this.save()
  }

  /**
   * 重命名列表
   * @param oldName 旧列表名称
   * @param newName 新列表名称
   */
  renameList(oldName: string, newName: string) {
    if (oldName === newName) {
      return
    }
    const index = this.listNameIndex(oldName)
    if (index === -1) {
      return
    }
    this.todoLists[index].rename(newName)
    this.listName = newName
    this.save()
  }

  /**
   * 删除列表
   * @param name 要删除的列表名称
   */
  deleteList(name: string) {
    if (this.todoLists.length < 2) {
      return
    }
    const index = this.listNameIndex(name)
    if (index === -1) {
      return
    }
    this.todoLists.splice(index, 1)
    this.listName = this.todoLists[0].name
    this.save()
  }

  /**
   * 在指定列表中删除指定todo项目
   * @param itemName 要删除的todo名称
   * @param listName 该todo所在的列表名称
   */
  deleteItemInList(itemName: string, listName: string) {
    const listIndex = this.listNameIndex(listName)
    if (listIndex < 0) {
      return
    }
    const list = this.todoLists[listIndex]

    if (!list.containsItem(itemName)) {
      return
    }
    list.removeItem(itemName)
    this.save()
  }

  /**
   * 在指定列表中添加新todo项目
   * @param itemName 要添加的todo项目的名称
   * @param listName 该项目要被加入的列表名称
   */
  addNewItemInList(item: TodoItem | string, listName: string): void {
    const listIndex = this.listNameIndex(listName)
    if (listIndex < 0) {
      return
    }

    const list = this.todoLists[listIndex]
    list.addNewItem(item)
    this.save()
  }

  /**
   * 切换指定列表中指定项目的完成状态
   * @param itemName 要切换完成状态的todo项目的名称
   * @param listName 该项目所在的列表名称
   */
  toggleItemInList(itemName: string, listName: string) {
    const listIndex = this.listNameIndex(listName)
    if (listIndex < 0) {
      return
    }
    const items = this.todoLists[listIndex].items
    for (let item of items) {
      if (item.name === itemName) {
        item.toggle()
      }
    }
    this.save()
  }

  /**
   * 更改指定列表中指定todo事项的备注信息
   * @param newComments 新的备注
   * @param itemName 要更改备注的todo事项
   * @param listName 该todo事项所在的列表名称
   */
  changeItemCommentsInList(
    newComments: string,
    itemName: string,
    listName: string,
  ) {
    const listIndex = this.listNameIndex(listName)
    if (listIndex < 0) {
      return
    }
    const list = this.todoLists[listIndex]
    if (!list.containsItem(itemName)) {
      return
    }
    const items = list.items
    for (let item of items) {
      if (item.name === itemName) {
        item.changeComments(newComments)
      }
    }
    this.save()
  }

  /**
   * 列表所在列表数组的索引值，用于判断是否存在该列表
   * @param name 列表名称
   */
  private listNameIndex(name: string): number {
    let index = -1
    for (let i = 0; i < this.todoLists.length; i++) {
      if (this.todoLists[i].name === name) {
        index = i
        break
      }
    }
    return index
  }

  /**从本地加载数据，没有则初始化数据 */
  private load() {
    const result = localStorage.getItem('react-todo-app')
    if (result === null) {
      this.initLocalData()
    } else {
      try {
        this.dataFromLocal()
      } catch (e) {
        this.loadDataError = 'load data error'
        this.initLocalData()
      }
    }
  }

  /**手动初始化本地数据 */
  private initLocalData() {
    const lists = [new TodoListClass('我的一天')]
    this.todoLists = lists
    this.lastModified = '我的一天'
    this.save()
  }

  /**从本地加载数据，如果本地格式不对就抛出异常等待处理 */
  private dataFromLocal() {
    const result = localStorage.getItem('react-todo-app')
    if (!result) {
      return
    }
    const data = JSON.parse(result)
    if (!data.data) {
      console.log('not have data')
      throw Error('local data error')
    }
    const dataFromLocal = data.data
    if (!dataFromLocal.lists) {
      console.log('not have lists')
      throw Error('local data error')
    }
    const listsFromLocal = dataFromLocal.lists
    // 从本地获取数据并解析成对应的class
    for (let i = 0; i < listsFromLocal.length; i++) {
      if (!listsFromLocal[i].name) {
        console.log('not have list name')
        throw Error('local data error')
      }
      const newList = new TodoListClass(listsFromLocal[i].name)
      const localItems = listsFromLocal[i].items
      for (let j = 0; j < localItems.length; j++) {
        if (
          !localItems[j].name ||
          localItems[j].done === undefined ||
          !localItems[j].time
        ) {
          console.log('item format error')
          throw Error('local data error')
        }
        const newItem = new TodoItemClass(
          localItems[j].name,
          localItems[j].done,
          localItems[j].time,
          localItems[j].comments,
        )
        newList.addNewItem(newItem)
      }
      if (listsFromLocal[i].theme) {
        newList.colorTheme = listsFromLocal[i].theme
      }
      this.todoLists.push(newList)
    }
    this.listName = dataFromLocal.lastModified
  }

  /**
   * 将data中的数据保存到本地
   */
  private save() {
    localStorage.setItem('react-todo-app', JSON.stringify(this.data))
  }
}

// 更新：下面本来存在的代码已经被拆到其他文件里去，server保留server的代码就好。

// 写下面这些的目的是将对数据的操作用一层对象“包起来”，不是通过直接的指令而是通过对象的方法进行操作
// 这样做的好处应该是后面增添改动起来方便些，毕竟不用处理细节上的东西
