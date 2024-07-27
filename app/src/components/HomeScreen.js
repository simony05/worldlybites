import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Text, Image } from 'react-native';
import { colors } from '../utils/colors';
import { Ingredients } from '../features/Ingredients';
import { IngredientsList } from '../features/IngredientsList';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export const HomeScreen = ({ navigation }) => {

    const camera = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState(null);

    const sendImage = async () => {
        const formData = new FormData();
        formData.append('image', { uri: image, name: 'image.jpg', type: 'image/jpeg' });

        fetch('http://10.0.0.80:5000/camera', {
            method: 'POST',
            body: formData,
          })
           .then(response => response.json())
           .then(data => console.log(data))
           .catch(error => console.error(error));
    };

    const [history, setHistory] = useState([]);

    const handleDelete = (index) => {
        const newList = [...history];
        newList.splice(index, 1);
        setHistory(newList);
    }

    return (
        <SafeAreaView style={styles.container}>
                <Ingredients 
                    addIngredient={(ingredient) => {
                        setHistory([...history, ingredient])
                    }}
                />
                {!permission ? (
                    <View />
                ) : (
                    <View>
                        <Text style={styles.message}>We need your permission to show the camera</Text>
                        <Button onPress={requestPermission} title="grant permission" />
                    </View>
                )}
            <IngredientsList history={history} onDelete={handleDelete} />
            <Button title="Search" onPress={() => {
                //console.log('History:', history);
                navigation.navigate('Recipes', { history })
            }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.darkBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
      },
      button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
  });