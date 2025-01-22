import React from 'react';
import { Link } from 'react-router-dom'; // Usamos Link de react-router-dom para la navegación
import { FaArrowLeft, FaSearch } from 'react-icons/fa'; // Para los íconos

export default function FSuperior({ currentSection, onPress }) {
  return (
    <div style={styles.container}>
      <Link to="/" style={styles.iconContainer} onClick={() => onPress(1)}>
        <FaArrowLeft color={currentSection === 1 ? '#c5bbbb' : 'black'} />
      </Link>

      <h1 style={styles.title}>InfoGap</h1>

      <Link to="/search" style={styles.iconContainer} onClick={() => onPress(2)}>
        <FaSearch color={currentSection === 2 ? '#c5bbbb' : 'black'} />
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#c5bbbb',
    height: '65px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: '50px', // Espacio horizontal alrededor del título
  },
  iconContainer: {
    paddingTop: '2px',
    marginHorizontal: '30px', // Espacio horizontal entre las íconos
    cursor: 'pointer',
  },
};
