import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API_BASE_URL from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../custom/AuthContext';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('window');

const ProductDetail = ({route, navigation}) => {
  const {product} = route.params;
  const {flag} = route.params;
  const [more, setMore] = useState(false);
  const [details, setDetails] = useState({});
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');

  const productStatus = ['Available', 'Out of stock'];

  useEffect(() => {
    const getUser = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
      const userToken = await AsyncStorage.getItem('userToken');
      setToken(userToken);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      if (!userId || !token) {
        console.log('Missing userId or token');
        return;
      }

      try {
        console.log('Inside try;');
        const {data} = await axios.get(
          `${API_BASE_URL}api/getProdDetalFarmerDetail/${product.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFarmerDetails();
  }, [more]);

  const addToCart = async () => {
    let quantity = 1;
    console.log('User Token inside cart@@@ ' + token);
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/addToCart/${userId}/${product.id}/${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data === 'Added to cart') {
        Toast.show({
          type: 'success',
          text1: 'Successfully added to cart',
          position: 'top',
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed adding to cart!',
          position: 'top',
          visibilityTime: 3000,
        });
      }
      console.log('Response cart @@@ ' + response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        {product.url?.length !== 0 ? (
          <Image
            source={{
              uri: product.url[0],
            }}
            style={styles.productImage}
          />
        ) : (
          <Image
            style={styles.productImage}
            source={{
              uri: 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=',
            }}
          />
        )}
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        {/* Product Name and Status */}
        <View style={styles.descContainer}>
          <View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.price}>Nu {product.pricePerUnit} per unit</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statusText,
                {color: getStatusColor(product.status)},
              ]}>
              {product.status}
            </Text>
          </View>
        </View>

        {/* More Details Section */}
        <View style={styles.moreSection}>
          {!flag && (
            <Pressable onPress={() => setMore(!more)} style={styles.moreButton}>
              <Text style={styles.moreButtonText}>
                {more ? 'Hide Details' : 'View More Details'}
              </Text>
              <Icon
                name={more ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={24}
                color="#666666"
              />
            </Pressable>
          )}

          {more && (
            <View style={styles.moreDetail}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Farmer Name:</Text>
                <Text style={styles.detailValue}>{details.farmerName}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Farm name:</Text>
                <Text style={styles.detailValue}>{details.farmName}</Text>
              </View>

              {/* <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Farm Location:</Text>
                <Text style={styles.detailValue}>{details.}</Text>
              </View> */}

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Farm size:</Text>
                <Text style={styles.detailValue}>{details.farmSize}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Quantity:</Text>
                <Text style={styles.detailValue}>{details.quantity}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Harvest Date:</Text>
                <Text style={styles.detailValue}>{details.harvestDate}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Delivery:</Text>
                <Text style={styles.detailValue}>
                  {details.delivery ? details.delivery : '-'}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Add to Cart Button */}
        {flag ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() =>
              navigation.navigate('ProduceEdit', {editProduct: product})
            }>
            <Text style={styles.addToCartButtonText}>Edit items</Text>
            <Icon name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            <Icon name="shopping-cart" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const getStatusColor = status => {
  switch (status) {
    case 'Available':
      return '#009900'; // Green
    case 'Out of stock':
      return '#FF9800'; // Orange
    default:
      return '#9E9E9E'; // Gray
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  productImage: {
    width: '90%',
    height: width * 0.5,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    padding: 20,
  },
  descContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#FF5722',
    marginTop: 5,
  },
  statusContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  moreSection: {
    marginTop: 10,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  moreButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  moreDetail: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#3399ff',
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 30,
    elevation: 3,
  },
  addToCartButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#fff',
  },
});

export default ProductDetail;
