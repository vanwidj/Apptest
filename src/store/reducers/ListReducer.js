const initialState = {
    loading: false,
    error: null,
    data: [],
}

export const ListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CONTACT_LISTS':
            return { ...state, data : [], loading: true }

        case 'GET_CONTACT_LISTS_SUCCESS':
            return {
                ...state,
                data: [...state.data, ...action.data],
                error: '',
                loading: false,
            }

        case 'GET_CONTACT_LISTS_FAILED':
            return {
                ...state,
                error: action.error,
                loading: false,
            }

        default: return state;
    }
}