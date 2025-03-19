import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useCallback, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import API_BASE_URL from '../../config';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../custom/AuthContext';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';

export default function Detail() {
  const {email, roles} = useContext(AuthContext);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [farmerSave, setFarmerSave] = useState(false);
  const [transporterSave, setTransporterSave] = useState(false);
  const [buyerSave, setBuyerSave] = useState(false);

  const [farmerDetails, setFarmerDetails] = useState({
    farmName: '',
    farmSize: '',
    farmLocation: '',
  });

  const [error, setError] = useState({
    errorFarmName: false,
    errorFarmSize: false,
    errorLocation: false,
    errorBusinessName: false,
    errorVehicalType: false,
    errorVehicalCapacity: false,
    errorExperienceYear: false,
    errorBusinessType: false,
    errorBusinessLocation: false,
  });

  const [buyerDetails, setBuyerDetails] = useState({
    businessName: '',
    businessType: '',
    businessLocation: '',
  });

  const [transporterDetails, setTransporterDetails] = useState({
    vehicleType: '',
    vehicleCapacity: '',
    experienceYears: '',
  });

  const farmerValidate = () => {
    let valid = true;

    setError(prevError => ({
      ...prevError,
      errorFarmName: false,
      errorFarmSize: false,
      errorLocation: false,
    }));

    if (!farmerDetails.farmName.trim()) {
      setError(prevState => ({...prevState, errorFarmName: true}));
      valid = false;
    }
    if (!farmerDetails.farmSize.trim()) {
      setError(prevState => ({...prevState, errorFarmSize: true}));
      valid = false;
    }
    if (!farmerDetails.farmLocation.trim()) {
      setError(prevState => ({...prevState, errorLocation: true}));
      valid = false;
    }
    return valid;
  };

  const transporterValidate = () => {
    let valid = true;

    setError(prevError => ({
      ...prevError,
      errorVehicalType: false,
      errorVehicalCapacity: false,
      errorExperienceYear: false,
    }));

    if (!transporterDetails.vehicleCapacity.trim()) {
      setError(prevState => ({...prevState, errorVehicalCapacity: true}));
      valid = false;
    }
    if (!transporterDetails.vehicleType.trim()) {
      setError(prevState => ({...prevState, errorVehicalType: true}));
      valid = false;
    }
    if (!transporterDetails.experienceYears.trim()) {
      setError(prevState => ({...prevState, errorExperienceYear: true}));
      valid = false;
    }
    return valid;
  };

  const buyerValidate = () => {
    let valid = true;

    setError(prevError => ({
      ...prevError,
      errorBusinessType: false,
      errorBusinessLocation: false,
      errorBusinessName: false,
    }));

    if (!buyerDetails.businessName.trim()) {
      setError(prevState => ({...prevState, errorBusinessName: true}));
      valid = false;
    }
    if (!buyerDetails.businessType.trim()) {
      setError(prevState => ({...prevState, errorBusinessType: true}));
      valid = false;
    }
    if (!buyerDetails.businessLocation.trim()) {
      setError(prevState => ({...prevState, errorBusinessLocation: true}));
      valid = false;
    }
    return valid;
  };

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      const id = await AsyncStorage.getItem('userId');
      setToken(userToken);
      setUserId(id);
    };
    fetchToken();
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      console.log(
        '---------------- Render focusEffect details ---------------',
      );
      console.log('User roles @@@ ' + roles);

      return () => {
        console.log('Cleanup function executed on unmount or screen unfocus');
      };
    }, [roles]), // Add dependencies if needed
  );

  const handleFarmerSubmit = async () => {
    if (!farmerValidate()) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}api/addFarmerDetials/${email}`,
        farmerDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      if (response.data === 'Success') {
        Toast.show({
          type: 'success',
          text1: 'Farmer details saved successfully',
          position: 'top',
          visibilityTime: 3000,
        });
      }
      if (response.data === 'Failed') {
        Toast.show({
          type: 'error',
          text1: 'Farmer details already exist',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransporterSubmit = async () => {
    console.log('Transporter Submit handle render --------------------------');
    if (!transporterValidate()) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}api/addTransporterDetials/${email}`,
        transporterDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      if (response.data === 'Success') {
        Toast.show({
          type: 'success',
          text1: 'Transporter details saved successfully',
          position: 'top',
          visibilityTime: 3000,
        });
      }
      if (response.data === 'Failed') {
        Toast.show({
          type: 'error',
          text1: 'Transporter details already exist',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyerSubmit = async () => {
    console.log('Buyer Submit handle render --------------------------');

    if (!buyerValidate()) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}api/addBuyerDetials/${email}`,
        buyerDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      if (response.data === 'Success') {
        Toast.show({
          type: 'success',
          text1: 'Buyer details saved successfully',
          position: 'top',
          visibilityTime: 3000,
        });
      }
      if (response.data === 'Failed') {
        Toast.show({
          type: 'error',
          text1: 'Buyer details already exist',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use 'padding' for iOS, 'height' for Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust this value for iOS if needed
      >
        {roles.length === 1 ? (
          <>
            <Text>You must select role:</Text>
          </>
        ) : (
          <Text
            style={{
              fontSize: 16,
              color: '#333',
              fontWeight: '400',
              lineHeight: 24,
              marginTop: 10,
              marginBottom: 20,
              textAlign: 'left',
            }}>
            Please provide the relevant details based on the role you have
            selected: [{' '}
            {roles.map((role, index) => (
              <Text style={{color: 'blue', fontSize: 13}} key={index}>
                {role}
                {', '}
              </Text>
            ))}
            {''}]
          </Text>
        )}
        {/* ************************* Farmer Details ************************* */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer} // Ensure the ScrollView expands
        >
          {roles.includes('FARMER') &&
            (console.log('Rendering Farmer Details'), // Add this log
            (
              <>
                <View style={{}}>
                  <Text style={styles.title}>Farmer details:</Text>
                  <View style={styles.detailInputContainer}>
                    <View
                      style={[
                        styles.detailInputInnerContainer,
                        styles.topBorder,
                        error.errorFarmName && {
                          borderBottomColor: 'red',
                          borderBottomWidth: 1,
                        },
                      ]}>
                      <View style={styles.text}>
                        <Text>
                          Farm name: <Text style={{color: 'red'}}>*</Text>
                        </Text>
                      </View>
                      <View style={styles.inputs}>
                        <TextInput
                          value={farmerDetails.farmName}
                          onChangeText={text => {
                            setFarmerDetails({
                              ...farmerDetails,
                              farmName: text,
                            });
                            setFarmerSave(true);
                          }}
                          placeholder="Enter farm name"
                          style={styles.input}
                        />
                      </View>
                    </View>
                    <View
                      style={[
                        styles.detailInputInnerContainer,
                        error.errorFarmSize && {
                          borderBottomColor: 'red',
                          borderBottomWidth: 1,
                        },
                      ]}>
                      <View style={styles.text}>
                        <Text>
                          Farm size: <Text style={{color: 'red'}}>*</Text>
                        </Text>
                      </View>
                      <View style={styles.inputs}>
                        <TextInput
                          value={farmerDetails.farmSize}
                          onChangeText={text => {
                            setFarmerDetails({
                              ...farmerDetails,
                              farmSize: text,
                            });

                            setFarmerSave(true);
                          }}
                          placeholder="(e.g., large, medium, small)"
                        />
                      </View>
                    </View>
                    <View
                      style={[
                        styles.detailInputInnerContainer,
                        styles.bottomBorder,
                        error.errorLocation && {
                          borderBottomColor: 'red',
                          borderBottomWidth: 1,
                        },
                      ]}>
                      <View style={styles.text}>
                        <Text>
                          Farm location: <Text style={{color: 'red'}}>*</Text>
                        </Text>
                      </View>
                      <View style={styles.inputs}>
                        <TextInput
                          value={farmerDetails.farmLocation}
                          onChangeText={text => {
                            setFarmerDetails({
                              ...farmerDetails,
                              farmLocation: text,
                            });
                            setFarmerSave(true);
                          }}
                          placeholder="Enter your farm location"
                        />
                      </View>
                    </View>
                  </View>
                  {farmerSave && (
                    <TouchableOpacity
                      onPress={handleFarmerSubmit}
                      style={{
                        padding: 5,
                        backgroundColor: '#3399ff',
                        borderRadius: 20,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '30%',
                        marginBottom: '1%',
                      }}>
                      <Icon name="save" size={20} color="#fff" />
                      <Text style={{color: '#fff'}}>Save</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ))}

          {/* ************************* Transporter Details ************************* */}
          {roles.includes('TRANSPORTER') && (
            <>
              <View>
                <Text style={styles.title}>Transporter details:</Text>
                <View style={styles.detailInputContainer}>
                  <View
                    style={[
                      styles.detailInputInnerContainer,
                      styles.topBorder,
                      error.errorVehicalType && {
                        borderBottomColor: 'red',
                        borderBottomWidth: 1,
                      },
                    ]}>
                    <View style={styles.text}>
                      <Text>
                        Vehicle type: <Text style={{color: 'red'}}>*</Text>
                      </Text>
                    </View>
                    <View style={styles.inputs}>
                      <TextInput
                        value={transporterDetails.vehicleType}
                        onChangeText={text => {
                          setTransporterDetails({
                            ...transporterDetails,
                            vehicleType: text,
                          });
                          setTransporterSave(true);
                        }}
                        placeholder="(e.g., Heavy, Medium)"
                        style={styles.input}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.detailInputInnerContainer,
                      error.errorVehicalCapacity && {
                        borderBottomColor: 'red',
                        borderBottomWidth: 1,
                      },
                    ]}>
                    <View style={styles.text}>
                      <Text>
                        Vehicle capacity: <Text style={{color: 'red'}}>*</Text>
                      </Text>
                    </View>
                    <View style={styles.inputs}>
                      <TextInput
                        value={transporterDetails.vehicleCapacity}
                        onChangeText={text => {
                          setTransporterDetails({
                            ...transporterDetails,
                            vehicleCapacity: text,
                          });
                          setTransporterSave(true);
                        }}
                        placeholder="(e.g., in tons)"
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.detailInputInnerContainer,
                      styles.bottomBorder,
                      error.errorExperienceYear && {
                        borderBottomColor: 'red',
                        borderBottomWidth: 1,
                      },
                    ]}>
                    <View style={styles.text}>
                      <Text>
                        Experience year: <Text style={{color: 'red'}}>*</Text>
                      </Text>
                    </View>
                    <View style={styles.inputs}>
                      <TextInput
                        value={transporterDetails.experienceYears}
                        onChangeText={text => {
                          setTransporterDetails({
                            ...transporterDetails,
                            experienceYears: text,
                          });
                          setTransporterSave(true);
                        }}
                        placeholder="Enter years of experience"
                      />
                    </View>
                  </View>
                </View>
                {transporterSave && (
                  <TouchableOpacity
                    onPress={handleTransporterSubmit}
                    style={{
                      padding: 5,
                      backgroundColor: '#3399ff',
                      borderRadius: 20,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '30%',
                      marginBottom: '1%', // Add marginBottom here
                    }}>
                    <Icon name="save" size={20} color="#fff" />
                    <Text style={{color: '#fff'}}>Save</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}

          {/* ************************* Buyer Details ************************* */}
          {roles.includes('BUYER') && (
            <>
              <View>
                <Text style={styles.title}>Buyer details:</Text>
                <View style={styles.detailInputContainer}>
                  <View
                    style={[
                      styles.detailInputInnerContainer,
                      styles.topBorder,
                      error.errorBusinessName && {
                        borderBottomColor: 'red',
                        borderBottomWidth: 1,
                      },
                    ]}>
                    <View style={styles.text}>
                      <Text>
                        Name of business: <Text style={{color: 'red'}}>*</Text>
                      </Text>
                    </View>
                    <View style={styles.inputs}>
                      <TextInput
                        value={buyerDetails.businessName}
                        onChangeText={text => {
                          setBuyerDetails({
                            ...buyerDetails,
                            businessName: text,
                          });
                          setBuyerSave(true);
                        }}
                        placeholder="Enter your business name"
                        style={styles.input}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.detailInputInnerContainer,
                      error.errorBusinessType && {
                        borderBottomColor: 'red',
                        borderBottomWidth: 1,
                      },
                    ]}>
                    <View style={styles.text}>
                      <Text>
                        Business Type: <Text style={{color: 'red'}}>*</Text>
                      </Text>
                    </View>
                    <View style={styles.inputs}>
                      <TextInput
                        value={buyerDetails.businessType}
                        onChangeText={text => {
                          setBuyerDetails({
                            ...buyerDetails,
                            businessType: text,
                          });
                          setBuyerSave(true);
                        }}
                        placeholder="Enter type of your business"
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.detailInputInnerContainer,
                      styles.bottomBorder,
                      error.errorBusinessLocation && {
                        borderBottomColor: 'red',
                        borderBottomWidth: 1,
                      },
                    ]}>
                    <View style={styles.text}>
                      <Text>
                        Business Location: <Text style={{color: 'red'}}>*</Text>
                      </Text>
                    </View>
                    <View style={styles.inputs}>
                      <TextInput
                        value={buyerDetails.businessLocation}
                        onChangeText={text => {
                          setBuyerDetails({
                            ...buyerDetails,
                            businessLocation: text,
                          });
                          setBuyerSave(true);
                        }}
                        placeholder="Location of your business"
                      />
                    </View>
                  </View>
                </View>
                {buyerSave && (
                  <TouchableOpacity
                    onPress={handleBuyerSubmit}
                    style={{
                      padding: 5,
                      backgroundColor: '#3399ff',
                      borderRadius: 20,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '30%',
                      marginBottom: '1%',
                    }}>
                    <Icon name="save" size={20} color="#fff" />
                    <Text style={{color: '#fff'}}>Save</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// const getColor = status => {
//     switch (status) {
//       case 'Available':
//         return '#009900'; // Green
//       case 'Out of stock':
//         return '#FF9800'; // Orange
//       default:
//         return '#9E9E9E'; // Gray
//     }
//   };

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1, // Ensure the ScrollView expands
  },
  title: {
    alignSelf: 'flex-start',
    width: '90%',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  detailInputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  detailInputInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  topBorder: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopWidth: 0.5,
  },
  bottomBorder: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    width: '45%',
    paddingHorizontal: 10,
  },
  inputs: {
    width: '60%',
  },
  input: {
    borderRadius: 30,
  },
  roleModalContainer: {
    position: 'absolute',
    top: '13%',
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
    top: '9%',
    right: 0,
    padding: 5,
  },
  rolePreviewText: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 3,
  },
});
