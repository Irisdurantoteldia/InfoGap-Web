import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from './Firebase/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AllDataPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Comprova l'estat d'autenticació
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  // Carrega dades de Firebase
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'Preguntes'));
          const dataList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(dataList);
        } catch (error) {
          console.error('Error al carregar les dades: ', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Accés denegat. Necessites estar autenticat.</p>;
  }

  if (loading) {
    return <p>Carregant dades...</p>;
  }

  return (
    <div style={styles.container}>
      <h1>Dades de la Col·lecció</h1>
      {data.length === 0 ? (
        <p>No hi ha dades disponibles.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Descripció</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom || 'Sense nom'}</td>
                <td>{item.descripcio || 'Sense descripció'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Estils en línia
const styles = {
  container: {
    margin: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
};

export default AllDataPage;
