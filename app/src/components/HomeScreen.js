import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, Button, View, Modal, TouchableOpacity, Text, Image } from 'react-native';
import { colors } from '../utils/colors';
import { Ingredients } from '../features/Ingredients';
import { IngredientsList } from '../features/IngredientsList';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Network from 'expo-network';

export const HomeScreen = ({ navigation }) => {

    const [permission, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [scanning, setScanning] = useState(false);
    const cameraRef = useRef(null);

    const sendImage = async () => {
        
        const formData = new FormData();
        formData.append('image', image);
        //console.log('Sending image:', image);
        setScanning(true);
        fetch('http://10.0.0.119:5000/camera', {
            method: 'POST',
            headers: {
            'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => addList(data.ingredients))
        .then(setScanning(false))
        .catch(error => console.error(error));
    };

    const [history, setHistory] = useState([]);

    const handleDelete = (index) => {
        const newList = [...history];
        newList.splice(index, 1);
        setHistory(newList);
    }

    const addList = (ingrs) => {
        if (Array.isArray(ingrs)) {
            setHistory([...history, ...ingrs]);
        } else if (ingrs && ingrs.message && Array.isArray(ingrs.message)) {
            setHistory([...history, ...ingrs.message]);
        } else {
            console.error("Error: ingrs is not an array or an object with a 'message' property that is an array");
        }
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 1, base64: true };
            const photo = await cameraRef.current.takePictureAsync(options);
            setImage(photo.base64);
            //console.log('Image set:', image);
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

    const getIp = () => {
        Network.getIpAddressAsync().then((ip) => {
          console.log(ip);
        }).catch((error) => {
          console.error(error);
        });
    }

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
            { scanning ?
                <View>
                    <Text>Scanning image</Text>
                </View>
                : <></>
            }
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