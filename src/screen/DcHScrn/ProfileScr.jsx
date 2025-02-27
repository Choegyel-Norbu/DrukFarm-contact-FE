import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import {dummyArray} from '../../components/DummyArray';
import {AuthContext} from '../../custom/AuthContext';
import API_BASE_URL from '../../config';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function ProfileScr() {
  const [selectedValue, setSelectedValue] = useState([]);
  const {email, userName} = useContext(AuthContext);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [userToken, setUserToken] = useState('');
  const [dpImgName, setDpImgName] = useState('');
  const [dpImgFileType, setDpImgFileType] = useState('');
  const [dp, setDp] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchToken();
    }, []),
  );

  const getDP = useCallback(async token => {
    const response = await axios.get(`${API_BASE_URL}api/getDP/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('----------------------------------------------------');
    const encoded = response.data.replace(/ /g, '%20');
    setDp(encoded);
  });

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
        getDP(token);
        console.log('User Token @@@ =' + userToken);
      } else {
        console.log('Effor fetching token');
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  useEffect(() => {
    if (selectedValue && selectedValue.length > 0) {
      console.log('inside useEffect');
      fetchData();
    }
  }, [selectedValue]);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}api/getServices`, {
        email,
      });
      setRetrivedServices(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [open, setOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [items, setItems] = useState([
    {label: 'Donation', value: 'Donation'},
    {label: 'Physical service', value: 'Physical service'},
    {label: 'Tution', value: 'Tution'},
    {label: 'Online consultant', value: 'Online consultation'},
    {label: 'Other', value: 'Other'},
  ]);

  const [isActive, setIsActive] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const serviceOffers = dummyArray();

  const renderServiceList = ({item}) => {
    return (
      <View style={styles.serviceItem}>
        <Text style={{fontSize: 14, fontWeight: '200'}}>{item.service}</Text>
        <Text style={{backgroundColor: 'green', color: '#fff', width: 'auto'}}>
          {item.status}
        </Text>
        <Text>{item.date}</Text>
      </View>
    );
  };
  const handleImageModal = () => {
    setModalVisibility(true);
  };
  const handleServiceSubmit = async () => {
    const requestData = {
      email,
      services,
    };
    if (services.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'You must select atleast one service.',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/addServices`,
        requestData,
        {
          headers: {
            'Content-Type': 'Application/json',
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Services successfully saved! 🎉',
        position: 'top',
        visibilityTime: 3000,
      });
      setServices([]);
      // setButtonDisabled(true);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => handleResponse(response),
    );
  };

  const takePhoto = () => {
    launchCamera({mediaType: 'photo', quality: 1}, response =>
      handleResponse(response),
    );
  };

  const handleResponse = response => {
    let name = '';

    if (response.didCancel) {
      console.log('Cancelled image upload');
    } else if (response.errorCode) {
      console.log('Image picker error', response.errorCode);
    } else {
      const imageURI = response.assets[0].uri;
      const {fileName, type} = response.assets[0];
      setDpImgName(fileName);
      setDpImgFileType(type);
      setSelectedImage(imageURI);
    }
  };

  const handleDismiss = () => {
    setModalVisibility(false);
    setSelectedImage('');
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage,
      name: dpImgName,
      type: dpImgFileType,
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}api/uploadDP/${email}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      setDp(response.data);
      Toast.show({
        type: 'success',
        text1: ' Profile photo uploaded successfully',
        position: 'top',
        visibilityTime: 2000,
      });
      setModalVisibility(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage,
      name: dpImgName,
      type: dpImgFileType,
    });

    try {
      const response = await axios.put(
        `${API_BASE_URL}api/updateDP/${email}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      setDp(response.data);
      Toast.show({
        type: 'success',
        text1: ' Profile photo updated successfully',
        position: 'top',
        visibilityTime: 2000,
      });
      setModalVisibility(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductList = () => {
    return (
      <View style={styles.listContainer}>
        <View style={styles.listContent}></View>
        <View style={[styles.listContent, styles.emptyCard]}></View>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImg}>
          <Pressable onPress={handleImageModal}>
            {dp ? (
              <Image
                style={{height: 80, width: 80, borderRadius: 60}}
                source={{
                  uri: dp,
                }}
              />
            ) : (
              <Icon name="person" size={60} color="#b3b3b3" />
            )}
          </Pressable>
        </View>
        <View style={styles.profileDetail}>
          <Text style={{fontWeight: '700', fontSize: 16}}>{userName}</Text>
          <Text style={{marginBottom: 10, fontSize: 12}}>{email}</Text>
          <Button title="Edit profile" onPress={getDP} />
        </View>
      </View>

      <View style={styles.profileContent}>
        <View style={styles.farmerContent}>
          <Text>Products you have listed: </Text>
          <View style={styles.listContainer}>
            <View style={styles.listContent}>
              <Icon
                name="circle"
                size={10}
                color="green"
                style={styles.circleStyle}
              />
              <View style={styles.cardContent}>
                <Image
                  style={{
                    width: '80%',
                    height: '100',
                  }}
                  source={{
                    uri: 'https://media.gettyimages.com/id/1367696088/photo/fresh-sliced-mango-isolated-on-white-background.jpg?s=612x612&w=gi&k=20&c=ZLTaWVPiq7DNkFWZA79Ii8V9iBywc4_q6CKz1F0nEwA=',
                  }}
                />
                <Text style={styles.cardContentName}>Mango</Text>
                <Text style={styles.cardContentPrice}>Nu. 30 /unit</Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#fff',
                      backgroundColor: '#3385ff',
                      paddingHorizontal: 20,
                      marginVertical: 10,
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ************************************* */}

            <View style={styles.listContent}>
              <Icon
                name="circle"
                size={10}
                color="green"
                style={styles.circleStyle}
              />
              <View style={styles.cardContent}>
                <Image
                  style={{
                    width: '80%',
                    height: '100',
                  }}
                  source={{
                    uri: 'https://m.media-amazon.com/images/I/61kCjpQeKRL._AC_UF1000,1000_QL80_.jpg',
                  }}
                />
                <Text style={styles.cardContentName}>Cabbage</Text>
                <Text style={styles.cardContentPrice}>Nu. 30 /unit</Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#fff',
                      backgroundColor: '#3385ff',
                      paddingHorizontal: 20,
                      marginVertical: 10,
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.listContent}>
              <Icon
                name="circle"
                size={10}
                color="green"
                style={styles.circleStyle}
              />
              <View style={styles.cardContent}>
                <Image
                  style={{
                    width: '80%',
                    height: '100',
                  }}
                  source={{
                    uri: 'https://m.media-amazon.com/images/I/61kCjpQeKRL._AC_UF1000,1000_QL80_.jpg',
                  }}
                />
                <Text style={styles.cardContentName}>Cabbage</Text>
                <Text style={styles.cardContentPrice}>Nu. 30 /unit</Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#fff',
                      backgroundColor: '#3385ff',
                      paddingHorizontal: 20,
                      marginVertical: 10,
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* ************************************* */}
            <View style={[styles.listContent, styles.emptyCard]}></View>
          </View>
        </View>
      </View>
      {/* ***************************************** Modal ************************* */}
      <Modal
        visible={modalVisibility}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisibility(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleDismiss}>
              <Icon name="close" size={24} color="#b3b3b3" />
            </TouchableOpacity>
            {dp ? (
              <Text style={styles.modalTitle}>Update Profile Picture</Text>
            ) : (
              <Text style={styles.modalTitle}>Upload Profile Picture</Text>
            )}

            {selectedImage ? (
              <Image
                source={{uri: selectedImage}}
                style={styles.imagePreview}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Icon name="person" size={60} color="#ccc" />
              </View>
            )}
            <View style={styles.uploadOptions}>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Icon name="image" size={24} color="#fff" />
                <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                <Icon name="camera" size={24} color="#fff" />
                <Text style={styles.uploadButtonText}>Take a Photo</Text>
              </TouchableOpacity>

              {selectedImage ? (
                <>
                  {dp ? (
                    <TouchableOpacity
                      style={styles.upload}
                      onPress={updateImage}>
                      <Icon name="upload" size={24} color="blue" />
                      <Text style={styles.uploadButtonTextIcon}>Update</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.upload}
                      onPress={uploadImage}>
                      <Icon name="upload" size={24} color="blue" />
                      <Text style={styles.uploadButtonTextIcon}>Upload</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  profileHeader: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  profileImg: {
    marginLeft: 20,
  },
  profileDetail: {
    marginLeft: 20,
  },
  dropDownMainContainer: {
    width: '97%',
    height: 'auto',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  profileContent: {
    padding: 10,
    height: '100%',
    width: '100%',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  listContent: {
    backgroundColor: '#fff',
    height: 250,
    width: '45%',
    marginVertical: 5,
    elevation: 5,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContentName: {
    fontWeight: 800,
    marginTop: 10,
  },
  cardContentPrice: {
    color: 'red',
    fontSize: 10,
  },
  emptyCard: {
    elevation: 0,
    backgroundColor: 'none',
  },
  circleStyle: {
    margin: 10,
    borderWidth: 0.5,
    color: 'green',
    borderRadius: 50,
    width: 11,
  },
});
