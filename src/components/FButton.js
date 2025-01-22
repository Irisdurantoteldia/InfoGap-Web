import React from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa'; // Exemple d'icones (pots ajustar-ho segons les necessitats)

export default function FButton({ 
    selectedIcon = <FaCircle />, // Icona seleccionada
    unselectedIcon = <FaRegCircle />, // Icona no seleccionada
    id,
    isSelected,
    onPress,
    isCircular = false // Propietat per determinar si és circular
}) {
    return (
        <div 
            onClick={() => onPress(id)} 
            style={{ 
                ...styles.buttonContainer, 
                ...(isCircular && styles.circular) 
            }}
        >
            <div style={styles.iconContainer}>
                {isSelected ? selectedIcon : unselectedIcon}
                {isSelected && <div style={styles.selectedLine} />}
            </div>
        </div>
    );
}

const styles = {
    buttonContainer: {
        display: 'flex',
        alignItems: 'center', // Centrar el botó horitzontalment
        justifyContent: 'center', // Centrar el contingut del botó dins
        flex: 1,
        cursor: 'pointer', // Mostrar la mà quan es passa per sobre
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Centrar l'icona dins del contenidor
        paddingBottom: '10px', // Aixeca lleugerament els ícons si cal
    },
    circular: {
        backgroundColor: '#FFF', // Fons blanc per als botons circulars
        borderRadius: '50%', // Fa que el botó sigui circular
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Ombra per fer-lo més destacat
    },
    selectedLine: {
        height: '2px',
        backgroundColor: 'black', // Línia negra sota l'icona seleccionada
        width: '50px',
        marginTop: '5px',
    },
};
