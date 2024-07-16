// import { database } from "@/lib/firebase";
// import { onValue, ref } from "firebase/database";

// const fetchUsers = () => {
//     const usersRef = ref(database, "users/");
//     onValue(usersRef, (snapshot) => {
//       const data = snapshot.val();
//       const usersList = data
//         ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
//         : [];
//       if (currentUser) {
//         setUsers(usersList.filter((user) => user.id !== currentUser.uid));
//       } else {
//         setUsers(usersList);
//       }
//     });
//   };