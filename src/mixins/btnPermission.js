
import store from "@/store"
export default {

    methods: {
        BtnPermission(val) {
            if (!store.getters.token) return false
            return store.getters.points.includes(val)
        }
    }
}