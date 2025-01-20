import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FBSuperior from './FBSuperior'; // Componente para los botones superiores

export default function FSuperior({ currentSection, onPress }) {
  return (
    <View style={styles.container}>
      <FBSuperior 
        selectedIcon="arrow-left" 
        unselectedIcon="arrow-left" 
        id={1} 
        onPress={onPress} 
        isSelected={currentSection == 1} 
        color="#c5bbbb" // Color deseado
      />

      <Text style={styles.title}>InfoGap</Text>

      <FBSuperior 
        selectedIcon="magnify" 
        unselectedIcon="magnify" 
        id={2} 
        onPress={onPress} 
        isSelected={currentSection == 2} 
        color="#c5bbbb" // Color deseado
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#c5bbbb',
    height: 65,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 50, // Espacio horizontal alrededor del título
  },
  iconContainer: {
    paddingTop: 2,
    marginHorizontal: 30, // Espacio horizontal entre las íconos
  },
});
