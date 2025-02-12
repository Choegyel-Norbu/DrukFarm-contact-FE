import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';

export default function ActionCard() {
  const openUrl = url => {
    Linking.openURL(url);
  };

  return (
    <View>
      <Text
        style={{margin: 10, fontSize: 20, fontWeight: 'bold'}}
        numberOfLines={4}>
        Japanese Anime
      </Text>
      <View>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={{marginLeft: 5, fontSize: 10, color: '#ffffff'}}>
              Relatable challenges and motivations.
            </Text>
          </View>
          <View style={styles.cardBody}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5PlU-1f4XXz3Y1EzdyeiNImWmVn-qQhOR1g&s',
              }}
              style={{height: '200', width: '100%'}}
            />
            <Text style={{color: '#ffffff', margin: 5, fontSize: 12}}>
              Japanese animation, commonly known as anime, features a diverse
              range of characters that embody unique traits, personalities, and
              aesthetics. Anime characters are celebrated globally for their
              depth, visual appeal, and the cultural values they often
              represent. Here's an overview:
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <CustomButton
              title="Read more"
              style={{color: '#fffff'}}
              // onPress={openUrl(
              //   'https://www.wallpaperflare.com/animated-character-wallpaper-edm-music-headphones-music-festival-wallpaper-sjdp',
              // )}
              onPress={() =>
                openUrl(
                  'https://www.wallpaperflare.com/animated-character-wallpaper-edm-music-headphones-music-festival-wallpaper-sjdp',
                )
              }
            />
            <CustomButton
              title="Follow me"
              style={{color: '#fffff'}}
              onPress={() =>
                openUrl(
                  'https://www.google.com/search?q=edm+animations+male&sca_esv=690aa80fa67a51a6&udm=2&biw=1200&bih=678&sxsrf=ADLYWIIUSvb94E0mou8kN3qElYVIov8q9w%3A1737090691137&ei=g-aJZ7aPCJmdseMPyqGm6Aw&ved=0ahUKEwj23NmM__uKAxWZTmwGHcqQCc0Q4dUDCBE&uact=5&oq=edm+animations+male&gs_lp=EgNpbWciE2VkbSBhbmltYXRpb25zIG1hbGVI7w9Q9wNYsQ5wAXgAkAEAmAH2AaAByAaqAQUwLjIuMrgBA8gBAPgBAZgCAqACwgHCAgQQABgemAMAiAYBkgcDMS4xoAfNAQ&sclient=img#vhid=2F-7CnYD-ePttM&vssid=mosaic',
                )
              }
            />
          </View>
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() =>
          openUrl(
            'https://www.facebook.com/tashiiwangmo.niidup.7?mibextid=ZbWKwL',
          )
        }
        style={styles.linkStyle}>
        <Text>LOVE</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  linkStyle: {
    margin: 10,
  },
  cardContainer: {
    flex: 1,
    height: 'auto',
    width: '90%',
    margin: 'auto',
    backgroundColor: '#1e81b0',
  },
  cardHeader: {
    padding: 5,
    marginBottom: 3,
  },
  cardBody: {
    paddingBottom: 10,
  },
  cardFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
});
