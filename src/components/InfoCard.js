import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { doc, setDoc, getDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig"; // Importación correcta de la configuración de Firestore

const InfoCard = ({
  title = "Title",
  description = "Description goes here",
  date = "Date",
  location = "Location",
  initialFavorites = false,
  imageUrl,
  documentId, // Si es undefined, se generará un nuevo documento
  onLocationPress,
}) => {
  const [liked, setLiked] = useState(initialFavorites);
  const [likes, setLikes] = useState(0); // Inicializar likes en 0
  const [docId, setDocId] = useState(documentId); // Guardar el ID del documento generado

  useEffect(() => {
    const initializeDocument = async () => {
      try {
        const collectionRef = collection(db, "Preguntas");
        if (!docId) {
          // Crear un nuevo documento si no hay un documentId
          const newDocRef = doc(collectionRef, new Date().getTime().toString()); // Generar un ID único basado en el tiempo
          const newData = {
            title,
            description,
            date,
            location,
            likes: 0,
            Favorites: initialFavorites,
          };
          await setDoc(newDocRef, newData);
          setDocId(newDocRef.id); // Guardar el nuevo ID generado
          console.log("Documento creado con ID:", newDocRef.id);
        } else {
          // Cargar el documento existente
          const docRef = doc(db, "Preguntas", docId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setLikes(data.likes || 0);
            setLiked(data.Favorites || false);
          } else {
            console.error("No se encontró el documento.");
          }
        }
      } catch (error) {
        console.error("Error al inicializar documento en Firestore:", error);
        Alert.alert("Error", "No se pudo inicializar el documento.");
      }
    };

    initializeDocument();
  }, [docId]);

  const handleLikePress = async () => {
    try {
      if (!docId) {
        console.error("El ID del documento no está definido.");
        return; // Salir de la función si el ID del documento no está definido
      }

      const newLikedState = !liked;
      setLiked(newLikedState);

      const docRef = doc(db, "Preguntas", docId);
      const newLikes = newLikedState ? likes + 1 : likes - 1;

      await updateDoc(docRef, {
        Favorites: newLikedState,
        likes: newLikes,
      });

      setLikes(newLikes);
    } catch (error) {
      console.error("Error al actualizar Firestore:", error);
      Alert.alert("Error", "No se pudieron actualizar los datos.");
    }
  };

  const imageSource = imageUrl
    ? { uri: imageUrl }
    : require('../assets/default_image.jpg');

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rowContainer}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
          <Icon name={liked ? "heart" : "heart-outline"} size={20} color="red" />
          <Text style={styles.likeText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationButton} onPress={onLocationPress}>
          <Icon name="location-outline" size={20} color="red" />
          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
    elevation: 5,
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  image: {
    width: '40%',
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    width: '55%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 7,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 5,
    fontSize: 14,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'red',
  },
});

export default InfoCard;
