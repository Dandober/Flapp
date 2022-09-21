import firebase from 'firebase'
//Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyAyQOcyk4o4o2PJVW-glmyW9gqahmG0hyw",
  authDomain: "flapp-appdomengao.firebaseapp.com",
  databaseURL: "https://flapp-appdomengao.firebaseio.com",
  projectId: "flapp-appdomengao",
  storageBucket: "flapp-appdomengao.appspot.com",
  messagingSenderId: "124306057673",
  appId: "1:124306057673:web:7a0e21fe9154084f472018",
  measurementId: "G-F5BPLSCGV3"
};

 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase