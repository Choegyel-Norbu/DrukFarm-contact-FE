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
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MiniCards from '../../cards/MiniCards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {OfferList} from '../../constant/OfferItem';
import ImageCard from '../../cards/ImageCard';
import LinearGradient from 'react-native-linear-gradient';
import {Roles} from '../../constant/NavItem';
import {Card, Avatar, Button, Menu, Appbar} from 'react-native-paper';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../../custom/AuthContext';
import LogoutDialog from '../../custom/LogoutDialog';
import Feeds from '../../components/Feeds';

// const {width} = Dimensions.get('window');

export default function HomeScr({navigation}) {
  const offerList = OfferList();
  const [roles, setRoles] = useState(Roles);
  const [openRole, setOpenRole] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {logOut} = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [logOutDialogVisible, setLogOutDialogVisible] = useState(false);

  const openMenu = () => {
    console.log('Opening menu');
    setVisible(true);
  };
  const closeMenu = () => {
    console.log('Closing menu');
    setVisible(false);
  };

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

  const onRefres = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };
  const renderOfferTemp = ({item}) => {
    return <ImageCard offerItems={item} />;
  };

  const handleServiceSubmit = () => {};

  return (
    <ScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefres} />
      }>
      <SafeAreaView>
        <StatusBar backgroundColor="#3399ff" barStyle="light-content" />
        <LinearGradient
          colors={['#0066cc', '#3399ff']}
          style={styles.homeHeader}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 0}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 35,
              color: '#fff',
              elevation: 20,
            }}>
            Welcome
          </Text>
          {/* *********** Paper menu ************* */}

          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                onPress={openMenu}
                color="#fff"
              />
            }
            contentStyle={{
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
              width: 200,
              elevation: 4,
            }}>
            <Menu.Item
              onPress={handleSettings}
              title="Settings"
              titleStyle={{color: '#333', fontSize: 16}}
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
        </LinearGradient>

        <View style={styles.homeContainer}>
          <View style={styles.contentFeatures}>
            <Pressable
              onPress={() => navigation.navigate('PRdetails')}
              style={styles.pressable}>
              <MiniCards
                filePath={require('../../images/post.png')}
                title="Post"
              />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('HRlisting')}
              style={styles.pressable}>
              <MiniCards
                filePath={require('../../images/donate.png')}
                title="Donate"
              />
            </Pressable>

            <Pressable
              onPress={() => Alert.alert('Pressed')}
              style={styles.pressable}>
              <MiniCards
                filePath={require('../../images/chats.png')}
                title="Chat"
              />
            </Pressable>

            <Pressable
              onPress={() => Alert.alert('Pressed')}
              style={styles.pressable}>
              <MiniCards
                filePath={require('../../images/post2.png')}
                title="PR"
              />
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: 'green',
              height: 200,
              width: '100%',
            }}></View>

          {/* **************** FlatList **************** */}

          {/* <View style={styles.offerCarousel}>
            <Text style={{marginTop: 20}}> OFFERS</Text>
            <FlatList
              horizontal
              data={offerList}
              keyExtractor={item => item.id}
              renderItem={renderOfferTemp}
              showsHorizontalScrollIndicator={false}
            />
          </View> */}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    padding: 10,
    backgroundColor: '#3399ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '200',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 40,
    paddingBottom: 20,
  },
  homeContainer: {
    flexWrap: 'wrap',
    height: 220,
    backgroundColor: 'red',
    width: '95%',
    margin: 'auto',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    transform: [{translateX: 0}, {translateY: -40}],
  },
  contentFeatures: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 20,
  },

  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    borderBottomWidth: 0.5,
    shadowColor: 'e6e6e6',
    shadowOffset: 2,
    shadowOffset: {width: 2, height: 2}, // X, Y position
    shadowOpacity: 0.5, // Shadow transparency
    shadowRadius: 3, // Softness of the shadow
  },
  offerCarousel: {},
  offerCarouselItems: {
    height: 'auto',
    width: 'auto',
    padding: 2,
    padding: 5,
  },
  cardText: {
    fontSize: 10,
    paddng: 20,
  },
  dropDownMainContainer: {
    width: '97%',
    height: 'auto',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  serviceSubBtn: {
    backgroundColor: '#ff6600',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    margin: 'auto',
    marginTop: 20,
  },
  serviceSubBtnDisabled: {
    backgroundColor: '#ff9980',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    margin: 'auto',
    marginTop: 20,
  },
  serviceListContainer: {
    width: '100%',
    padding: 10,
  },
  serviceItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 0,
    borderRadius: 5,
    elevation: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
