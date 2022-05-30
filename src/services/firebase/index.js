// const { initializeApp } = require("firebase/app");
// const {
//   getStorage,
//   ref,
//   uploadString,
//   getDownloadURL,
// } = require("firebase/storage");

// const firebaseConfig = {
//   apiKey: "AIzaSyBOSx8I6cB3WS3vex0AK0bs7A9QZGkyPr8",
//   authDomain: "gsa-storage.firebaseapp.com",
//   projectId: "gsa-storage",
//   storageBucket: "gsa-storage.appspot.com",
//   messagingSenderId: "1059890577096",
//   appId: "1:1059890577096:web:605c2636bea2709dcdeffd",
//   measurementId: "G-RMTKJN4Z9H",
// };

// initializeApp(firebaseConfig);

// module.exports.uploadImage = async (file, path) => {
//   const storage = getStorage();

//   const metadata = {
//     contentType: "image/jpeg",
//   };

//   try {
//     const storageRef = ref(storage, path);
//     await uploadString(storageRef, file.split(",")[1], "base64", metadata);

//     const url = await getDownloadURL(storageRef);

//     return url;
//   } catch (error) {
//     console.log(error);
//   }
// };
