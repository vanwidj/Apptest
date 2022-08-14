import { 
    apiGetContactLists, 
    apiDeleteContact,
    apiCreateContact,
    apiEditContact,
 } from "../../api";
import { put, takeLatest, all, } from "@redux-saga/core/effects";

function* getContactLists() {
    try {
        const res = yield (apiGetContactLists())
        if (res.data.data) {
            const ordered = res.data.data.sort(function(a, b){
                const first = a.firstName.toUpperCase()
                const second = b.firstName.toUpperCase()
                return (first > second) ? 1 : ((first < second) ? -1 : 0)
            })
            yield put({
                type: 'GET_CONTACT_LISTS_SUCCESS',
                data: ordered
            })
        }
    } catch (err) {
        yield put({
            type: 'GET_CONTACT_LISTS_FAILED',
            error: err.message
        })
    }
}

function* createContact({ payload }) {
    try {
        const res = yield (apiCreateContact(payload))
        if (res) {
            yield put({
                type: 'CREATE_CONTACT_SUCCESS'
            })
        }
    } catch (err) {
        yield put({
            type: 'CREATE_CONTACT_FAILED',
            error: err.message
        })
    }
}
function* editContact({ payload }) {
    try {
        const res = yield (apiEditContact(payload))
        if (res) {
            yield put({
                type: 'EDIT_CONTACT_SUCCESS'
            })
        }
    } catch (err) {
        yield put({
            type: 'EDIT_CONTACT_FAILED',
            error: err.message
        })
    }
}

function* deleteContact({ payload }) {
    try {
        const res = yield (apiDeleteContact(payload))
        if (res) {
            yield put({
                type: 'DELETE_CONTACT_SUCCESS'
            })
        }
    } catch (err) {
        yield put({
            type: 'DELETE_CONTACT_FAILED',
            error: err.message
        })
    }
}
 
function* contactSaga() {
    yield takeLatest('GET_CONTACT_LISTS', getContactLists);
    yield takeLatest('CREATE_CONTACT', createContact);
    yield takeLatest('EDIT_CONTACT', editContact);
    yield takeLatest('DELETE_CONTACT', deleteContact);
}

export default function* rootSaga() {
    yield all([
        contactSaga()
    ])
}