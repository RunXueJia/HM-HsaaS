// import Vue from "vue";
// Vue.directive('imgerror', {
//     inserted(el, binding) {
//         el.onerror = () => {
//             console.log(binding);
//             el.src = binding.value
//         }
//     }
// })
export const imgerror = {
    inserted(el, binding) {
        el.onerror = () => {
            // console.log(binding);
            el.src = binding.value
        }
    }
} 