export const getContactListsReq = (params) => ({
    type: 'GET_CONTACT_LISTS',
})

export const setContactReq = (params) => ({
    type: 'SET_CONTACT',
    payload: {
        id: params.id,
        firstName: params.firstName,
        lastName: params.lastName,
        age: params.age,
        photo: params.photo,
    }
})
export const resetContactReq = () => ({
    type: 'RESET_CONTACT',
})

export const addContactDetailReq = (params) => ({
    type: 'CREATE_CONTACT',
    payload: {
        firstName: params.firstName,
        lastName: params.lastName,
        age: parseInt(params.age),
        photo: params.photo,
    }
})

export const editContactDetailReq = (params) => ({
    type: 'EDIT_CONTACT',
    payload: {
        id: params.id,
        firstName: params.firstName,
        lastName: params.lastName,
        age: params.age,
        photo: params.photo,
    }
})

export const deleteContactDetailReq = (params) => ({
    type: 'DELETE_CONTACT',
    payload: {
        id: params.id,
    }
})