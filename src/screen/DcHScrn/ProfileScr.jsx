import {
  Alert,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import {dummyArray} from '../../components/DummyArray';
import {AuthContext} from '../../custom/AuthContext';
import API_BASE_URL from '../../config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Roles} from '../../constant/NavItem';

export default function ProfileScr() {
  const [selectedValue, setSelectedValue] = useState([]);
  const {email, firstName, lastName} = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [retrivedServices, setRetrivedServices] = useState([]);

  useEffect(() => {
    setUserName(`${firstName} ${lastName}`);
  }, []);

  useEffect(() => {
    if (selectedValue && selectedValue.length > 0) {
      console.log('inside useEffect');
      fetchData();
    }
  }, [selectedValue]);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}api/getServices`, {
        email,
      });
      setRetrivedServices(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [open, setOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [items, setItems] = useState([
    {label: 'Donation', value: 'Donation'},
    {label: 'Physical service', value: 'Physical service'},
    {label: 'Tution', value: 'Tution'},
    {label: 'Online consultant', value: 'Online consultation'},
    {label: 'Other', value: 'Other'},
  ]);

  const [isActive, setIsActive] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const serviceOffers = dummyArray();

  const renderServiceList = ({item}) => {
    return (
      <View style={styles.serviceItem}>
        <Text style={{fontSize: 14, fontWeight: '200'}}>{item.service}</Text>
        <Text style={{backgroundColor: 'green', color: '#fff', width: 'auto'}}>
          {item.status}
        </Text>
        <Text>{item.date}</Text>
      </View>
    );
  };

  const handleServiceSubmit = async () => {
    const requestData = {
      email,
      services,
    };
    if (services.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'You must select atleast one service.',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/addServices`,
        requestData,
        {
          headers: {
            'Content-Type': 'Application/json',
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Services successfully saved! 🎉',
        position: 'top',
        visibilityTime: 3000,
      });
      setServices([]);
      // setButtonDisabled(true);
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImg}>
          <Image
            style={{height: 80, width: 80, borderRadius: 60}}
            source={require('../../images/wasp.jpg')}
          />
        </View>
        <View style={styles.profileDetail}>
          <Text style={{fontWeight: '700', fontSize: 16}}>{userName}</Text>
          <Text style={{marginBottom: 10, fontSize: 12}}>{email}</Text>
          <Button title="Edit profile" />
        </View>
      </View>

      {/* Add Service container */}

      <View style={styles.serviceContainer}>
        <Text style={styles.title}>Select Services You Provide</Text>
        <View style={styles.dropDownMainContainer}>
          <DropDownPicker
            open={open}
            value={services}
            items={items}
            multiple={true}
            min={1}
            max={3}
            setOpen={setOpen}
            setValue={setServices}
            mode="BADGE"
            disabled={buttonDisabled}
            setItems={setItems}
            onChangeValue={selected => setSelectedValue(selected)}
            style={{
              backgroundColor: '#fff',
              borderColor: 'gray',
              padding: 10,
              margin: 'auto',
            }}
            textStyle={{fontSize: 16}}
            placeholder="Select services"
            placeholderStyle={{color: '#808080'}}
            dropDownContainerStyle={{
              backgroundColor: '#f2f2f2',
              borderColor: '#737373',
              margin: 'auto',
            }}
            listItemContainerStyle={{
              borderBottomWidth: 0.5,
              borderBottomColor: '#f2f2f2',
              paddingVertical: 10,
            }}
            listItemLabelStyle={{fontSize: 16, color: '#333333'}}
          />
        </View>
        <TouchableOpacity
          onPress={handleServiceSubmit}
          style={styles.serviceSubBtn}>
          <Text style={{color: '#fff', fontSize: 16}}>Add service</Text>
        </TouchableOpacity>
        {/* {buttonDisabled ? (
          <Pressable style={styles.serviceSubBtnDisabled}>
            <Text style={{color: '#333333', fontSize: 16}}>Add service</Text>
          </Pressable>
        ) : (
          <TouchableOpacity
            onPress={handleServiceSubmit}
            style={styles.serviceSubBtn}>
            <Text style={{color: '#fff', fontSize: 16}}>Add service</Text>
          </TouchableOpacity>
        )} */}
      </View>

      {/* Service list */}
      <View style={styles.serviceListContainer}>
        <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 10}}>
          List of services you offered.
        </Text>

        {serviceOffers.map((item, index) => (
          <View key={index} style={styles.serviceItem}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  marginVertical: 3,
                }}>
                <Image
                  source={item.imgSrc}
                  style={{height: 30, width: 30, marginRight: 5}}
                />
                <Text style={{fontSize: 14, fontWeight: '600'}}>
                  {item.service}
                </Text>
              </View>

              <Text style={{fontSize: 10}}>{item.date}</Text>
            </View>
            {isActive ? (
              <Text
                style={{
                  backgroundColor: '#00b33c',
                  color: '#fff',
                  alignSelf: 'flex-start',
                  padding: 5,
                  borderRadius: 20,
                  fontSize: 12,
                }}>
                {item.status}
              </Text>
            ) : (
              <Text
                style={{
                  backgroundColor: '#cc0000',
                  color: '#fff',
                  alignSelf: 'flex-start',
                  padding: 5,
                  borderRadius: 20,
                  fontSize: 12,
                }}>
                {item.status}
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  profileHeader: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  profileImg: {
    marginLeft: 20,
  },
  profileDetail: {
    marginLeft: 20,
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
