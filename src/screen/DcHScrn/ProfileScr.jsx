import {
  Alert,
  BackHandler,
  Button,
  Image,
  Modal,
  PermissionsAndroid,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../../custom/AuthContext';
import API_BASE_URL from '../../config';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageCropPicker from 'react-native-image-crop-picker';
import LogoutDialog from '../../custom/LogoutDialog';
import {useFocusEffect} from '@react-navigation/native';

export default function ProfileScr({navigation}) {
  const {email, userName, logOut, roles, addRolesContext} =
    useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [userToken, setUserToken] = useState('');
  const [dpImgName, setDpImgName] = useState('');
  const [dpImgFileType, setDpImgFileType] = useState('');
  const [dp, setDp] = useState('');
  const [dpModal, setDpModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addRoles, setAddRoles] = useState([]);
  const [fetchRoles, setFetchRoles] = useState([]);
  const [roleModal, setRoleModal] = useState(false);
  const [hideAddRole, setHideAddRole] = useState(false);
  const [logOutVisible, setLogOutVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [refresh, setRefresh] = useState(false); // Force UI update

  useEffect(() => {
    console.log('----------------------- New Render -------------------');
    fetchToken();
  }, []);

  const fetchCartCount = async () => {
    console.log(
      '----------------------- New Render useEffect cartcount-------------------',
    );
    console.log('User roles initially ' + roles);
    console.log('Cart count ' + cartCount);
    console.log('Roles for deleted and zero ' + roles);

    const token = await AsyncStorage.getItem('userToken');
    const id = await AsyncStorage.getItem('userId');

    try {
      const response = await axios.get(`${API_BASE_URL}api/cartCount/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartCount(response.data);
      setRefresh(prev => !prev); // force a re-render

      console.log('Response cart count ' + response.data);
    } catch (error) {
      console.log('Error fetching cart count:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCartCount();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchProductCount = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const id = await AsyncStorage.getItem('userId');
        try {
          const response = await axios.get(
            `${API_BASE_URL}api/productCount/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setProductCount(response.data);
        } catch (error) {
          console.log('Error fetching cart count:', error);
        }
      };

      fetchProductCount();
    }, []),
  );

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Profile');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup event listener on unmount
  }, [navigation]);

  // useEffect(() => {
  //   const fetchUserRoles = async () => {
  //     const token = await AsyncStorage.getItem('userToken');
  //     const id = await AsyncStorage.getItem('userId');
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}api/getRoles/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const roleNames = response.data.map(role => role.name);
  //       setFetchRoles(roleNames);

  //       console.log(' User Roles fetched@@@ ' + fetchRoles);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUserRoles();
  // }, []);

  useEffect(() => {
    if (dp) {
      updateImage();
    } else {
      uploadImage();
    }
  }, [selectedImage]);

  const getDP = useCallback(async token => {
    const response = await axios.get(`${API_BASE_URL}api/getDP/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(
      '------------------------ New Render----------------------------',
    );
    setDp(response.data);
  });

  // useEffect(() => {
  //   console.log('New roles added: ' + roles);
  // }, [roles]);

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
      if (token) {
        setUserToken(token);
        getDP(token);
      } else {
        console.log('Effor fetching token');
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const deleteProfilePhoto = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token);
      await axios.delete(`${API_BASE_URL}api/deleteDP/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('After deleting');
      setDeleteModal(false);
      setDp('');
    } catch (error) {
      console.log(error);
    }
  };

  const dpHandle = () => {
    setDpModal(true);
  };

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      if (image.didCancel) {
        console.log('Cancelled image upload');
      } else if (image.error) {
        console.log('Image picker error', image.error);
      } else {
        setSelectedImage(image.path);
        setDpImgName(image.filename);
        setDpImgFileType(image.mime);
      }
      setDpModal(false);
    });
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log('Camera permission denied');
      return;
    }

    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      });

      if (!image) {
        console.log('No image selected');
        return;
      }

      setSelectedImage(image.path);
      setDpImgName(image.filename || 'captured_image.jpg');
      setDpImgFileType(image.mime);

      setDpModal(false);
    } catch (error) {
      if (error.message.includes('User cancelled')) {
        console.log('User cancelled the camera');
      } else {
        console.log('Camera error:', error.message);
      }
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need access to your camera to take pictures',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
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
      dpModal(false);
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
      setSelectedImage('');
      setDpImgFileType('');
      setDpImgName('');
      Toast.show({
        type: 'success',
        text1: ' Profile photo updated successfully',
        position: 'top',
        visibilityTime: 2000,
      });
      dpModal(false);
    } catch (error) {
      console.log('Error inside update Function ' + error);
    }
  };

  const handleSelectedRoles = selectedRole => {
    console.log('You have selected @@@: ' + selectedRole);
    setAddRoles((prevRoles = []) => {
      return prevRoles.includes(selectedRole)
        ? prevRoles.filter(role => role !== selectedRole)
        : [...prevRoles, selectedRole];
    });
  };

  const handleSubmitRole = async () => {
    const roleData = {
      requestRole: addRoles,
    };
    try {
      const response = await axios.put(
        `${API_BASE_URL}api/addRoles/${userId}`,
        roleData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log('Roles before submitting ' + roles);
      if (response.data && response.data.responseRole) {
        const updatedRoles = response.data.responseRole.map(role => role.name);
        addRolesContext(updatedRoles);
        setRefresh(prev => !prev);
      }
      console.log('Roles After submitting ' + roles);
      Toast.show({
        type: 'success',
        text1: 'Role added successfully',
        position: 'top',
        visibilityTime: 3000,
      });
      setHideAddRole(true);
      console.log(
        ' This is response after addding roles @@@  ' + response.data,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    hideDialog();
    logOut();
  };

  const hideDialog = () => {
    setLogOutVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.profileStatusBar}>
              <Pressable
                style={{marginRight: 10}}
                onPress={() => navigation.navigate('Homestack')}>
                <Icon name="arrow-back" size={24} style={{color: '#333333'}} />
              </Pressable>
              <Text style={{color: '#333333', fontSize: 20}}>Profile</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Pressable
                onPress={() =>
                  navigation.navigate('Homestack', {screen: 'Settings'})
                }>
                <Icon name="settings" size={24} color="#666666" />
              </Pressable>
              <Pressable
                style={{paddingHorizontal: 10}}
                onPress={() => setLogOutVisible(true)}>
                <Icon name="logout" size={24} color="#666666" />
              </Pressable>
              <LogoutDialog
                visible={logOutVisible}
                onDismiss={() => setLogOutVisible(false)}
                onConfirm={handleLogout}
              />
            </View>
          </View>
          <View style={styles.headerMain}>
            <View style={styles.headerContent}>
              <View style={styles.profileDetail}>
                <Pressable onPress={dpHandle}>
                  {dp ? (
                    <Image
                      style={{height: 90, width: 90, borderRadius: 60}}
                      source={{
                        uri: dp,
                      }}
                    />
                  ) : (
                    <Icon name="person" size={60} color="#b3b3b3" />
                  )}
                </Pressable>
                <Text style={{fontSize: 20, fontWeight: 400, marginTop: 10}}>
                  {userName}
                </Text>
              </View>
              <View style={styles.profileStatus}>
                {roles.includes('FARMER') && (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ProfileStack', {
                        screen: 'ProductListed',
                      })
                    }>
                    >
                    <View style={styles.details}>
                      <Text style={styles.detailCount}>{productCount}</Text>
                      <Text style={styles.detailDesc}>Products</Text>
                    </View>
                  </Pressable>
                )}

                {roles.includes('BUYER') && (
                  <Pressable
                    style={styles.details}
                    onPress={() =>
                      navigation.navigate('ProfileStack', {screen: 'Cart'})
                    }>
                    <Text style={styles.detailCount}>{cartCount}</Text>
                    <Text style={styles.detailDesc}>Cart</Text>
                  </Pressable>
                )}
              </View>
              <View style={styles.editContainer}>
                <View style={styles.editContent}>
                  <Icon
                    name="task-alt"
                    size={20}
                    style={{marginHorizontal: 5}}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProfileStack', {screen: 'Details'})
                    }>
                    <Text style={{fontWeight: 'bold'}}>
                      Complete your profile
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.editContent}>
                  <Icon name="edit" size={20} style={{marginHorizontal: 5}} />
                  <TouchableOpacity>
                    <Text style={{fontWeight: 'bold'}}>Edit profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.profileDetailContent}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 700,
              color: '#666666',
              marginBottom: '7%',
            }}>
            Profile Detail
          </Text>
          <View style={styles.profileDetailItemContainer}>
            <Icon
              name="person"
              size={24}
              color="#66a3ff"
              style={styles.profileDetailItemIcon}
            />
            <View>
              <Text style={styles.profileDetailItemText01}>User Name</Text>
              <Text style={styles.profileDetailItemText02}>Chogyal</Text>
            </View>
          </View>
          <View style={styles.profileDetailItemContainer}>
            <Icon
              name="email"
              size={24}
              color="#66a3ff"
              style={styles.profileDetailItemIcon}
            />
            <View>
              <Text style={styles.profileDetailItemText01}>Email Address</Text>
              <Text style={styles.profileDetailItemText02}>
                Chogyal@gmail.com
              </Text>
            </View>
          </View>
          <View style={styles.profileDetailItemContainer}>
            <Icon
              name="phone"
              size={24}
              color="#66a3ff"
              style={styles.profileDetailItemIcon}
            />
            <View>
              <Text style={styles.profileDetailItemText01}>Phone Number</Text>
              <Text style={styles.profileDetailItemText02}>+97517482648</Text>
            </View>
          </View>
        </View>
        {roles.length === 1 && roles.includes('USER') && (
          <>
            <View style={styles.profileContent}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  alignItems: 'center',
                  position: 'relative',
                }}>
                <Text>Add role: </Text>
                <Pressable
                  onPress={() => setRoleModal(!roleModal)}
                  style={{position: 'relative'}}>
                  <Icon name="arrow-drop-down" size={28} />
                </Pressable>
              </View>
            </View>
            {addRoles.length !== 0 ? (
              <>
                <View style={styles.rolePreviewContainer}>
                  {addRoles.map(item => (
                    <Text style={styles.rolePreviewText}>{item}</Text>
                  ))}
                </View>
                <Pressable
                  onPress={handleSubmitRole}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: '12%',
                    right: '5%',
                  }}>
                  <Text
                    style={{
                      marginHorizontal: 5,
                      color: 'blue',
                      fontSize: 14,
                    }}>
                    Submit
                  </Text>

                  <Icon name="arrow-forward" size={16} color="blue" />
                </Pressable>
              </>
            ) : null}
          </>
        )}

        {/* *********************** Role Modal *********************** */}
        <Modal visible={roleModal} transparent={true} animationType="fade">
          <Pressable onPress={() => setRoleModal(false)} style={{flex: 1}}>
            <View style={styles.roleModalContainer}>
              <Pressable
                style={styles.roleContent}
                onPress={() => handleSelectedRoles('FARMER')}>
                <Text>Farmer</Text>
              </Pressable>
              <Pressable
                style={styles.roleContent}
                onPress={() => handleSelectedRoles('BUYER')}>
                <Text>Buyer</Text>
              </Pressable>
              <Pressable
                style={styles.roleContent}
                onPress={() => handleSelectedRoles('TRANSPORTER')}>
                <Text>Transporter</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

        {/* *********************** DP modal *********************** */}
        <Modal
          visible={dpModal}
          transparent={true}
          onRequestClose={() => setDpModal(false)}
          pointerEvents="box-none" // Ensures clicks are detected properly
        >
          <Pressable
            style={styles.dpModalContainer}
            onPress={() => setDpModal(false)}>
            <View style={styles.dpModalContent}>
              <View style={styles.dpModalHeading}>
                <Icon name="close" size={24} color="#666666" />
                <Text style={{fontSize: 18, color: '#666666'}}>
                  Profile photo
                </Text>
                <Pressable onPress={() => setDeleteModal(true)}>
                  <Icon name="delete" size={24} color="#666666" />
                </Pressable>
              </View>
              <View style={styles.dpModalBody}>
                <Pressable onPress={pickImage} style={{alignItems: 'center'}}>
                  <Icon
                    name="image"
                    size={24}
                    color="#248f24"
                    style={{margin: 5}}
                  />
                  <Text>Gallery</Text>
                </Pressable>
                <Pressable onPress={takePhoto} style={{alignItems: 'center'}}>
                  <Icon
                    name="camera"
                    size={24}
                    color="#248f24"
                    style={{margin: 5}}
                  />
                  <Text>Camera</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>

        {/* *********************** Delete Modal *********************** */}

        <Modal visible={deleteModal} transparent={true}>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setDeleteModal(false)}>
            <View style={styles.deleteModalContainer}>
              <View style={{flex: 1, justifyContent: 'center', fontSize: 18}}>
                <Text>Delete profile photo?</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Pressable onPress={() => setDeleteModal(false)}>
                  <Text style={{marginHorizontal: 20}}>Cancel</Text>
                </Pressable>
                <Pressable onPress={deleteProfilePhoto}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileHeader: {
    height: height * 0.4,
    width: '100%',
    alignItems: 'center',
  },
  profileStatusBar: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    alignItems: 'center',
    padding: 20,
  },
  headerMain: {
    flex: 4,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // marginHorizontal: 10,
    // borderBottomWidth: 0.5,
  },
  headerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    height: 90,
    width: 90,
    borderRadius: 70,
  },
  profileDetail: {
    marginTop: 10,
    alignItems: 'center',
  },
  profileStatus: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  details: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  detailCount: {
    fontSize: 16,
    fontWeight: '900',
  },
  detailDesc: {
    fontSize: 12,
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
    flex: 3,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '90%', // Adjust width as needed
    backgroundColor: '#fff',
    borderRadius: 20, // Rounded corners
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  closeButton: {
    alignSelf: 'flex-end', // Align to the top-right corner
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75, // Circular image
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75, // Circular placeholder
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadOptions: {
    width: '100%',
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff', // Blue background
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded corners
    marginBottom: 10,
    width: '80%',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  upload: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonTextIcon: {
    color: 'blue',
    fontSize: 16,
    marginLeft: 10,
  },
  dpModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  dpModalContent: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  dpModalHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  dpModalBody: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  deleteModalContainer: {
    width: '80%',
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 30,
  },
  roleModalContainer: {
    position: 'absolute',
    bottom: height * 0.08,
    left: '5%',
    backgroundColor: '#fff',
  },
  roleContent: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  rolePreviewContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '15%',
    right: '5%',
    padding: 5,
  },
  rolePreviewText: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 3,
  },
  profileDetailContent: {
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingTop: height * 0.02,
    borderColor: '#cccccc',
  },
  profileDetailItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '3%',
  },
  profileDetailItemText01: {
    fontSize: 16,
    fontWeight: 800,
    color: '#4d4d4d',
    marginHorizontal: '3%',
  },
  profileDetailItemText02: {
    fontSize: 14,
    fontWeight: 200,
    marginHorizontal: '3%',
    color: '#4d4d4d',
  },
  profileDetailItemIcon: {
    marginHorizontal: '2%',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cc5200',
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 25,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  editContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginVertical: '5%',
  },
  editContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
  },
});
