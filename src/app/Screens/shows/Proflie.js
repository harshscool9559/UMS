// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../../../server/app"; // Verify the path to your Firebase config file
// import { doc, updateDoc, getDoc } from "firebase/firestore"; // Import getDoc for retrieving user data
// import UserContext from "../../../context/userContext"; // Adjust this path as necessary
// import { signOut } from "firebase/auth"; // Ensure signOut is imported

// const Profile = ({ onClose }) => {
//   const { user, loading } = useContext(UserContext); // Access user and loading state from context
//   const [uploading, setUploading] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadError, setUploadError] = useState(null);
//   // const [profileImageUrl, setProfileImageUrl] = useState("https://tse3.mm.bing.net/th?id=OIP.uqQzMWgdU6Cp8N6SgR1W1wHaHa&pid=Api&P=0&h=180"); // Default image URL

//   // Fetch the user profile image from Firestore on component mount
//   // useEffect(() => {
//   //   const fetchUserProfileImage = async () => {
//   //     if (user && user.uid) {
//   //       const userRef = doc(db, "students", user.uid);
//   //       const userDoc = await getDoc(userRef);
//   //       if (userDoc.exists()) {
//   //         const userData = userDoc.data();
//   //         setProfileImageUrl(userData.profileImage || "https://tse3.mm.bing.net/th?id=OIP.uqQzMWgdU6Cp8N6SgR1W1wHaHa&pid=Api&P=0&h=180");
//   //       }
//   //     }
//   //   };

//   //   fetchUserProfileImage();
//   // }, [user]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       onClose();
//       router.push("/");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const handleImageUpload = () => {
//     if (!imageFile || !user || !user.uid || !user.userType) {
//       setUploadError("User ID or image file is undefined");
//       return;
//     }

//     const imageRef = ref(storage, `profileImages/${user.uid}`);
//     setUploading(true);
//     setUploadError(null);

//     const uploadTask = uploadBytesResumable(imageRef, imageFile);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//       },
//       (error) => {
//         console.error("Error uploading image:", error);
//         setUploadError(error.message);
//         setUploading(false);
//       },
//       async () => {
//         try {
//           const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

//           // Update Firestore with the image URL
//           let collectionName;
//           if (user.userType === "student") {
//             collectionName = "students";
//           } else if (user.userType=== "teacher") {
//             collectionName = "teachers";
//           } else if (user.userType === "admin") {
//             collectionName = "admins";
//           } else {
//             throw new Error("Invalid user role");
//           }
  
//           // Update Firestore with the image URL in the appropriate collection
//           const userRef = doc(db, collectionName, user.uid);
//           await updateDoc(userRef, { profileImage: imageUrl });
//          // Update the profile image URL state
//           setUploading(false);
//           alert("Image uploaded and saved  successfully!");
//         } catch (error) {
//           console.error("Error updating Firestore:", error);
//           setUploadError(error.message);
//           setUploading(false);
//         }
//       }
//     );
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="fixed top-0 right-0 z-8 w-80 h-screen bg-blue-200 shadow-xl rounded-l-lg p-5 transform transition-transform duration-500 ease-in-out flex flex-col items-center gap-2">
//       <button
//         className="absolute top-3 p-2 right-3 text-gray-500 hover:bg-blue-200 rounded-full hover:text-black"
//         onClick={onClose}
//       >
//         Close
//       </button>

//       <h1 className="text-black text-lg font-semibold mt-10">My Profile</h1>
   
//         <img
//           src={user.profileImage} // Use the profileImageUrl state as the src
//           alt="Profile"
//           className="h-20 w-22 rounded-full"
//         />
//      {/* Avoid rendering the image element if the URL is empty */}
//       {user ? (
//         <>
//           <p className="text-black">
//             Name: <span>{user.name || "N/A"}</span>
//           </p>
//           <p className="text-black">
//             Course: <span>{user.course || "N/A"}</span>
//           </p>
//           <p className="text-black">
//             Year: <span>{user.year || "N/A"}</span>
//           </p>
//           <p className="text-black">
//             Department: <span>{user.department || "N/A"}</span>
//           </p>
//         </>
//       ) : (
//         <p className="text-red-500">User data not available.</p>
//       )}

//       {/* Image Upload Section */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImageFile(e.target.files[0])}
//         className="mt-4"
//       />
//       <button
//         onClick={handleImageUpload}
//         disabled={uploading}
//         className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//       >
//         {uploading ? "Uploading..." : "Upload Image"}
//       </button>
//       {uploadError && <p className="text-red-500 mt-2">Error: {uploadError}</p>}

//       {/* Logout Button */}
//       <button
//         className="mt-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         onClick={handleLogout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Profile;
"use client";
import React, { useContext, useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../server/app";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import UserContext from "../../../context/userContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import from next/navigation for App Router

const Profile = ({ onClose }) => {
  const { user, loading } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
      router.push("/"); // Navigate to the homepage
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleImageUpload = () => {
    if (!imageFile || !user || !user.uid || !user.userType) {
      setUploadError("User ID or image file is undefined");
      return;
    }

    const imageRef = ref(storage, `profileImages/${user.uid}`);
    setUploading(true);
    setUploadError(null);

    const uploadTask = uploadBytesResumable(imageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading image:", error);
        setUploadError(error.message);
        setUploading(false);
      },
      async () => {
        try {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          let collectionName;
          if (user.userType === "student") {
            collectionName = "students";
          } else if (user.userType === "teacher") {
            collectionName = "teachers";
          } else if (user.userType === "admin") {
            collectionName = "admins";
          } else {
            throw new Error("Invalid user role");
          }

          const userRef = doc(db, collectionName, user.uid);
          await updateDoc(userRef, { profileImage: imageUrl });
          setUploading(false);
          alert("Image uploaded and saved successfully!");
        } catch (error) {
          console.error("Error updating Firestore:", error);
          setUploadError(error.message);
          setUploading(false);
        }
      }
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="fixed top-0 right-0 z-8 w-80 h-screen bg-blue-200 shadow-xl rounded-l-lg p-5 transform transition-transform duration-500 ease-in-out flex flex-col items-center gap-2">
      <button
        className="absolute top-3 p-2 right-3 text-gray-500 hover:bg-blue-200 rounded-full hover:text-black"
        onClick={onClose}
      >
        Close
      </button>

      <h1 className="text-black text-lg font-semibold mt-10">My Profile</h1>
      <img
        src={user?.profileImage || "https://tse3.mm.bing.net/th?id=OIP.uqQzMWgdU6Cp8N6SgR1W1wHaHa&pid=Api&P=0&h=180"}
        alt="Profile"
        className="h-20 w-22 rounded-full"
      />
      {user ? (
        <>
          <p className="text-black">Name: <span>{user.name || "N/A"}</span></p>
          <p className="text-black">Course: <span>{user.course || "N/A"}</span></p>
          <p className="text-black">Year: <span>{user.year || "N/A"}</span></p>
          <p className="text-black">Department: <span>{user.department || "N/A"}</span></p>
        </>
      ) : (
        <p className="text-red-500">User data not available.</p>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="mt-4"
      />
      <button
        onClick={handleImageUpload}
        disabled={uploading}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {uploadError && <p className="text-red-500 mt-2">Error: {uploadError}</p>}

      <button
        className="mt-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
