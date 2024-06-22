import {
  doc,
  firebase,
  getDoc as getFirestoreDoc,
  addDoc as addFirestoreDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
} from "firebase/firestore";
import { FIRESTORE, FIREBASE_APP } from "../firebase-config"

const getDoc = async (docCollection, docId) => {
  const docRef = doc(FIRESTORE, docCollection, docId);
  const docSnap = await getFirestoreDoc(docRef);
  console.log("Document data:", docSnap.data());
  return docSnap.data();
};

const getCollection = async (col) => {
  let elements = []
  const snapshot = await getDocs(collection(FIRESTORE, col));
  snapshot.forEach((doc) => elements.push({ ...doc.data(), id: doc.ref.id }));
  //const colRef = getDocs(FIRESTORE, col)
  //console.log("ADIOS")
  //snapshot.forEach(doc => {
  //  console.log(doc.data());
  //});

  //console.log(elements)
  return elements
}

const getEntrenamientoDelDia = async (usuario, dia) => {
  try {
    
    let elements = [];
    const entrenamientosRef = collection(FIRESTORE, 'entrenamientos');
    const q = query(entrenamientosRef, where('usuario', '==', usuario), where('fecha', '==', dia));
    const snapshot = await getDocs(q);
    
    snapshot.forEach((doc) => {
      elements.push({ ...doc.data(), id: doc.ref.id });
    });

    console.log("dia que se usara para filt")
    console.log(dia)
    console.log("ESTOS SON LOS ENTRENAMIENTOS TRAIDOS");
    console.log(elements);

    return elements;
  } catch (error) {
    console.error("Error al obtener los entrenamientos: ", error);
    return [];
  }
}

const getDietaDelDia = async (usuario, dia) => {
  try {
    
    let elements = [];
    const dietasRef = collection(FIRESTORE, 'dietas');
    const q = query(dietasRef, where('usuario', '==', usuario), where('fecha', '==', dia));
    const snapshot = await getDocs(q);
    
    snapshot.forEach((doc) => {
      elements.push({ ...doc.data(), id: doc.ref.id });
    });

    console.log("dia que se usara para filt")
    console.log(dia)
    console.log("ESTOS SON LAS DIETAS TRAIDOS");
    console.log(elements);

    return elements;
  } catch (error) {
    console.error("Error al obtener las dietas: ", error);
    return [];
  }
}

const getTarifasSuscripcion = async () => {
  let elements = []
  const snapshot = await getDocs(collection(FIRESTORE, 'tarifas'));
  snapshot.forEach((doc) => elements.push({ ...doc.data(), id: doc.ref.id }));

  return elements
}

const addDoc = async (targetCollection, newDoc) => {
  const docRef = await addFirestoreDoc(
    collection(firestore, targetCollection),
    newDoc
  );

  console.log("Document written with ID: ", docRef.id);

  return docRef;
};

const updateUser = async (collection, id, name, email, photoUrl, phone) => {
  const docRef = doc(FIRESTORE, collection, id);
  updateDoc(docRef, { name: name, email: email, phone: phone, photoUrl: photoUrl }, { merge: true });
};

const updateHealthData = async (id, weight, height, allergies) => {
  const docRef = doc(FIRESTORE, 'users', id);
  updateDoc(docRef, { weight: weight, height: height, allergies: allergies }, { merge: true });
};

const upDoc = async (collection, id, data) => {
  const docRef = doc(FIRESTORE, collection, id);
  updateDoc(docRef, data);
};

export const RemoteInfoDatasource = {
  getDoc,
  addDoc,
  getCollection,
  updateUser,
  upDoc,
  getTarifasSuscripcion,
  getEntrenamientoDelDia,
  getDietaDelDia,
  updateHealthData
};
