/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';
const SignUpTemplate = {
  name: {value: '', error: ''},
  email: {value: '', error: ''},
  phone: {value: '', error: ''},
  password: {value: '', error: ''},
  confirmPassword: {value: '', error: ''},
};

const App = () => {
  const [signUpForm, setSignupForm] = useState({...SignUpTemplate});
  const [loading ,setLoading] =useState(false);
  const handleFormError = (key: string, value: string) => {
    let error = '';
    if (key === 'name') {
      if (value.length < 3) {
        error = 'Name must be at least 3 characters';
      }
    } else if (key === 'phone') {
      if (value.length != 10) {
        error = 'Phone number must be 10 digits';
      }
    } else if (key === 'email') {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        error = 'Invalid email address';
      }
    } else if (key === 'password') {
      if (value.length < 6) {
        error = 'Password must be at least 6 characters';
      }
    } else if (key === 'confirmPassword') {
      if (value !== signUpForm[key].value) {
        error = 'Passwords do not match';
      }
    }
    return error;
  };

  function handleForm(key: string, value: string) {
    let currentSignUpForm: any = {...signUpForm};

    currentSignUpForm[key]['value'] = value;
    currentSignUpForm[key]['error'] = handleFormError(key, value);
    setSignupForm(currentSignUpForm);
  }
  useEffect(() => {
    console.log(signUpForm);
  }, [signUpForm]);

const extractFormData=()=>{
  let data:any={
    
  };
  Object.entries(signUpForm).forEach(([key, value]) => {
  data[key] = value.value;
  });
  delete data['confirmPassword']
  return data
};

 const postUser= async (data:any) => {
  return axios
  .post('http://192.168.0.100:8000/api/v1/users/', data,{headers: {'Content-Type': 'application/json','x-auth-token':'nsjjhfdbvkbsdjhb'}}).then(res => res).catch(err =>err)
}
  const handleSubmit=async () =>{ 
    
  console.log('handle====',signUpForm);
  
   const data = extractFormData() 
   console.log('data====',data);
   setLoading(true)
   try {
    const response = await postUser(data)
  
   if (response===200){
    setLoading(false)
    Alert.alert('Success', 'Your account has been Created')
   }else{
    throw response
   }
   } catch (error:any) {
    setTimeout(()=>{
      setLoading(false)
    Alert.alert('Error', error.message)
    },3000)
    
   }
   
  }
  return (
    <View style={styles.container}>
     { loading ? <ActivityIndicator size={'large'} color={'#000000'} style={{marginVertical:70, marginHorizontal:20}}/>: <View style={styles.formContainer}>
        <Text style={styles.heading}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={signUpForm.name.value}
          onChangeText={text => handleForm('name', text)}
        />
        <Text style={styles.error}>{signUpForm.name.error}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"  value={signUpForm.email.value}
          onChangeText={text => handleForm('email', text)}
        />
        <Text style={styles.error}>{signUpForm.email.error}</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={signUpForm.phone.value}
          onChangeText={text => handleForm('phone', text)}
        />
        <Text style={styles.error}>{signUpForm.phone.error}</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={signUpForm.password.value}
          onChangeText={text => handleForm('password', text)}
        />
        <Text style={styles.error}>{signUpForm.password.error}</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={signUpForm.confirmPassword.value}
          onChangeText={text => handleForm('confirmPassword', text)}
        />
        <Text style={styles.error}>{signUpForm.confirmPassword.error}</Text>

        <View style={styles.btnContainer}>
          <Button title="Submit"  onPress={handleSubmit}/>
        </View>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginTop: 4,
    marginBottom: 15,
    marginHorizontal: 5,
    color: 'red',
  },
  formContainer: {
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
  },
  heading: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#aaa',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  btnContainer: {
    width: 150,
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default App;
