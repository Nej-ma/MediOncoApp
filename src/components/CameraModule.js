import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';

const CameraModule = ({ onPictureTaken, patient }) => {
    const cameraRef = useRef(null);
    const [isPreview, setIsPreview] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        Alert.alert('Permission refusée', 'Désolé, nous avons besoin de l\'autorisation de la caméra pour que cela fonctionne !');
        return <View />;
    }


    const takePicture = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync();
            setImageUri(uri);
            setIsPreview(true);
        }
    };

    const savePicture = async () => {
        console.log("savePicture : " + patient.id + " " + patient.firstname + " " + patient.name);
        if (imageUri) {
          try {
            const formData = new FormData();
            formData.append('photo', {
              uri: imageUri,
              type: 'image/jpeg',
              name: `${patient.id}_${patient.firstname}_${patient.name}_${Date.now()}.jpg`,
            });
      
            const response = await fetch('http://192.168.117.1:3000/multipart-upload', { //local ip address -> http://192.168.117.1:3000/multipart-upload
              method: 'PATCH',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            if (response.ok) {
                Alert.alert("Image téléchargée", "L'image a été téléchargée sur le serveur.");
            } else {
                Alert.alert("Échec du téléchargement", "Échec du téléchargement de l'image sur le serveur.");
            }

            onPictureTaken(imageUri);
            } catch (error) {
                Alert.alert("Erreur", "Une erreur s'est produite lors de l'enregistrement de l'image.");
            }
            }
            };
      

    const retakePicture = () => {
        setImageUri(null);
        setIsPreview(false);
    };

    const toggleFlashMode = () => {
        setFlashMode(
            flashMode === Camera.Constants.FlashMode.on
                ? Camera.Constants.FlashMode.off
                : Camera.Constants.FlashMode.on
        );
    };

    return (
        <View style={styles.container}>
            {isPreview ? (
                <View style={styles.preview}>
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                </View>
            ) : (
                <Camera
                    ref={cameraRef}
                    style={styles.preview}
                    type={Camera.Constants.Type.back}
                    flashMode={flashMode}
                />
            )}
            {isPreview ? (
                <>
                    <TouchableOpacity onPress={retakePicture} style={styles.capture}>
                        <Text style={styles.captureText}> Refaire </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={savePicture} style={styles.capture}>
                        <Text style={styles.captureText}> Enregistrer </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity onPress={takePicture} style={styles.capture}>
                        <FontAwesome name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleFlashMode} style={[styles.capture, styles.flashIcon]}>
                        {flashMode === Camera.Constants.FlashMode.on ? (
                            <FontAwesome name="flash" size={24} color="white" /> // it means that the flash is on
                        ) : (
                            <FontAwesome name="flash" size={24} color="darkgrey" /> // it means that the flash is off
                        )}
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    previewImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
    capture: {
        flex: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    captureText: {
        fontSize: 14,
        color: 'black',
    },
    flashIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
});

export default CameraModule;