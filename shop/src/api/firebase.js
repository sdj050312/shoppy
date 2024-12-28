import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, get, set , remove } from 'firebase/database';

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDrBvrD2wHSrzmX8ZnbDkgH9VjjhAoj3Rs",
  authDomain: 'shopping-c7b85.firebaseapp.com',
  databaseURL: 'https://shopping-c7b85-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'shopping-c7b85',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}
export async function addNewProduct(product, image) {
    const id = uuidv4();
    set(ref(database, `product/${id}`), {
        ...product, 
        id,
        price: parseInt(product.price),
        image,
    
    })

}
export async function getProducts() {
  const db = getDatabase();
  const productsRef = ref(db, "product"); // Firebase에서 "products" 경로 사용
  const snapshot = await get(productsRef);

  if (snapshot.exists()) {
    return Object.values(snapshot.val()); // 객체를 배열 형태로 변환
  } else {
    return []; // 데이터가 없을 경우 빈 배열 반환
  }
}

export async function getCart (userId) {
  return get(ref(database, `carts/${userId}`))// 
  .then(snapshot => {
    const items = snapshot.val() || {};
    console.log(items);
    return Object.values(items);
  })
}

export async function addCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);

}

export async function removeCart (userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}