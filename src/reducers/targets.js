let id = 1;
const VALUE = 6;

const defaultTargetsState = {
    list: []
};


function target(state, action) {
    switch (action.type) {
        case 'DECREMENT_TARGET_VALUE':
        return {
            ...state,
            value: state.value - 1
        };

    }
}

function targets(state = defaultTargetsState, action) {
    switch (action.type) {
        case 'INIT_TARGET':
            return defaultTargetsState;
        case 'ADD_TARGET':
            let element = {
                value: VALUE,
                id: ++id,
                x: Math.floor(Math.random() * 100),
                y: Math.floor(Math.random() * 100) 
            }
            return {
                list: state.list.concat([element])
            }
        case 'DECREMENT_TARGET_VALUE':
            return {
                list: state.list.map(t => target(t, action))
            }
        case 'DELETE_TARGET':
            return {
                list: state.list.filter(t => t.id !== action.id)
            }
        default:
            return state;
    }
}


export default targets;