import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView , 
  ActivityIndicator,
  ToastAndroid,
  AlertIOS,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import globalStyle from '../styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { addContactDetailReq, editContactDetailReq } from '../store/actions'
import ImagePicker from 'react-native-image-picker';

const EditContact = ({ contact, loading, error, success, route, dispatch, navigation }) => {
  const [form, setForm] = useState(contact)
  const [fileUri, setFileUri] = useState(contact.photo)
  const isEditType = route.params ? route.params.edit : false

  const onSubmit = () => {
    contact.photo = 'n/a'

    if(form.firstName && form.lastName && form.age) {
      if(!form.photo) {
        if(fileUri) {
          form.photo = fileUri
        }else {
          form.photo = 'N/A'
        }
      }
      if(!isEditType){
        dispatch(addContactDetailReq(form))
      } else {
        dispatch(editContactDetailReq(form))
      }
    } else {
      const e = 'Please fill all the fields.'
      if (Platform.OS === 'android') {
        ToastAndroid.show(e, ToastAndroid.SHORT)
      } else {
        AlertIOS.alert(e);
      }
    }
  }

  useEffect(() => {
    if(error){
      notifyMessage();
      error = ''
    }
    if(success) {
      if(!isEditType){
        navigation.navigate('ListContact')
      } else {
        navigation.navigate('DetailContact', { contact: form })
      }
    }
  }, [error, success])

  const notifyMessage = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(error, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(error);
    }
  }
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
 
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const captureImage = async (type) => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      try {
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
     
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            let source = response.uri;
            setFileUri(source);
          }
        });
      } catch (err) {
        console.log("Error",error)
      }
    } 
  };
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior= {Platform.OS === "ios"? "padding":"height"} >
          <View style={styles.profileImgContainer}>
            { fileUri?
              <Image
                source={{ uri: fileUri }}
                style={styles.image}
              />
              :
              <Image
                source={require('../assets/default-contact.png')}
                style={styles.image}
              />
            }
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    captureImage()
                }}
            >
                <FontAwesome5
                    name={'camera'}
                    size={20}
                    color={'#1c1c1c'}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.row}>
              <Text style={styles.titleProperties}>First Name</Text>
              <Text style={styles.properties}>:</Text>
              <TextInput 
                placeholder='First Name'
                value={form.firstName}
                style={styles.valueProperties}
                onChangeText={(text) => { setForm({ ...form, firstName: text }) }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.titleProperties}>Last Name</Text>
              <Text style={styles.properties}>:</Text>
              <TextInput 
                placeholder='Last Name'
                value={form.lastName}
                style={styles.valueProperties}
                onChangeText={(text) => { setForm({ ...form, lastName : text}) }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.titleProperties}>Age</Text>
              <Text style={styles.properties}>:</Text>
              <TextInput 
                placeholder='Age'
                value={form.age}
                keyboardType='decimal-pad'
                style={styles.valueProperties}
                onChangeText={(text) => { setForm({ ...form, age : text}) }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View
          style={styles.actionContainer}>
          <Pressable 
            title="Submit" 
            onPress={()=> onSubmit()} 
            style={styles.buttonSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>

        {
          loading ?
        <Modal 
          transparent={true}
          visible={loading}
        >
          <View style={globalStyle.loading}>
              <ActivityIndicator size='large' />
          </View>
        </Modal> : ''
        }
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      alignSelf:'stretch'
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: 'center',
      marginBottom: 10,
    },
    profileImgContainer: {
      flex: 0.4,
      backgroundColor: '#d4deff',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    detailContainer: {
      flex: 0.4,
      alignSelf: 'stretch',
      alignContent: 'space-between',
      padding: 20,
    }, 
    actionContainer: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    profileName: {
      fontSize: 30,
      paddingTop: 20,
      color: '#1c1c1c'
    },
    titleProperties: {
      minWidth: '25%',
      fontSize: 15,
    },
    properties: {
      minWidth: '5%',
      fontSize: 15,
    },
    valueProperties: {
      minWidth: '45%',
      fontSize: 15,
      color: '#1c1c1c',
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
    },
    buttonSubmit: {
      backgroundColor: '#295eff',
      width: '50%',
      padding: 10,
      elevation: 2,
      borderRadius: 10,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center"
    },
    button: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 60,
  }
  });

const mapStateToProps = (state) => {
  return {
      contact: state.contacts.data,
      loading: state.contacts.loading,
      error: state.contacts.error,
      success: state.contacts.success,
  }
};

export default connect(mapStateToProps)(EditContact);