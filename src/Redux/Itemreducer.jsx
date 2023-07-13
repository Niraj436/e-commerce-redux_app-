const initialData = {
    items: []
}

const itemReducer = (state = initialData, action) => {
    switch(action.type){
        case "load_data":
            return {items: action.payload}
        default:
            return state
    }
}

export default itemReducer 