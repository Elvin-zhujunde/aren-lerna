import store from "@/store"
export const useSystemStore = defineStore({
    id: "EventManager",
    state: () => ({}),
    getters: {},
    actions: {
        setXXX(xxx) {
            this.xxx = xxx
        },
    },
})

export function useSystemStoreWithOut() {
    return useSystemStore(store)
}
