import { doc, updateDoc } from 'firebase/firestore';
import { storage } from './index.js';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadProfilePic(file, userId, changePP, db) {
    console.log(file);
    console.log(userId);
    try {
        const fileRef = ref(storage, 'profile pictures/' + userId + '.jpg');
        await uploadBytes(fileRef, file);
        console.log('uploaded!');
        const photoURL = await getDownloadURL(fileRef);
        await updateDoc(doc(db, 'users', userId), { profilePic: photoURL });
        changePP(photoURL);
    }
    catch (e) {
        console.log(e);
    }
}

export const getProfilePic = async (userId, changePP) => {

    const fileRef = ref(storage, 'profile pictures/' + userId + '.jpg');
    try {
        const photoURL = await getDownloadURL(fileRef);
        changePP(photoURL);
    }
    catch (e) {
        console.warn(e);
    }

}