import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async(auth) => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
}

export const signOut = auth => auth.signOut().then(() => console.log('signed out'));