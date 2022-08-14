import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, FlatList, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getContactListsReq, resetContactReq } from '../store/actions';
import ListComponent from '../components/ListComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles';

const ListContact = ({ lists, dispatch, navigation }) => {

    const requestAPI = () => {
        dispatch(getContactListsReq())
    }

    useEffect(() => {
        requestAPI();
    }, [])

    
    const renderEmpty = () => (
        <View style={styles.emptyText}>
            <Text>No Data at the moment</Text>
            <Button onPress={() => requestAPI()} title='Refresh'/>
        </View>
    )
    function onPressList(contact) {
        navigation.navigate('DetailContact', { contact })
    }

    const onAddPress = () => {
      dispatch(resetContactReq())
      navigation.navigate('EditContact');
    }

    return (
        <SafeAreaView style={styles.container}>
            {lists.loading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
                :
                <FlatList
                    contentContainerStyle={{flexGrow: 1}}
                    data={lists.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <ListComponent contact={item} idx={index} onPress={() => onPressList(item)} />
                    )}
                    ListEmptyComponent={renderEmpty}
                    onRefresh={requestAPI}
                    refreshing={lists.loading}
                />
            }

            <TouchableOpacity
                style={styles.button}
                onPress={() => onAddPress() }
            >
                <FontAwesome5
                    name={'plus'}
                    size={20}
                    color={'#ffffff'}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists,
    }
};

export default connect(mapStateToProps)(ListContact);