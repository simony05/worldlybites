import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const RecipeList = ({ recipes }) => {
    return (
        <FlatList
            data={recipes}
            renderItem={({ item }) => (
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginBottom: 20, paddingHorizontal: 20 }}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                            style={{ width: 100, height: 100, borderRadius: 10, marginRight: 20 }}
                        />
                        <View style={{ justifyContent: 'center' }}>
                            {wrapText(item.title, 30).map((line, index) => (
                                <Text key={index} style={styles.recipeTitle}>
                                    {line}
                                </Text>
                            ))}
                            <Text style={{ fontSize: 16, color: '#666' }}>{item.cuisine}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        />
    );
};

export const RecipeCard = ({ recipe }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <TouchableOpacity onPress={() => setShowModal(true)}>
            <View style={{ flexDirection: 'row', marginBottom: 20, paddingHorizontal: 20 }}>
                <Image
                    source={{ uri: `data:image/jpeg;base64,${recipe.image}` }}
                    style={{ width: 100, height: 100, borderRadius: 10, marginRight: 20 }}
                />
                <View style={{ justifyContent: 'center', marginRight: 20 }}>
                    {wrapText(recipe.title, 30).map((line, index) => (
                        <Text key={index} style={styles.recipeTitle}>
                            {line}
                        </Text>
                    ))}
                    <Text style={{ fontSize: 16, color: '#666' }}>{recipe.cuisine}</Text>
                </View>
            </View>
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
                marginHorizontal: 20,
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>
                {recipe.title}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 10 }}>Ingredients:</Text>
            <View>
                {recipe.ingredients.split(',').map((ingredient, index) => (
                    <Text key={index} style={{ paddingHorizontal: 10 }}>
                        • {ingredient.replace(/[\[\]']/g, '')}
                    </Text>
                ))}
            </View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10 }}>Steps:</Text>
            <Text>{recipe.instructions.replace(/[\[\]']/g, '')}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <Icon name="times-circle" size={24} color="#333" />
                </View>
            </TouchableOpacity>
        </View>
    </View>
</Modal>
        </TouchableOpacity>
    );
};

const wrapText = (text, maxLength) => {
    const words = text.split(' ');
    const lines = [];
    let line = '';
  
    for (let i = 0; i < words.length; i++) {
      if (line.length + words[i].length > maxLength) {
        lines.push(line);
        line = '';
      }
      line += words[i] + ' ';
    }
    if (line) {
      lines.push(line.trim());
    }
  
    return lines;
  };

const styles = StyleSheet.create({
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});