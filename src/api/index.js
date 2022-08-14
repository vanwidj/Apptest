import axios from "axios";

const BASE_URL = "https://simple-contact-crud.herokuapp.com/contact"

export const apiGetContactLists = async () => {
    
    return await axios.get(BASE_URL, {})
}
export const apiCreateContact = async (params) => {
    const data = JSON.stringify(params)
    console.log('apicreatedata__', data)
    return await axios.post(BASE_URL, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}
export const apiEditContact = async (params) => {
    const URL = BASE_URL + '/' + params.id
    const data = JSON.stringify({
        firstName: params.firstName,
        lastName: params.lastName,
        age: params.age,
        photo: params.photo,
    })
    console.log('apieditdata__', data)
    return await axios.put(URL, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}
export const apiDeleteContact = async (params) => {
    const URL = BASE_URL + '/' + params.id
    console.log('apidelete__', URL)
    return await axios.delete(URL, {
        headers: {
            'Accept': 'application/json',
        }
    })
}
