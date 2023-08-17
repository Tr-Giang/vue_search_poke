import axiosClient from "../axiosClient";

const SCHEMA = 'pokemon'

const pokeApi = {
    get(params) {
        const url = `/${SCHEMA}/${params}`;
        return axiosClient.get(url)
    }
}

export default pokeApi