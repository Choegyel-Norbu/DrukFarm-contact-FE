import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';

export default function OnboardingScreen({navigation}) {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: require('../../images/donate.png'),
      title: 'Welcome to Our App!',
      description: 'Explore amazing features tailored for you.',
    },
    {
      id: 2,
      image: require('../../images/chats.png'),
      title: 'Connect with People',
      description: 'Find and interact with people who share your interests.',
    },
    {
      id: 3,
      image: require('../../images/post.png'),
      title: 'Stay Organized',
      description: 'Track your progress and manage tasks effortlessly.',
    },
  ];

  return (
    <>
      <StatusBar backgroundColor="#3366ff" barStyle="light-content" />

      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}>
        <Swiper
          loop={false}
          index={index}
          onIndexChanged={setIndex}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}>
          {slides.map((slide, i) => (
            <View key={slide.id} style={styles.slide}>
              <Image source={slide.image} style={styles.image} />
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          ))}
        </Swiper>

        {/* Skip & Get Started Buttons */}
        <View style={styles.buttonContainer}>
          {index < slides.length - 1 ? (
            <TouchableOpacity onPress={() => navigation.replace('Auth')}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation.replace('Login')}>
              <Text style={styles.startText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 12,
    height: 12,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  startText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
