import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaUser } from "react-icons/fa"; // Afegim la importació de les icones
import defaultImage from "../assets/default_image.jpg";

export default function DetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {}; // Si no hi ha item, es mostrarà el missatge d'error

  if (!item) {
    return <p>No data found to display.</p>;
  }

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
            marginLeft: "600px",
            marginRight: "520px",
          }}
        >
          Content Info
        </h1>
        <div style={{ ...styles.navButton, marginRight: "1px" }} onClick={() => navigate("/people")}>
          <FaUsers size={50} />
        </div>
        <div style={{ ...styles.navButton, marginLeft: "5px", color: "#B22222" }} onClick={() => navigate("/account")}>
          <FaUser size={40} />
        </div>
      </div>

      <center><button style={styles.backButton} onClick={() => navigate(-1)}>
        Tornar
      </button></center>

      <h1 style={styles.title}>{item.title}</h1>
      <p style={styles.date}>{item.date || "No date"}</p>

      <div style={styles.imageWrapper}>
        <img
          src={item.imageUrl || defaultImage}
          alt={item.title}
          style={styles.image}
        />
      </div>

      <p style={styles.description}>{item.description}</p>
      <p style={styles.likes}>Likes: {item.likes || 0}</p>
      <p style={styles.location}>Location: {item.location || "Barcelona-Catalonia"}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    paddingBottom: 250,
  },
  topBar: {
    backgroundColor: "#c5bbbb",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    cursor: "pointer",
  },
  backButton: {
    marginBottom: "20px",
    backgroundColor: "#a9a9a9",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "90px",
    width: "80px", /* S'ha augmentat el valor per fer el botó més ample */
  },
  title: {
    fontSize: "40px", // Reduïm la mida per fer-ho més petit
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center", // Centrem el títol
  },
  date: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "20px",
    textAlign: "center", // Centrem la data
  },
  imageWrapper: {
    textAlign: "center",
    marginBottom: "20px",
  },
  image: {
    maxWidth: "45%", // Fem la imatge més petita
    height: "auto",
    borderRadius: "8px",
  },
  description: {
    fontSize: "20px",
    lineHeight: "1.5",
    marginBottom: "20px",
    textAlign: "center", // Centrem la descripció
  },
  likes: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
    textAlign: "center", // Centrem els likes
  },
  location: {
    fontSize: "14px",
    color: "#666",
    textAlign: "center", // Centrem la localització
  },
};
