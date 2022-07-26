export const ToTreeObj = (list, rootId) => {
    const arr = []
    list.forEach(item => {
        if (item.pid === rootId) {
            const ChildrenList = ToTreeObj(list, item.id)
            if (ChildrenList.length) item.children = ChildrenList
            arr.push(item)
        }
    })
    return arr
}