import React from 'react'
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import ProfileImageComponent from './ProfileImageComponent'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        flexWrap: 'wrap',
        marginHorizontal: 40,
        fontSize: 15,
    },
});

const ListComponent = ({ contact, idx, onPress, onDelete }) => {
    const fullName = contact.firstName + ' ' + contact.lastName

    let row = [];
    let prevOpenedRow;

    const closeRow = (index) => {
        console.log('closerow');
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
          prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
      };
  
      const renderRightActions = (progress, dragX, onClick) => {
        return (
          <View
            style={{
              margin: 0,
              alignContent: 'center',
              justifyContent: 'center',
              width: 70,
            }}>
            <Button color="red" onPress={onClick} title="DELETE"></Button>
          </View>
        );
      };
    return (
        // <Swipeable
        //   renderRightActions={(progress, dragX) =>
        //     renderRightActions(progress, dragX, onDelete)
        //   }
        //   onSwipeableOpen={() => closeRow(idx)}
        //   ref={(ref) => (row[idx] = ref)}
        //   rightOpenValue={-100}
        // >
            <TouchableHighlight onPress={onPress}>
                <View style={styles.container}>
                    <ProfileImageComponent name={fullName} photo={contact.photo}></ProfileImageComponent>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{fullName}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        // </Swipeable>
    )
}

export default ListComponent
