import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../config';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function ProductListed({navigation}) {
  const [itemList, setItemList] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [userId, setUserId] = useState('');
  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchItemListed();
    }, []),
  );

  const fetchItemListed = async () => {
    console.log('Triggered focus effect');
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    const id = await AsyncStorage.getItem('userId');
    setUserId(id);
    console.log('User Token @@@ ' + token);
    console.log('User Id @@@ ' + id);
    try {
      const response = await axios.get(
        `${API_BASE_URL}api/getProduceForFarmer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data) {
        console.log(response.data);
        setItemList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = itemId => {
    Alert.alert('Edit' + itemId);
  };

  const handleRemove = useCallback(async itemId => {
    console.log('Product Id ' + itemId);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}api/deleteProduct/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log('Response status ' + response.status);
      if (response.status === 200) {
        setItemList(prevList => prevList.filter(item => item.id !== itemId));

        Toast.show({
          type: 'success',
          text1: 'Product deleted',
          position: 'top',
          visibilityTime: 2000,
        });
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 500) {
        Alert.alert(
          'Unable to Delete Product',
          'This product cannot be removed because it has already been added to a cart by a user.',
        );
        setVisible(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion Failed',
          text2:
            'An error occurred while deleting the product. Please try again later.',
          position: 'top',
          visibilityTime: 2000,
        });
      }
    }
  });

  const removeAction = itemId => {
    setProductId(itemId);
    setVisible(true);
  };

  const renderItemListed = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.details}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.date}>{item.createdAt}</Text>
        </View>
        <View style={styles.action}>
          <Pressable
            onPress={() =>
              navigation.navigate('ProductStack', {
                screen: 'ProductDetail',
                params: {product: item, flag: true}, // ✅ Fixed "params" key
              })
            }>
            <Text style={styles.edit}>Edit</Text>
          </Pressable>
          <Pressable onPress={() => removeAction(item.id)}>
            <Text style={styles.remove}>Remove</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={itemList}
          renderItem={renderItemListed}
          keyExtractor={item => item.id.toString()}
        />

        {/* *********************** DP modal *********************** */}
        <Modal
          visible={visible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setDpModal(false)}
          pointerEvents="box-none" // Ensures clicks are detected properly
        >
          <Pressable
            style={styles.modalContainer}
            onPress={() => setVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.message}>
                <Text>Do you want to delete this product from the list?</Text>
              </View>
              <View style={styles.removeAction}>
                <Pressable onPress={() => setVisible(false)}>
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable onPress={() => handleRemove(productId)}>
                  <Text>Remove</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>

        {/* <Modal visible={visible} transparent={true} animationType="slide">
          <Pressable
            style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
            onPress={() => setVisible(false)}>
            <View style={styles.modalOverlay}>
              <View></View>
            </View>
          </Pressable>
        </Modal> */}
      </View>
    </SafeAreaView>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10, // Add horizontal padding for better spacing
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%', // Use 100% width to fill the container
    padding: 10, // Single padding declaration
    borderWidth: 0.5,
    borderColor: '#cccccc',
    borderRadius: 10,
    marginBottom: 10, // Add marginBottom for spacing between items
    backgroundColor: '#f9f9f9', // Add a light background color for better visibility
  },
  details: {
    flex: 3,
    justifyContent: 'center', // Center content vertically
    paddingLeft: 20,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '500', // Font weight should be a string
  },
  date: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '300', // Font weight should be a string
    marginTop: 3,
    color: '#666', // Use a lighter color for the date
  },
  action: {
    borderLeftWidth: 0.5,
    paddingLeft: 10,
    borderColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center', // Center buttons horizontally
  },
  edit: {
    width: 80,
    backgroundColor: '#0099ff',
    paddingVertical: 5,
    color: '#fff',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 5, // Add spacing between Edit and Remove buttons
  },
  remove: {
    width: 80,
    textAlign: 'center',
    color: 'red',
    marginTop: 5,
  },
  modalOverlay: {
    height: height * 0.15,
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
});
