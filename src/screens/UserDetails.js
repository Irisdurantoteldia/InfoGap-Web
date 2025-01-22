import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../Firebase/FirebaseConfig';
import { doc, getDoc} from 'firebase/firestore';
import { FaArrowLeft } from 'react-icons/fa';

export default function UserDetails() {
  const { userId } = useParams(); // Obtenim l'ID de l'usuari des de la URL
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserDetails(userSnapshot.data());
        } else {
          console.log('No such user!');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>; // Mentre es carrega la informació de l'usuari
  }

  // Renderitzar les publicacions
  const renderPublications = () => {
    if (userDetails.publications && userDetails.publications.length > 0) {
      return userDetails.publications.map((pub, index) => (
        <div key={index} style={styles.publicationCard}>
          <img src={pub.imageUrl} alt={pub.title} style={styles.pubImage} />
          <div>
            <h4>{pub.title}</h4>
            <p>{pub.description}</p>
          </div>
        </div>
      ));
    } else {
      return (
        <div style={styles.publicationCard}>
          <img
            src={require('../assets/default_image.jpg')}
            alt="Default"
            style={styles.pubImage}
          />
          <div>
            <h4>No publications available</h4>
            <p>This user has not published anything yet.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div style={styles.navButton} onClick={() => navigate('/people')}>
          <FaArrowLeft size={30} />
        </div>
        <h1 style={styles.title}>User Information</h1>
      </div>
      <div style={styles.detailsContainer}>
        <div style={styles.profileContainer}>
          <img
            src={userDetails.profileImageUrl || require('../assets/default_image.jpg')}
            alt="Profile"
            style={styles.profileImage}
          />
          <p style={styles.userLabel}>User</p>
        </div>
        <p><strong>Email:</strong> {userDetails.email || 'There is no email'}</p>
        <p><strong>Published Items:</strong> {userDetails.publishedItems || 'There are no published articles'}</p>
        <p><strong>Date Joined:</strong> {userDetails.date || 'No hay fecha de ingreso'}</p>
        <div>
          <h3>Publications</h3>
          {renderPublications()}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c5bbbb',
    padding: '10px',
  },
  navButton: {
    cursor: 'pointer',
  },
  title: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4a4a4a',
    marginRight: '600px',
  },
  detailsContainer: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px',
  },
  userLabel: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#4a4a4a',
  },
  publicationCard: {
    display: 'flex',
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#e6e6e6',
    borderRadius: '8px',
  },
  pubImage: {
    width: 80,
    height: 80,
    borderRadius: '8px',
    objectFit: 'cover',
    marginRight: '15px',
  },
};
