/**
 * 
 * @param {*} list 
 * @param {*} root 
 */
export const toTree = (list, rootId) => {
    const arr = []
    list.forEach(item => {
        if (item.pid === rootId) {
            const childrenList = toTree(list, item.id)
            if (childrenList.length) item.children = childrenList
            arr.push(item)
        }
    })
    return arr
}  