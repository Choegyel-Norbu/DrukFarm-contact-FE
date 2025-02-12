import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';

export default function CustomInput({
  placeholder,
  icon,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
}) {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.inputContainer}>
      <Icon name={icon} size={20} color="#595959" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
        keyboardType={keyboardType}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}>
          <Icon
            name={showPassword ? 'visibility-off' : 'visibility'}
            size={24}
            color="#bfbfbf"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 0,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    padding: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#595959',
  },
  eyeIcon: {
    padding: 10,
  },
});
