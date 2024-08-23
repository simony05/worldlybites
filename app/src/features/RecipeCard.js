import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';

export const RecipeCard = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Text>{recipe.title}</Text>
      <Image
        source={{ uri: `data:image/jpeg;base64,${recipe.image}` }}
        style={{ width: 200, height: 200 }}
      />
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text>Further Info</Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: 300,
              maxWidth: '90%',
            }}
          >
            <Text style={{ alignItems: 'center'}}>{recipe.title}</Text>
            <Text>Ingredients:</Text>
            <View>
              {recipe.ingredients.split(',').map((ingredient, index) => (
                <Text key={index} style={{ paddingHorizontal: 10 }}>
                  • {ingredient.replace(/[\[\]']/g, '')}
                </Text>
              ))}
            </View>
            <Text>Steps:</Text>
            <Text>{recipe.instructions.replace(/[\[\]']/g, '')}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};