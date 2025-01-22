import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, storage, db } from "../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Account() {
  const [email, setEmail] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(""); // Ara només utilitzem aquesta
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(""); // Afegim el tipus d'usuari
  const phoneNumber = "+34 123 456 789"; // Número de telèfon hardcodejat
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || "Unknown User");
        setUserId(user.uid);
        loadProfileImage(user.uid);
        loadUserType(user.uid); // Carreguem el tipus d'usuari
      } else {
        setEmail("Unknown User");
      }
    });
  }, []);

  const loadProfileImage = async (userId) => {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setProfileImageUrl(userData.profileImageUrl || ""); // Actualitzem l'URL de la imatge
    }
  };

  const loadUserType = async (userId) => {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setUserType(userData.userType || "Admin"); // Suposant que 'userType' està a Firestore
    }
  };

  const handleImagePicker = (event) => {
    const file = event.target.files[0];
    if (file && userId) {
      const storageRef = ref(storage, `profileImages/${userId}`);
      const uploadImage = async () => {
        try {
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          setProfileImageUrl(url); // Fem servir directament `profileImageUrl`
          const userDocRef = doc(db, "users", userId);
          await updateDoc(userDocRef, { profileImageUrl: url });
          alert("Profile image updated successfully!");
        } catch (error) {
          alert("Error uploading image. Please try again.");
        }
      };
      uploadImage();
    } else {
      alert("No user ID found. Please log in again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      alert("Error logging out.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div style={styles.navButton} onClick={() => navigate("/all")}>
          <FaHome size={40} />
        </div>
        <h1
          style={{
            fontWeight: "bold",
            fontStyle: "italic",
            textAlign: "center",
            color: "#4a4a4a",
            marginLeft: "610px",
            marginRight: "490px",
          }}
        >
          Admin Info
        </h1>
        <div style={{ ...styles.navButton, marginLeft: "50px", marginRight: "1px" }} onClick={() => navigate("/people")}>
          <FaUsers size={50} />
        </div>
        <div style={{ ...styles.navButton, marginLeft: "1px", color: "#B22222" }} onClick={() => navigate("/account")}>
          <FaUser size={40} />
        </div>
      </div>

      <div style={styles.settingsContainer}>
        <div style={styles.box}>
          <div style={styles.profileContainer}>
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="Profile" style={styles.profileImage} />
            ) : (
              <span style={styles.photoText}>👤</span>
            )}
            <input type="file" onChange={handleImagePicker} style={styles.changeButton} />
          </div>

          <div style={styles.fieldContainer}>
            <span style={styles.fieldLabel}>Email:</span>
            <span style={styles.usernameText}>{email}</span>
          </div>

          <div style={styles.fieldContainer}>
            <span style={styles.fieldLabel}>User ID:</span>
            <span style={styles.usernameText}>{userId}</span>
          </div>

          <div style={styles.fieldContainer}>
            <span style={styles.fieldLabel}>User Type:</span>
            <span style={styles.usernameText}>{userType}</span>
          </div>

          <div style={styles.fieldContainer}>
            <span style={styles.fieldLabel}>Phone Number:</span>
            <span style={styles.usernameText}>{phoneNumber}</span>
          </div>

          <button style={styles.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f4f4f4",
    paddingBottom: 250,
  },
  topBar: {
    backgroundColor: "#c5bbbb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    cursor: "pointer",
    padding: "0px 10px",
  },
  title: {
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    color: "#4a4a4a",
  },
  settingsContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
  },
  box: {
    backgroundColor: "#E5E5E5",
    padding: 50,
    borderRadius: 10,
    border: "1px solid #A0A0A0",
    width: "90%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    marginRight: 10,
  },
  photoText: {
    fontSize: 40,
    marginRight: 10,
  },
  changeButton: {
    padding: 5,
    backgroundColor: "#FFF",
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  fieldLabel: {
    width: 100,
    fontSize: 16,
    fontWeight: "bold",
  },
  usernameText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#F44336",
    padding: "10px 20px",
    borderRadius: 5,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    border: "none",
    marginTop: 20,
    alignSelf: "center",
  },
};
