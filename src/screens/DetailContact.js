import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import InitialIconComponent from '../components/ProfileImageComponent'
import ModalComponent from '../components/ModalComponent'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import globalStyles from '../styles';
import { setContactReq, deleteContactDetailReq } from '../store/actions'

const DetailContact = ({ route, dispatch, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const contact = route.params.contact
  const fullName = contact.firstName + ' ' + contact.lastName

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                setModalVisible(!modalVisible)
            }}
        >
            <FontAwesome5
                name={'trash'}
                size={20}
                color={'#1c1c1c'}
            />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  const onDeleteContact = () => {
    dispatch(deleteContactDetailReq(contact))
    navigation.navigate('ListContact');
  }

  const onEditPress = () => {
    dispatch(setContactReq(contact))
    navigation.navigate('EditContact', { edit: true });
  }
    return (
      <View style={styles.container}>
        <View style={styles.profileImgContainer}>
          <InitialIconComponent name={fullName} photo={contact.photo} big></InitialIconComponent>
          <Text style={styles.profileName}>{fullName}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.row}>
            <Text style={styles.titleProperties}>First Name</Text>
            <Text style={styles.properties}>:</Text>
            <Text style={styles.valueProperties}>{contact.firstName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleProperties}>Last Name</Text>
            <Text style={styles.properties}>:</Text>
            <Text style={styles.valueProperties}>{contact.lastName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleProperties}>Age</Text>
            <Text style={styles.properties}>:</Text>
            <Text style={styles.valueProperties}>{contact.age}</Text>
          </View>
        </View>
        
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onClick={() => onDeleteContact()}
        />
        <TouchableOpacity
                style={globalStyles.button}
                onPress={() => { onEditPress()}}
            >
                <FontAwesome5
                    name={'edit'}
                    size={20}
                    color={'#ffffff'}
                />
          </TouchableOpacity>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingBottom: 10,
    },
    profileImgContainer: {
      flex: 0.4,
      backgroundColor: '#d4deff',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    detailContainer: {
      flex: 0.6,
      alignSelf: 'stretch',
      alignContent: 'space-between',
      padding: 20,
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
      color: '#1c1c1c'
    },
    button: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
    }
  });

  export default connect()(DetailContact);