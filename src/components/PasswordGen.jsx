import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'The password should be more that 4 characters!')
    .max(10, 'The password should not be more than 10!')
    .required(true),
});

export default function PasswordGen() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = passwordLength => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijlmnpqrstuvwxyz';
    const numberPass = '01234567789';
    const specialChars = '~!@#$%&^*-+?';

    if (upperCase) {
      characterList += upperCaseChars;
    }

    if (lowerCase) {
      characterList += lowerCaseChars;
    }

    if (numbers) {
      characterList += numberPass;
    }

    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters, length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      const index = Math.round(Math.random() * characters.length);
      result += characters.charAt(index);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setUpperCase(false);
    setLowerCase(true);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{passwordLength: ''}}
          validationSchema={passwordSchema}
          onSubmit={values => {
            console.log(values);
            generatePasswordString(values.passwordLength);
          }}>
          {({
            values,
            errors,
            isValid,
            touched,
            handleChange,
            handleSubmit,
            handleReset,
            /* and other goodies */
          }) => (
            <>
              <Text>Password Generator</Text>
              <View style={{margin: 10}}>
                <Text>Password length</Text>
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={styles.errors}>{errors.passwordLength}</Text>
                )}
                <TextInput
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  keyboardType="numeric"
                  style={styles.textInputStyle}
                  placeholder="Password length"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text>Use uppercase</Text>
                <BouncyCheckbox
                  isChecked={upperCase}
                  onPress={() => setUpperCase(!upperCase)}
                  fillColor="#4caf50"
                  unfillColor="#f0f0f0"
                  textStyle={{fontSize: 16, color: '#333', fontWeight: '600'}}
                  bounceEffect={1.5}
                  bounceFriction={2}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text>Use lowercase</Text>
                <BouncyCheckbox
                  isChecked={lowerCase}
                  onPress={() => setLowerCase(!lowerCase)}
                  fillColor="#4caf50"
                  unfillColor="#f0f0f0"
                  textStyle={{fontSize: 16, color: '#333', fontWeight: '600'}}
                  bounceEffect={1.5}
                  bounceFriction={2}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text>Use number</Text>
                <BouncyCheckbox
                  isChecked={numbers}
                  onPress={() => setNumbers(!numbers)}
                  fillColor="#4caf50"
                  unfillColor="#f0f0f0"
                  textStyle={{fontSize: 16, color: '#333', fontWeight: '600'}}
                  bounceEffect={1.5}
                  bounceFriction={2}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text>Use special characters</Text>
                <BouncyCheckbox
                  isChecked={symbols}
                  onPress={() => setSymbols(!symbols)}
                  fillColor="#4caf50"
                  unfillColor="#f0f0f0"
                  textStyle={{fontSize: 16, color: '#333', fontWeight: '600'}}
                  bounceEffect={1.5}
                  bounceFriction={2}
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity
                  disabled={!isValid}
                  style={styles.formButton}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Generate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.formButton}>
                  <Text
                    style={styles.buttonText}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
              {isPasswordGenerated ? (
                <View style={styles.passwordView}>
                  <Text selectable>{password}</Text>
                </View>
              ) : null}
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#f2f2f2',
    height: 'auto',
    width: 'auto',
    padding: 10,
    paddingLeft: 30,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  formButton: {
    width: '30%',
    height: 40,
    backgroundColor: '#e65c00', // Fallback color for gradient
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7,
    marginLeft: 5,
    // backgroundColor: '#ff6600',
    // width: 90,
    // height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  formAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  passwordView: {
    height: 50,
    width: '90%',
  },
  textInputStyle: {
    height: 55,
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#222',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Shadow for Android
    fontFamily: 'System',
    // height: 50,
    // backgroundColor: '#fff',
    // borderRadius: 10,
    // paddingHorizontal: 15,
    // fontSize: 16,
    // color: '#333',
    // borderWidth: 1,
    // borderColor: '#ddd',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
  },
  errors: {
    color: 'red',
  },
});
