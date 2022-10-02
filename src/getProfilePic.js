import { doc, updateDoc } from 'firebase/firestore';
import { storage } from './index.js';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadDefault(userId, changePP, db) {
    try {
        const response = await fetch('https://cdn-icons-png.flaticon.com/512/847/847969.png');
        const blob = await response.blob();
        const file = new File([blob], userId + '.jpg', { type: blob.type });
        const fileRef = ref(storage, 'profile pictures/' + userId + '.jpg');
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        await updateDoc(doc(db, 'users', userId), { profilePic: photoURL });
        changePP(photoURL);
    }
    catch (e) {
        console.warn(e);
    }
}

export async function uploadProfilePic(file, userId, changePP, db) {
    try {
        const fileRef = ref(storage, 'profile pictures/' + userId + '.jpg');
        await uploadBytes(fileRef, file);
        console.log('uploaded!');
        const photoURL = await getDownloadURL(fileRef);
        await updateDoc(doc(db, 'users', userId), { profilePic: photoURL });
        changePP(photoURL);
    }
    catch (e) {
        console.warn(e);
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