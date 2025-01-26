import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import defaultImage from "../assets/default_image.jpg";
import { FaHome, FaUser, FaSearch, FaUsers, FaHeart } from "react-icons/fa";

export default function All() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Preguntas"));
      const dataFromFirestore = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(dataFromFirestore);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (item) => {
    navigate("/detail", { state: { item } });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]); // If all items are selected, unselect them
    } else {
      setSelectedItems(data.map((item) => item.id)); // Select all items
    }
  };

  const isSelected = (id) => selectedItems.includes(id);

  const handleDeleteSelected = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete the selected items?"
    );

    if (confirmation) {
      try {
        await Promise.all(
          selectedItems.map((id) => deleteDoc(doc(db, "Preguntas", id)))
        );
        alert("The selected items have been deleted.");
        setSelectedItems([]); // Reset the selection
        fetchData(); // Reload the data
      } catch (error) {
        console.error("Error deleting items: ", error);
        alert("There was an error deleting the items.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div
          style={{ ...styles.navButton, color: "#B22222" }}
          onClick={() => navigate("/all")}
        >
          <FaHome size={40} />
        </div>
        <h1 style={styles.title}>Database Content</h1>
        <div
          style={{ ...styles.navButton, marginRight: "10px" }}
          onClick={() => navigate("/people")}
        >
          <FaUsers size={50} />
        </div>
        <div
          style={{ ...styles.navButton, marginLeft: "5px" }}
          onClick={() => navigate("/account")}
        >
          <FaUser size={40} />
        </div>
      </div>

      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchBar}
          />
        </div>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.listContainer}>
          {data
            .filter((item) =>
              (item?.title || "").toLowerCase().includes(
                searchQuery.toLowerCase()
              )
            )
            .map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.card,
                  backgroundColor: isSelected(item.id) ? "#e6f7ff" : "#fff",
                }}
                onClick={() => handleCardClick(item)}
              >
                <div style={styles.cardImage}>
                  <img
                    src={item.imageUrl || defaultImage}
                    alt="Card"
                    style={styles.cardImageStyle}
                  />
                </div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDescription}>{item.description}</p>
                <div style={styles.likesSection}>
                  <FaHeart size={20} color="#555" />
                  <span style={styles.likesText}>
                    {item.likes || 0} Likes
                  </span>
                </div>
                <p style={styles.locationText}>
                  {"Location: " + item.location || "Location: Barcelona-Catalonia"}
                </p>
              </div>
            ))}
        </div>

        <div style={styles.multiSelectContainer}>
          <div style={styles.selectAllWrapper}>
            <h2 style={styles.multiSelectTitle}>Multi-Select</h2>
            <button style={styles.selectAllButton} onClick={handleSelectAll}>
              {selectedItems.length === data.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>
          {data.map((item) => (
            <div key={item.id} style={styles.checkboxItem}>
              <input
                type="checkbox"
                checked={isSelected(item.id)}
                onChange={() => handleSelectChange(item.id)}
              />
              <label style={styles.checkboxLabel}>{item.title}</label>
            </div>
          ))}
          <button style={styles.deleteButton} onClick={handleDeleteSelected}>
            Delete Selected
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
    minHeight: "100vh",
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
  title: {
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    color: "#4a4a4a",
    marginLeft: "580px",
    marginRight: "490px",
  },
  searchContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  searchWrapper: {
    position: "relative",
    width: "400px",
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: "15px",
    transform: "translateY(-50%)",
    color: "#666",
    fontSize: "18px",
  },
  searchBar: {
    backgroundColor: "#e6e6e6",
    padding: "10px 15px 10px 40px",
    borderRadius: "20px",
    border: "none",
    width: "100%",
    fontSize: "16px",
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },
  listContainer: {
    flex: 3,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    padding: "16px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardImage: {
    width: "100%",
    height: "180px",
    overflow: "hidden",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  cardImageStyle: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
  },
  locationText: {
    fontSize: "14px",
    color: "#777",
    marginTop: "10px",
  },
  likesSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "15px",
  },
  likesText: {
    fontSize: "14px",
    color: "#666",
  },
  multiSelectContainer: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginLeft: "20px",
  },
  selectAllWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  multiSelectTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  checkboxItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  checkboxLabel: {
    marginLeft: "10px",
    fontSize: "14px",
  },
  selectAllButton: {
    padding: "10px 20px",
    backgroundColor: "#0050b3", // Darker button color
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#d9363b", // Darker button color
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
