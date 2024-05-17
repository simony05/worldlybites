import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../utils/colors';
import { Ingredients } from '../features/Ingredients';
import { IngredientsList } from '../features/IngredientsList';

export const HomeScreen = () => {

    const [history, setHistory] = useState([]);
    const handleDelete = (index) => {
        const newList = [...history];
        newList.splice(index, 1);
        setHistory(newList);
        console.log(newList);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Ingredients 
                addIngredient={(ingredient) => {
                setHistory([...history, ingredient])
                }}
            />
            <IngredientsList history={history} onDelete={handleDelete} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.darkBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });