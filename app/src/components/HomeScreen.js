import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Text, Image } from 'react-native';
import { colors } from '../utils/colors';
import { Ingredients } from '../features/Ingredients';
import { IngredientsList } from '../features/IngredientsList';
import { Camera, CameraType } from 'expo-camera';                         

export const HomeScreen = ({ navigation }) => {

    const [permission, setPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [image, setImage] = useState(null);

    const toggleCameraType = async() => {
        setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
    };

    const requestPerm = async () => {
        const getPermission = await Camera.requestCameraPermissionsAsync();
        setPermission(getPermission.status === 'granted');
    };

    useEffect(() => {
        requestPerm();
    }, []);

    const takePic = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setImage(photo.uri);
        }
    }

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
            <View style= {{ flex : 1, flexDirection: 'row' }}>
                <Ingredients 
                    style={{ flex: 1, marginRight: 10 }}
                    addIngredient={(ingredient) => {
                        setHistory([...history, ingredient])
                    }}
                />
                <View>
                    {permission === true ? (
                        <Camera
                            style= {{ flex: 1}}
                            type={ type }
                            ref={(ref) => setCamera(ref)}
                            >
                            <View>
                                <TouchableOpacity onPress={takePic}>
                                    <Text>Take Picture</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleCameraType} disabled={permission?.granted ? false : true}>
                                    <Text>Flip Camera</Text>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    ) : (
                        <Button title="Grant Permission" onPress={() => reqPerm()} />
                    )}
                    {image && (
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                    )}
                    <TouchableOpacity onPress={sendImage}>
                        <Text>Scan</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
  });