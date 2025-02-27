import React, {useState} from 'react';
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

const {width} = Dimensions.get('window');

const ProductDetail = ({route, navigation}) => {
  const {product} = route.params; // Product data passed from the product list
  const [more, setMore] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUshuJ5pq_Qn3RhB2FKXWNap5MYGl-JZZng&s',
          }}
          style={styles.productImage}
        />
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

          {more && (
            <View style={styles.moreDetail}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Harvest Date:</Text>
                <Text style={styles.detailValue}>2032/09/30</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Farmer Name:</Text>
                <Text style={styles.detailValue}>John Doe</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Farm Location:</Text>
                <Text style={styles.detailValue}>Bhutan Valley</Text>
              </View>
            </View>
          )}
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          <Icon name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Helper function to get status color
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
    backgroundColor: '#FF5722',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    elevation: 3,
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#fff',
  },
});

export default ProductDetail;
