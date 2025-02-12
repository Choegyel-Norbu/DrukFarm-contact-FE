import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Iteration() {
  const anime = [
    {
      id: 1,
      name: 'Takeshi',
      meaning: 'Warrior! This is the meaning of in English',
      imageUrl:
        'https://imgcdn.stablediffusionweb.com/2024/9/10/ac23d215-6ece-4e4f-b37a-8b1e6003e5b8.jpg',
    },
    {
      id: 2,
      name: 'Ryuuji',
      meaning: 'Dragon! This is the meaning of in English',
      imageUrl:
        'https://image.made-in-china.com/202f0j00OHjoESKGSsqZ/Factory-Supply-Tokisaki-Kurumi-Date-a-Live-Japanese-Cartoon-Character-Figure-Wholesale-Japanese-Manga.webp',
    },
    {
      id: 3,
      name: 'Makoto',
      meaning: 'Sincerity! This is the meaning of in English',
      imageUrl:
        'https://www.shutterstock.com/shutterstock/photos/2240487203/display_1500/stock-vector-young-man-anime-style-character-vector-illustration-design-manga-anime-boy-black-hair-faces-2240487203.jpg',
    },
    {
      id: 4,
      name: 'Kaito',
      meaning: 'Ocean! This is the meaning of in English',
      imageUrl:
        'https://preview.redd.it/male-anime-characters-who-are-voiced-by-men-boys-in-the-v0-5x7tuev34vwc1.jpg?width=360&format=pjpg&auto=webp&s=801fcf91c177f436a1357c75c65f1fad41f5fd8c',
    },
    {
      id: 5,
      name: 'Haruto',
      meaning: 'Sunlight! This is the meaning of in English',
      imageUrl:
        'https://www.shutterstock.com/image-vector/vector-anime-characters-girl-japanese-260nw-1584114805.jpg',
    },
  ];

  return (
    <View style={styles.IterateContainer}>
      {anime.map(({id, name, meaning, imageUrl}) => (
        <View key={id} style={styles.listContainer}>
          <Image
            style={styles.listImage}
            source={{
              uri: imageUrl,
            }}
          />
          <View style={styles.listTextStyle}>
            <Text style={{fontSize: 16}}>{name}</Text>
            <Text style={{fontSize: 12}}>{meaning}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  IterateContainer: {
    height: 'auto',
    width: '100%',
    paddingLeft: 20,
    // backgroundColor: '#e6f7ff',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  listImage: {
    height: 50,
    width: 50,
    borderRadius: 60,
  },
  listTextStyle: {
    paddingLeft: 20,
  },
});
