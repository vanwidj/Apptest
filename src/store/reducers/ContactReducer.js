const initialState = {
    loading: false,
    error: null,
    success: null,
    data: {
        firstName: '',
        lastName: '',
        age: '',
        photo: '',
    },
}

export const ContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CONTACT':
            return { ...state, data: {...state.data, ...action.payload} }
        case 'RESET_CONTACT':
            return { ...state, ...initialState }
        case 'CREATE_CONTACT':
            return { ...state, loading: true }

        case 'CREATE_CONTACT_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true,
            }

        case 'CREATE_CONTACT_FAILED':
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case 'EDIT_CONTACT':
            return { ...state, loading: true }

        case 'EDIT_CONTACT_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true,
            }

        case 'EDIT_CONTACT_FAILED':
            return {
                ...state,
                loading: false,
                error: action.error,
            }

        case 'DELETE_CONTACT':
            return { ...state, loading: true }
    
        case 'DELETE_CONTACT_SUCCESS':
            return {
                ...state,
                initialState,
            }

        case 'DELETE_CONTACT_FAILED':
            return {
                ...state,
                initialState,
                error: action.error,
            }


        default: return state;
    }
}