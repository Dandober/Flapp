import Firebase from '../Firebase';

const SecondRoute = () => (
    
    firebase.database().ref('esportsWebhouse/001/posts').on('value', (snapshot) => {
        let state = this.state;
        state.lista = [];

        snapshot.forEach((childItem) => {

            state.lista.push({

                key: childItem.key,

                title: childItem.val().title,
                main_image: childItem.val().thread.main_image,
                author: childItem.val().author,
                text: childItem.val().text,
                content: childItem.val().content,
                url: childItem.val().url,
                published: childItem.val().published,

            });
        });

        this.setState(state);
        this.setState({ loading: false })
    })

);

export default SecondRoute