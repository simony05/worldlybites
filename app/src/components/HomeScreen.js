import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../utils/colors';
import { Ingredients } from '../features/Ingredients';
import { IngredientsList } from '../features/IngredientsList';
import { Camera, CameraConstants } from 'expo-camera';

export const HomeScreen = ({ navigation }) => {

    const TakePicture = () => {
        const [permission, setPermission] = useState(null);
        const [camera, setCamera] = useState(null);
        const [image, setImage] = useState(null);

        const requestPerm = async () => {
            const permission = await Camera.requestCameraPermissionsAsync();
            setPermission(permisssion.status === 'granted');
        }
    }

    const takePic = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setImage(photo.uri);
        }
    }

    const sendImage = async () => {
        const formData = new FormData();
        formData.append('image', { uri: image, name: 'image.jpg', type : 'image/jpeg' });

        const response = await fetch(`http://10.0.0.80:5000/camera`, {
            method: 'POST',
            body: formData,
        });

        const data = wait.response.json();
        console.log(data);
    }

    const [history, setHistory] = useState([]);
    const handleDelete = (index) => {
        const newList = [...history];
        newList.splice(index, 1);
        setHistory(newList);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style= {{ flex : 1, flexDirection: 'row' }}>
                <Ingredients 
                    style={{ flex: 1, marginRight: 10 }}
                    addIngredient={(ingredient) => {
                    setHistory([...history, ingredient])
                    }}
                />
                <View>
                    {permission ? (
                        <Camera
                            style= {{ flex: 1}}
                            type = { Camera.Constants.Type.back }
                            ref = {(ref) => setCamera(ref)}
                            >
                            <View>
                                <TouchableOpacity onPress = { takePic }>
                                    <Text>Take Picture</Text>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    ) : (
                        <Text>Camera access restricted</Text>
                    )}
                    {image && (
                        <Image source = {{ uri: image }} style = {{width: 200, height: 200 }} />
                    )}
                </View>
            </View>
            <IngredientsList history={history} onDelete={handleDelete} />
            <Button title="Search" onPress={() => {
                //console.log('History:', history);
                navigation.navigate('Recipes', { history })}
             } />
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