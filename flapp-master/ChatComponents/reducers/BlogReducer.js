export default function (state={}, action){
    switch(action.type){
        case "BLOGS_FETCH":
           // console.log(action.payload)
            return {
                ...state, 
                blogsList:action.payload
            }

        default:
            return state
    }
}