import React, {useState, useContext} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Menu, Appbar, TextInput} from 'react-native-paper';
import {AuthContext} from '../../custom/AuthContext';
import LogoutDialog from '../../custom/LogoutDialog';

const {width} = Dimensions.get('window');

export default function HomeScr({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const {logOut} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [logOutDialogVisible, setLogOutDialogVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [businessName, setBussinsessName] = useState('');

  const showLogOutDialog = () => {
    setLogOutDialogVisible(true);
    closeMenu();
  };

  const hideDialog = () => {
    setLogOutDialogVisible(false);
    closeMenu();
  };

  const handleLogout = () => {
    hideDialog();
    logOut();
  };

  const handleSettings = () => {
    console.log('Settings pressed');
    closeMenu();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const features = [
    {
      id: 1,
      title: 'Post',
      icon: require('../../images/post.png'),
      onPress: () => navigation.navigate('PRdetails'),
    },
    {
      id: 2,
      title: 'Donate',
      icon: require('../../images/donate.png'),
      onPress: () => navigation.navigate('HRlisting'),
    },
    {
      id: 3,
      title: 'Chat',
      icon: require('../../images/chats.png'),
      onPress: () => Alert.alert('Chat Feature Coming Soon!'),
    },
    {
      id: 4,
      title: 'PR',
      icon: require('../../images/post2.png'),
      onPress: () => Alert.alert('PR Feature Coming Soon!'),
    },
  ];

  const renderFeatureCard = ({item}) => (
    <TouchableOpacity style={styles.featureCard} onPress={item.onPress}>
      <Image source={item.icon} style={styles.featureIcon} />
      <Text style={styles.featureTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3399ff" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Icon name="more-vert" onPress={openMenu} color="#fff" size={30} />
          }
          contentStyle={styles.menuContent}>
          <Menu.Item
            onPress={handleSettings}
            title="Settings"
            titleStyle={styles.menuItemText}
            icon={() => <Icon name="cog" size={20} color="#333" />}
          />
          <Menu.Item onPress={showLogOutDialog} title="Logout" />
          <Menu.Item onPress={() => {}} title="Help" />
          <Menu.Item onPress={() => {}} title="About" />
        </Menu>
        <LogoutDialog
          visible={logOutDialogVisible}
          onDismiss={hideDialog}
          onConfirm={handleLogout}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Horizontal Scroll Section */}
        <View style={styles.horizontalScrollContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.listContainer}>
              <View style={styles.listContent}>
                <Icon
                  name="circle"
                  size={10}
                  color="green"
                  style={styles.circleStyle}
                />
                <View style={styles.cardContent}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: 'https://media.gettyimages.com/id/1367696088/photo/fresh-sliced-mango-isolated-on-white-background.jpg?s=612x612&w=gi&k=20&c=ZLTaWVPiq7DNkFWZA79Ii8V9iBywc4_q6CKz1F0nEwA=',
                    }}
                  />
                  <Text style={styles.cardContentName}>Mango</Text>
                  <Text style={styles.cardContentPrice}>Nu. 30 /unit</Text>
                  <TouchableOpacity>
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.listContent}>
                <Icon
                  name="circle"
                  size={10}
                  color="green"
                  style={styles.circleStyle}
                />
                <View style={styles.cardContent}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: 'https://m.media-amazon.com/images/I/61kCjpQeKRL._AC_UF1000,1000_QL80_.jpg',
                    }}
                  />
                  <Text style={styles.cardContentName}>Cabbage</Text>
                  <Text style={styles.cardContentPrice}>Nu. 30 /unit</Text>
                  <TouchableOpacity>
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Empty Card for Odd Number of Items */}
              <View style={[styles.listContent, styles.emptyCard]}></View>
            </View>
          </ScrollView>
          <Text style={styles.viewMoreText}>View more...</Text>
        </View>

        <View>
          <Text>Choose role</Text>
        </View>
        <View>
          <TextInput
            value={businessName}
            onChangeText={setBussinsessName}
            mode="flat"
            placeholder="business name"
            style={styles.inputStyle}
            activeOutlineColor="#00b8e6"
            outlineColor="#ddd" // Border color when not focused
            theme={{
              colors: {
                primary: '#00b8e6', // Text color
                placeholder: '#b0b0b0', // Placeholder text color
                underlineColor: 'transparent', // Remove underline
                background: '#fff', // Background color inside input
              },
            }}
          />
          <TextInput
            label="Enter location"
            value={businessName}
            mode="flat"
            placeholder="business name"
            style={styles.inputStyle}
            activeOutlineColor="#00b8e6"
          />
        </View>

        {/* Feature Grid */}
        {/* <View style={styles.featureGrid}>
          {features.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.featureCard}
              onPress={item.onPress}>
              <Image source={item.icon} style={styles.featureIcon} />
              <Text style={styles.featureTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 150,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4d94ff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#fff',
  },
  menuContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 200,
    elevation: 4,
  },
  menuItemText: {
    color: '#333',
    fontSize: 16,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  horizontalScrollContainer: {
    marginBottom: 20,
  },
  listContainer: {
    flexDirection: 'row',
  },
  listContent: {
    backgroundColor: '#fff',
    height: 250,
    width: 180, // Fixed width for each card
    marginRight: 10, // Spacing between cards
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  circleStyle: {
    margin: 10,
    borderWidth: 0.5,
    color: 'green',
    borderRadius: 50,
    width: 11,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  cardContentName: {
    fontWeight: '800',
    marginTop: 10,
  },
  cardContentPrice: {
    color: 'red',
    fontSize: 12,
  },
  editButton: {
    color: '#fff',
    backgroundColor: '#3385ff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  emptyCard: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  viewMoreText: {
    marginTop: 10,
    color: '#3399ff',
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: width * 0.43, // 43% of screen width
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  inputStyle: {
    padding: 0,
  },
});
