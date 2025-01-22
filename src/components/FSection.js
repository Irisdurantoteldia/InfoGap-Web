import React from 'react';
import { Link } from 'react-router-dom';
import FButton from './FButton';

export default function FSection({ currentSection, onPress }) {
  return (
    <div style={styles.container}>
      <Link to="/home">
        <FButton 
          selectedIcon="home" 
          unselectedIcon="home-outline" 
          id={1} 
          onPress={onPress} 
          isSelected={currentSection === 1} 
        />
      </Link>
      
      <Link to="/map">
        <FButton 
          selectedIcon="map-marker" 
          unselectedIcon="map-marker-outline" 
          id={2} 
          onPress={onPress} 
          isSelected={currentSection === 2} 
        />
      </Link>

      <Link to="/create">
        <FButton 
          selectedIcon="plus-circle" 
          unselectedIcon="plus-circle-outline" 
          id={3} 
          onPress={onPress} 
          isSelected={currentSection === 3} 
        />
      </Link>

      <Link to="/favorites">
        <FButton 
          selectedIcon="heart" 
          unselectedIcon="heart-outline" 
          id={4} 
          onPress={onPress} 
          isSelected={currentSection === 4} 
        />
      </Link>

      <Link to="/profile">
        <FButton 
          selectedIcon="account" 
          unselectedIcon="account-outline" 
          id={5} 
          onPress={onPress} 
          isSelected={currentSection === 5} 
        />
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: '10px'
  }
};
