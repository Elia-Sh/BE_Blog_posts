import { CREATE_POST } from '../actions/index';
import { ActionType } from 'redux-promise-middleware';

const CREATE_POST_PENDING = `CREATE_POST_${ActionType.Pending}`;
const CREATE_POST_FULFILLED = `CREATE_POST_${ActionType.Fulfilled}`;
const CREATE_POST_REJECTED = `CREATE_POST_${ActionType.Rejected}`;

const INITIAL_STATE = { result: null, data: []};

export default function (state = INITIAL_STATE, action) {
    // debugger
    switch (action.type) {
        case CREATE_POST_FULFILLED:
            return { 
                ...state, 
                result: ActionType.Fulfilled,
                data: action.payload
            };
        case CREATE_POST_PENDING:
                console.log('some error from server')
                return { 
                    ...state,
                    result: ActionType.Pending,
                    data: []
                };
        case CREATE_POST_REJECTED:
            return { ...state,
                // Very secret app, still not indicating user what exactly when wrong
                result: ActionType.Rejected,
                data: [] };
        default:
            return state;
    }
}