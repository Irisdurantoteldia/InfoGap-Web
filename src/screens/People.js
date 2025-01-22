import React, { useState, useEffect } from 'react';
import { FaSearch, FaHome, FaUser, FaUsers } from 'react-icons/fa';
import { db } from '../Firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function People() {
  const [searchTerm, setSearchTerm] = useState('');
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc, index) => {
          const data = doc.data();
          return {
            id: doc.id, // Afegim l'ID de l'usuari
            name: data.name || `User${index + 1}`,
            profileImageUrl: data.profileImageUrl || require('../assets/default_image.jpg'),
            publishedItems: data.publishedItems || 0,
            date: data.date || 'There is no date',
          };
        });
        setUsersData(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div
          style={styles.navButton}
          onClick={() => navigate('/all')}
        >
          <FaHome size={40} />
        </div>
        <h1 style={{ fontWeight: "bold", fontStyle: "italic", textAlign: "center", color: "#4a4a4a", marginLeft: "620px", marginRight: "490px" }}>
          Database Users
        </h1>
        <div style={{ ...styles.navButton, marginRight: "10px", color: "#B22222" }} onClick={() => navigate("/people")}>
          <FaUsers size={50} />
        </div>
        <div style={{ ...styles.navButton, marginLeft: "5px" }} onClick={() => navigate("/account")}>
          <FaUser size={40} />
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={styles.searchBar}
          />
        </div>
      </div>

      <div style={styles.gridContainer}>
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            style={styles.userCard}
            onClick={() => navigate(`/user/${user.id}`)} // Redirigeix a la pàgina de detalls de l'usuari
          >
            <img
              src={user.profileImageUrl}
              alt=""
              style={styles.profileImage}
            />
            <div style={styles.userInfo}>
              <h3 style={styles.username}>{user.name}</h3>
              <p style={styles.publishedItems}>
                Published Items: {user.publishedItems}
              </p>
              <p style={styles.date}>Published on: {user.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    paddingBottom: 250,
  },
  topBar: {
    backgroundColor: '#c5bbbb',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    cursor: 'pointer',
  },
  title: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4a4a4a',
  },
  searchContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  searchWrapper: {
    position: 'relative',
    width: '400px',
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: '15px',
    transform: 'translateY(-50%)',
    color: '#666',
    fontSize: '18px',
  },
  searchBar: {
    backgroundColor: '#e6e6e6',
    padding: '10px 15px 10px 40px',
    borderRadius: '20px',
    border: 'none',
    width: '100%',
    fontSize: '16px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
    maxWidth: 1200,
    margin: '0 auto',
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: 10,
  },
  userInfo: {
    color: '#333',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  publishedItems: {
    color: '#555',
    marginBottom: 5,
  },
  date: {
    color: '#777',
  },
};
