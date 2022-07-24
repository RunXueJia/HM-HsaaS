export const imgerror = {
    inserted(el, binding, vnode) {
        el.onerror = () => {
            el.src = binding.value
        }
    },
}