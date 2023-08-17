import axiosClient from "../axiosClient";

const userApi = {
    getAll(params) {
        const url = `/user`
        return axiosClient.get(url, params)
    }, 
    get(id) {
        const url = `/user/${id}`
        return axiosClient.get(url)
    },
    add(data) {
        const url = `/user`
        return axiosClient.post(url)
    },
    update(data) {
        const url = `/user/${data?.id}`
        return axiosClient.patch(url)
    },
    delete(id) {
        const url = `/user/${id}`
        return axiosClient.delete(url)
    } ,
    import() {
        console.log('Feature will coming soon...')
    }
}

export default userApi