import firebase from '../../Firebase';

export function getBlogs(){
    return(dispatch) => {

        dispatch({
            type:"BLOGS_LOADING_STATUS",
            payload:true
        })

        firebase.database().ref('/Chat').on('value', snapshot => {
                    dispatch({
                        type:"BLOGS_FETCH",
                        payload:snapshot.val()
                    })

                    dispatch({
                        type:"BLOGS_LOADING_STATUS",
                        payload:false
                    })
              
        })    
                               
    }
}

export function postBlogs(uri, name, content, dt){
    return (dispatch) => {
        firebase.database().ref('/Chat').push({uri, name, content, dt})
    }
}


export function deleteBlog(key){
    return (dispatch) => {
        firebase.database().ref(`/Chat/${key}`).remove()
    }
}

export function editBlog(title, content,key){
    return (dispatch) => {
        firebase.database().ref(`/Chat`).child(key).update({title, content})
    }
}