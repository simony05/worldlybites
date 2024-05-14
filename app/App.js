import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { colors } from './src/utils/colors';
import { Ingredients } from './src/features/Ingredients';
import { IngredientsList } from './src/features/IngredientsList';

export default function App() {
  const [history, setHistory] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <Ingredients 
        addIngredient={(ingredient) => {
          setHistory([...history, ingredient])
        }}
      />
      <IngredientsList history={history} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
