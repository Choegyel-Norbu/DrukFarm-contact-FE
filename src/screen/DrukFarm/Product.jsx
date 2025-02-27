import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  RefreshControl,
  Platform,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API_BASE_URL from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ActivityIndicator} from 'react-native-paper';

const QgOptions = ['Organic', 'Standard'];
const CtOptions = ['Organic', 'Hydroponic', 'Greenhouse'];
const categoryOption = ['Vegetable', 'Dairy', 'Fruit'];

const Product = ({navigation}) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isCtDropDown, setIsCtDropDown] = useState(false);
  const [categoryDropDown, setCategoryDropDown] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [dateError, setDateError] = useState('');
  const [userId, setUserId] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [produceList, setProduceList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [imagePreviewURI, setImagePreviewURI] = useState('');
  const [search, setSearch] = useState('');
  const [searchRefresh, setSearchRefresh] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    fetchId();
    fetchToken();
  }, []);

  const fetchProduceList = async token => {
    setIsloading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}api/getProduces`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduceList(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsloading(false);
    }
  };

  const fetchId = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        setUserId(id);
      }
    } catch (error) {
      console.error('Error fetching userId:', error);
    }
  };

  const reset = () => {
    setProduceDetail({
      category: '',
      name: '',
      pricePerUnit: '',
      quantity: '',
      harvestDate: '',
      cultivationMethod: '',
      shelfLife: '',
      animalType: '',
      packagingType: '',
      ripeNessLevel: '',
      delivery: '',
    });
    setModalVisibility(false);
    setIsCategorySelected(false);
    setCategoryDropDown(false);
  };

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
        fetchProduceList(token);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const [produceDetail, setProduceDetail] = useState({
    category: '',
    name: '',
    pricePerUnit: '',
    quantity: '',
    harvestDate: '',
    cultivationMethod: '',
    shelfLife: '',
    animalType: '',
    packagingType: '',
    ripeNessLevel: '',
    delivery: '',
  });

  const handleCtOptionSelected = item => {
    setProduceDetail(prevState => ({
      ...prevState,
      cultivationMethod: item,
    }));
    setIsCtDropDown(false);
  };

  const handleDatePick = selected => {
    const now = new Date();
    if (selected > now) {
      setDateError('Date cannot be in the future!');
      setProduceDetail({...produceDetail, harvestDate: ''});
    } else {
      setDateError('');
      setProduceDetail(prevState => ({
        ...prevState,
        harvestDate: selected.toISOString().split('T')[0],
      }));
    }
    setDateOpen(false);
  };

  const dismissModal = () => {
    reset();
    setDateError(false);
  };

  const selectedCategory = selected => {
    setIsCategorySelected(true);
    setProduceDetail(prevState => ({
      ...prevState,
      category: selected,
    }));
  };

  const submit = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/addProduce/${userId}`,
        produceDetail,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Product added successfully',
        position: 'top',
        visibilityTime: 3000,
      });
      setModalVisibility(false);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  const chooseGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => handleResponse(response),
    );
    setIsSelectedImage(true);
  };

  const chooseCamera = () => {
    launchCamera({mediaType: 'photo', quality: 1}, response =>
      handleResponse(response),
    );
  };

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('Cancelled image upload');
    } else if (response.errorCode) {
      console.log('Image picker error', response.errorCode);
    } else {
      const image = response.assets[0].uri;
      setImagePreviewURI(image);
    }
  };

  const uploadCancel = () => {
    setIsSelectedImage(false);
    setVisible(false);
    setImagePreviewURI('');
  };
  const uploadSucces = () => {
    setIsSelectedImage(false);
    setVisible(false);
    setImagePreviewURI('');
  };

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', {product: item})}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          Nu. {item.pricePerUnit} per unit
        </Text>
        <View style={styles.availabilityContainer}>
          <View
            style={[
              styles.availabilityIndicator,
              {
                backgroundColor: item.available ? '#4CAF50' : '#FF9800',
              },
            ]}
          />
          <Text style={styles.productAvailability}>
            {item.available ? 'Available' : 'Out of Stock'}
          </Text>
        </View>
      </View>
      <Icon name="chevron-right" size={24} color="#1a75ff" />
    </TouchableOpacity>
  );

  const setRefresh = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem('userToken');
      await fetchProduceList(token);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      setSearch('');
      setSearchError('');
    }
  };

  const handleProductImageUpload = () => {
    setVisible(true);
  };

  const searchProduct = async () => {
    console.log('Empty press @@@= ' + search);
    setSearchRefresh(true);

    if (search === '') {
      fetchProduceList(userToken);
      setSearchRefresh(false);
      setSearchError('');
    } else {
      console.log('Inside else inside not null ');
      const response = await axios.get(
        `${API_BASE_URL}api/serchProduce/${search}/0/10`,
        {headers: {Authorization: `Bearer ${userToken}`}},
      );
      console.log('Response data @@@ = ' + response.data);
      if (response.status === 204) {
        console.log('There are no search results');
        setSearchRefresh(false);
        setProduceList([]);
        setSearchError('No result found for this keyword!');
      } else {
        setProduceList(response.data);
        setSearchRefresh(false);
        setSearchError('');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Farmers Market</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            value={search}
            onChangeText={text => {
              setSearch(text);
              if (text.trim === '') {
                fetchProduceList(userToken);
              }
            }}
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
          />
          <Pressable onPress={searchProduct} style={{padding: 10}}>
            <Icon name="search" size={20} color="#999" />
          </Pressable>
        </View>
        {searchError ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>{searchError}</Text>
          </View>
        ) : null}

        {/* Product List */}
        {searchRefresh ? (
          <ActivityIndicator size="large" color="#00b8e6" />
        ) : (
          <FlatList
            data={produceList}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.productList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={setRefresh} />
            }
          />
        )}

        {/* Floating Action Button (FAB) */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisibility(true)}>
          <Icon name="add" size={30} color="#FFF" />
        </TouchableOpacity>

        {/* Add Product Modal */}
        <Modal
          visible={modalVisibility}
          onModalHide={() => setModalVisibility(false)}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisibility(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Add Product: {produceDetail.category}
              </Text>
              {!isCategorySelected ? (
                <View style={styles.dropDownContainer}>
                  <Pressable
                    onPress={() => setCategoryDropDown(!categoryDropDown)}>
                    <View style={styles.dropDownInputContainer}>
                      <TextInput
                        value={produceDetail.category}
                        placeholder="Select category"
                        editable={false}
                      />
                      <Pressable
                        onPress={() => setCategoryDropDown(!categoryDropDown)}>
                        {categoryDropDown ? (
                          <Icon
                            name="keyboard-arrow-up"
                            size={28}
                            color="#999999"
                          />
                        ) : (
                          <Icon
                            name="keyboard-arrow-down"
                            size={28}
                            color="#999999"
                          />
                        )}
                      </Pressable>
                    </View>
                  </Pressable>
                  {categoryDropDown && (
                    <View style={styles.dropDownCategory}>
                      <FlatList
                        data={categoryOption}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            style={styles.option}
                            onPress={() => selectedCategory(item)}>
                            <Text style={styles.optionText}>{item}</Text>
                          </TouchableOpacity>
                        )}
                        keyboardShouldPersistTaps="handled"
                      />
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      paddingVertical: 20,
                    }}>
                    <Pressable onPress={dismissModal}>
                      <Text style={[styles.modalActionText, styles.modalClose]}>
                        Close
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View style={styles.modalInputContainer}>
                  <TextInput
                    value={produceDetail.name}
                    onChangeText={text =>
                      setProduceDetail({...produceDetail, name: text})
                    }
                    placeholder="Product"
                    style={styles.inputContainer}
                  />
                  <TextInput
                    value={produceDetail.pricePerUnit}
                    onChangeText={text =>
                      setProduceDetail({
                        ...produceDetail,
                        pricePerUnit: text,
                      })
                    }
                    placeholder="Price/unit"
                    style={styles.inputContainer}
                    keyboardType="numeric"
                  />
                  <TextInput
                    value={produceDetail.quantity}
                    onChangeText={text =>
                      setProduceDetail({...produceDetail, quantity: text})
                    }
                    placeholder="Quantity available"
                    style={styles.inputContainer}
                    keyboardType="numeric"
                  />

                  {dateError ? (
                    <Text style={{color: 'red', marginTop: 5}}>
                      {dateError}
                    </Text>
                  ) : null}
                  {(produceDetail.category === 'Vegetable' ||
                    produceDetail.category === 'Fruit') && (
                    <>
                      <Pressable onPress={() => setDateOpen(true)}>
                        <TextInput
                          value={produceDetail.harvestDate}
                          editable={false}
                          placeholder="Harvest date"
                          style={styles.inputContainer}
                        />
                      </Pressable>

                      <DatePicker
                        modal
                        open={dateOpen}
                        date={date}
                        mode="date"
                        onConfirm={selected => handleDatePick(selected)}
                        onCancel={() => setDateOpen(false)}
                      />
                    </>
                  )}

                  {(produceDetail.category === 'Vegetable' ||
                    produceDetail.category === 'Fruit') && (
                    <View style={styles.dropDownContainer}>
                      <Pressable onPress={() => setIsCtDropDown(!isCtDropDown)}>
                        <View style={styles.dropDownInputContainer}>
                          <TextInput
                            value={produceDetail.cultivationMethod}
                            placeholder="Cultivation method"
                            editable={false}
                          />
                          <Pressable
                            onPress={() => setIsCtDropDown(!isCtDropDown)}>
                            {isCtDropDown ? (
                              <Icon
                                name="keyboard-arrow-up"
                                size={28}
                                color="#999999"
                              />
                            ) : (
                              <Icon
                                name="keyboard-arrow-down"
                                size={28}
                                color="#999999"
                              />
                            )}
                          </Pressable>
                        </View>
                      </Pressable>
                      {isCtDropDown && (
                        <View style={styles.dropDown}>
                          <FlatList
                            data={CtOptions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => (
                              <TouchableOpacity
                                style={styles.option}
                                onPress={() => handleCtOptionSelected(item)}>
                                <Text style={styles.optionText}>{item}</Text>
                              </TouchableOpacity>
                            )}
                            keyboardShouldPersistTaps="handled"
                          />
                        </View>
                      )}
                    </View>
                  )}

                  <TextInput
                    value={produceDetail.shelfLife}
                    onChangeText={text =>
                      setProduceDetail({...produceDetail, shelfLife: text})
                    }
                    placeholder="Shelf life (ex: 1 week)"
                    style={styles.inputContainer}
                  />

                  {produceDetail.category === 'Dairy' && (
                    <TextInput
                      value={produceDetail.animalType}
                      onChangeText={text =>
                        setProduceDetail({
                          ...produceDetail,
                          animalType: text,
                        })
                      }
                      placeholder="AnimalSource"
                      style={styles.inputContainer}
                    />
                  )}

                  <TextInput
                    value={produceDetail.delivery}
                    onChangeText={text =>
                      setProduceDetail({...produceDetail, delivery: text})
                    }
                    placeholder="Delivery"
                    style={styles.inputContainer}
                  />

                  <TouchableOpacity
                    onPress={handleProductImageUpload}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 20,
                    }}>
                    <Icon name="image" size={26} color="blue" />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#808080',
                        marginLeft: 10,
                      }}>
                      Add Image
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      paddingVertical: 20,
                    }}>
                    <Pressable
                      onPress={() => {
                        setIsCategorySelected(false);
                        setCategoryDropDown(false);
                      }}>
                      <Icon name="arrow-back" size={25} color="#808080" />
                    </Pressable>
                    <Pressable onPress={dismissModal}>
                      <Text style={[styles.modalActionText, styles.modalClose]}>
                        Close Modal
                      </Text>
                    </Pressable>
                    <Pressable onPress={submit}>
                      <Text style={styles.modalActionText}>Submit</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>

        {/* ************************************************************  */}
        <Modal
          visible={visible}
          transparent={true} // Make the modal background transparent
          animationType="slide" // Add slide animation
          onRequestClose={() => setVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {!isSelectedImage ? (
                <>
                  <Pressable onPress={chooseGallery} style={styles.modalUpload}>
                    <View style={styles.modalUploadImage}>
                      <Icon name="image" size={18} />
                    </View>
                    <Text style={styles.modalUploadText}>
                      Choose from gallery
                    </Text>
                  </Pressable>
                  <Pressable style={styles.modalUpload} onPress={chooseCamera}>
                    <Icon
                      name="camera"
                      size={18}
                      style={styles.modalUploadImage}
                    />
                    <Text style={styles.modalUploadText}>Choose camera</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <View style={styles.imagePreviewContainer}>
                    <Image
                      source={{
                        uri: imagePreviewURI,
                      }}
                      style={styles.previewImage}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent: 'space-between',
                        width: '100%',
                      }}>
                      <Pressable
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={uploadSucces}>
                        <Icon
                          name="upload"
                          style={[styles.previewIcon, {color: '#33cc33'}]}
                          size={24}
                        />
                        <Text style={{color: '#33cc33'}}>Upload </Text>
                      </Pressable>

                      <Pressable
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={uploadCancel}>
                        <Icon
                          name="close"
                          style={[styles.previewIcon, {color: 'red'}]}
                          size={24}
                        />
                        <Text style={{color: 'red'}}>Cancel</Text>
                      </Pressable>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
        {/* ************************************************************  */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#1a75ff',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  productList: {
    paddingHorizontal: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#1a75ff',
    fontWeight: '500',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  productAvailability: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1a75ff',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalUpload: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalUploadImage: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: '#cccccc',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  modalUploadText: {
    fontSize: 16,
    fontWeight: 800,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalActionText: {
    fontSize: 16,
    color: '#1a75ff',
    textAlign: 'center',
  },
  modalClose: {
    marginHorizontal: 20,
  },
  dropDownContainer: {
    position: 'relative',
    width: '100%',
  },
  dropDownInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#999999',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginVertical: 2,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#999999',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 2,
  },
  dropDown: {
    position: 'absolute',
    top: 41,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    borderColor: '#999999',
    borderRadius: 8,
    marginTop: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1,
  },
  dropDownCategory: {
    position: 'absolute',
    bottom: 113,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    borderColor: '#999999',
    borderRadius: 8,
    marginTop: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1,
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  imagePreviewContainer: {
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    height: 150,
    width: 300,
    elevation: 4,
    marginBottom: 15,
  },
  previewIcon: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  previewText: {},
});

export default Product;
