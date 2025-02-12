import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function FancyCards() {
  return (
    <View>
      <Text>FancyCards</Text>
      <View style={styles.cardContainer}>
        <Image
          source={{
            uri: 'https://i.ytimg.com/vi/ul4Kz8o2rQY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLADFF6oOmCmnGIzPzw7HgbagA66mA',
          }}
          style={styles.imageStyle}
        />
        <Text style={styles.imageTitle}>Naruto Uzumaki</Text>
        <Text style={styles.imageLable}>
          Series: Naruto and Naruto: Shippuden
        </Text>
        <Text style={styles.imageDescription}>
          Naruto Uzumaki is the spirited, determined protagonist of the Naruto
          series. He starts as a mischievous and lonely boy in the ninja village
          of Konohagakure (Hidden Leaf Village), ostracized because he carries
          the Nine-Tailed Fox demon within him.{' '}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 'auto',
    width: 380,
    justifyContent: 'center',
    margin: 'auto',
    alignItems: 'center',
    backgroundColor: '#abdbe3',
  },
  imageStyle: {
    height: '200',
    width: '100%',
  },
  imageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageLable: {
    fontSize: 18,
  },
  imageDescription: {
    fontSize: 14,
    margin: 'auto',
  },
});
