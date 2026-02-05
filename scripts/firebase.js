import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: FIREBASE_API_KEY,
//     authDomain: AUTH_DOMAIN,
//     projectId: PROJECT_ID,
//     storageBucket: STORAGE_BUCKET,
//     messagingSenderId: MESSAGING_SENDER_ID,
//     appId: APP_ID
// };
const firebaseConfig = await fetch('/api/firebase-config').then(r => r.json());

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Checking state of user
const getCurrentState = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;

            if (window.location.pathname != "/index.html") {
                window.location.href = "/index.html"
            }
            // ...
        } else {
            // User is signed out
            window.location.pathname = "/pages/signup.html"
            // ...
        }
    });
}

// Add a new document in collection
const addData = async (collectionName, userId, documentObject) => {
    try {
        await setDoc(doc(db, collectionName, userId), documentObject);
        let timerInterval;
        Swal.fire({
            title: "Signup Success!",
            html: "Creating Account and Redirecting you to Home page in a sec.",
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        })
        setTimeout(() => {
            window.location.pathname = "index.html"
        }, 5000);
    } catch (error) {
        const errorMsg = error

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An Error Occured!"
        });
    }
}

// Get an existing document
const getData = async (collectionName, containerId) => {
    const q = query(collection(db, collectionName));
    let cardsContainer = document.querySelector("#cards-container")

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        cardsContainer.innerHTML += `<div class="card">
            <div class="card-border-top">
            </div>
            <div class="img">
            </div>
            <span>${doc.data().userName}</span>
            <p class="job">Email: ${doc.data().email}</p>
            <p class="job">Password: ${doc.data().pass}</p>
            <div class="card-btns">
                <button> Update </button>
                <button> Delete </button>
            </div>
        </div>`
    });
}

// SignUp
const signupHandler = (userName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // ...

            addData("users", user.uid, {
                userName: userName,
                email: email,
                pass: password
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorCode
            });
        });
}

// Login / SignIn
const loginHandler = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...

            let timerInterval;
            Swal.fire({
                title: "Login Success!",
                html: "Redirecting you to Home page in a sec.",
                icon: "success",
                timer: 5000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            })

            setTimeout(() => {
                window.location.pathname = "index.html"
            }, 5000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorCode
            });
        });
}

export { signupHandler as signup, loginHandler as login, getCurrentState, getData }