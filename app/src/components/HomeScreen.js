import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, Button, View, Modal, TouchableOpacity, Text, Image } from 'react-native';
import { colors } from '../utils/colors';
import { Ingredients } from '../features/Ingredients';
import { IngredientsList } from '../features/IngredientsList';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export const HomeScreen = ({ navigation }) => {

    const [permission, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const cameraRef = useRef(null);

    const sendImage = async () => {
        const formData = new FormData();
        formData.append('image', {
            uri: image,
            name: 'image.jpg',
            type: 'image/jpeg'
        });

        fetch('http://10.0.0.80:5000/camera', {
            method: 'POST',
            body: formData, 
            headers: { 
                'Content-Type': 'application/json'
            }
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

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setImage(photo.uri);
            sendImage();
            setModalVisible(false);
        }
    }

    const handleExit = () => {
        setModalVisible(false);
    };
    
    const handleOpenCamera = () => {
        setModalVisible(true);
    };

    if (!permission) {
        return <View />
    }

    return (
        <SafeAreaView style={styles.container}>
                <Ingredients 
                    addIngredient={(ingredient) => {
                        setHistory([...history, ingredient])
                    }}
                />
                {!permission.granted ? (
                    <View>
                        <Text style={styles.message}>We need your permission to show the camera</Text>
                        <Button onPress={requestPermission} title="grant permission" />
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity onPress={handleOpenCamera}>
                            <Text>Open Camera</Text>
                        </TouchableOpacity>
                        <Modal visible={modalVisible} transparent={true}>
                            <View style={ styles.modal }>
                                <CameraView
                                    style={ styles.cameraBox }
                                    facing={ 'back' }
                                    ref = { cameraRef }
                                />
                                <View style = { styles.row }>
                                    <TouchableOpacity onPress={takePicture}>
                                        <Text>Take Picture</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleExit}>
                                        <Text>Exit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
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
      text: {
        color: colors.white,
      },
      modal: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
      },
      cameraBox: {
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
      },
      row: {
        flexDirection: 'row'
      }
  });