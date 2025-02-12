import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export default function ImageCard({offerItems = {}}) {
  console.log('offerItems:', offerItems); // Debugging line
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{uri: offerItems.uri}} // Fallback URI
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{offerItems.name}</Text>
        <Text style={styles.cardDescription}>{offerItems.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 210,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 5,
    marginTop: 20,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    paddingBottom: 5,
    paddingLeft: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});
