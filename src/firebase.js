import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBnNjdgDXsUDzUg3uvKPKS9NXb_o5NOXY4",
    authDomain: "netflix-clone-2083f.firebaseapp.com",
    projectId: "netflix-clone-2083f",
    storageBucket: "netflix-clone-2083f.firebasestorage.app",
    messagingSenderId: "911705748657",
    appId: "1:911705748657:web:3276160cc39c4ae9d8de90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const user = res.user;

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (err) {
        console.log(err);
        toast.error(err.code.split("/")[1].split("-").join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.log(err);
        toast.error(err.code.split("/")[1].split("-").join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, signup, login, logout };
