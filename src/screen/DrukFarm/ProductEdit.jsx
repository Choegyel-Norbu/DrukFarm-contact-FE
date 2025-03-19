import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import API_BASE_URL from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const ProductEdit = ({navigation, route}) => {
  const {editProduct} = route.params;
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const [updateProduceDetail, setUpdateProduceDetail] = useState({
    name: '',
    pricePerUnit: '',
    quantityAvailable: '',
    storageAndShelfLife: '',
    status: '',
  });

  useEffect(() => {
    if (editProduct) {
      setUpdateProduceDetail({
        name: editProduct.name || '',
        pricePerUnit: editProduct.pricePerUnit || '',
        quantityAvailable: editProduct.quantityAvailable || '',
        storageAndShelfLife: editProduct.storageAndShelfLife || '',
        status: editProduct.status || '',
      });
    }
  }, [editProduct]);

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('Image selection canceled');
      } else if (response.error) {
        Alert.alert('Image picker error:', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImage(selectedImage);
        // setImage({
        //   uri: selectedImage.uri,
        //   fileName: selectedImage.fileName || 'image.jpg',
        //   type: selectedImage.type || 'image/jpeg',
        // });
        setImageURL(selectedImage.uri);
      }
    });
  };

  const handleSubmit = async () => {
    // if (
    //   !updateProduceDetail.name ||
    //   !updateProduceDetail.pricePerUnit ||
    //   !updateProduceDetail.quantityAvailable ||
    //   !updateProduceDetail.storageAndShelfLife ||
    //   !updateProduceDetail.status
    // ) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Validation Error',
    //     text2: 'Please fill all fields',
    //     position: 'top',
    //     visibilityTime: 3000,
    //   });
    //   return;
    // }

    // if (isNaN(updateProduceDetail.pricePerUnit)) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Validation Error',
    //     text2: 'Price per unit must be a number',
    //     position: 'top',
    //     visibilityTime: 3000,
    //   });
    //   return;
    // }

    // if (isNaN(updateProduceDetail.quantityAvailable)) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Validation Error',
    //     text2: 'Quantity available must be a number',
    //     position: 'top',
    //     visibilityTime: 3000,
    //   });
    //   return;
    // }

    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.patch(
        `${API_BASE_URL}api/updateProduce/${editProduct.id}`,
        updateProduceDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (image) {
        const formData = new FormData();
        formData.append('file', {
          uri: image.uri,
          name: image.fileName,
          type: image.type,
        });

        try {
          const response = await fetch(
            `${API_BASE_URL}api/uploadImage/${editProduct.id}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
              body: formData,
            },
          );

          const data = await response.json();
          console.log('Image uploaded successfully:', data);
        } catch (error) {
          console.log('Fetch error:', error);
        }
      }

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Product updated',
          position: 'top',
          visibilityTime: 3000,
        });

        navigation.reset({
          index: 0,
          routes: [{name: 'ProfileStack'}],
        });
      }
    } catch (error) {
      console.log('Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to update product',
        text2: error.response?.data?.message || error.message,
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Upload */}
      <TouchableOpacity
        style={styles.imageUploadContainer}
        onPress={handleImageUpload}>
        {image ? (
          <Image source={{uri: imageURL}} style={styles.image} />
        ) : (
          <Text style={styles.imageUploadText}>Upload Product Image</Text>
        )}
      </TouchableOpacity>

      {/* Name Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Name: ({editProduct.name})</Text>
        <TextInput
          style={styles.input}
          placeholder="Edit product name"
          value={updateProduceDetail.name}
          onChangeText={item =>
            setUpdateProduceDetail(prev => ({...prev, name: item}))
          }
        />
      </View>

      {/* Price Per Unit Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Price Per Unit: ({String(editProduct.pricePerUnit)})
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Edit price per unit"
          value={updateProduceDetail.pricePerUnit}
          onChangeText={item =>
            setUpdateProduceDetail(prev => ({...prev, pricePerUnit: item}))
          }
          keyboardType="numeric"
        />
      </View>

      {/* Quantity Available Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Quantity Available: ({String(editProduct.quantityAvailable)})
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Edit quantity available"
          value={updateProduceDetail.quantityAvailable}
          onChangeText={item =>
            setUpdateProduceDetail(prev => ({...prev, quantityAvailable: item}))
          }
          keyboardType="numeric"
        />
      </View>

      {/* Storage and Shelf Life Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Storage and Shelf Life: ({editProduct.storageAndShelfLife})
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Edit storage and shelf life"
          value={updateProduceDetail.storageAndShelfLife}
          onChangeText={item =>
            setUpdateProduceDetail(prev => ({
              ...prev,
              storageAndShelfLife: item,
            }))
          }
        />
      </View>

      {/* Status Picker */}
      <Picker
        selectedValue={updateProduceDetail.status}
        onValueChange={itemValue =>
          setUpdateProduceDetail(prev => ({
            ...prev,
            status: itemValue,
          }))
        }
        style={styles.picker}>
        <Picker.Item label="Available" value="Available" />
        <Picker.Item label="Out of Stock" value="Out of Stock" />
      </Picker>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageUploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageUploadText: {
    color: '#888',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductEdit;
