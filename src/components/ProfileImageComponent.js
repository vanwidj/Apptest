import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
    initialContainer: {
        backgroundColor: '#295eff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        width: 50,
        height: 50,
    }, 
    bigContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    initialTitle: {
        color: 'white', 
        fontSize: 25
    },
    bigTitle: {
        fontSize: 50,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 30,
        overflow: 'hidden',
    },
    bigImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    }
});


const ProfileImageComponent = ({ name, photo, big }) => {
    const validURL = () => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(photo);
    }

    const getInitial = () => {
        const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        
        var initials = [...name.matchAll(rgx)] || [];
        
        return ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
    }

    return (
        <View>
            { validURL()?
                <Image
                    defaultSource={require('../assets/default-contact.png')}
                    source={{uri: photo}}
                    style={[styles.image, big? styles.bigImage : '']}
                />
                :
                <View style={[styles.initialContainer, big? styles.bigContainer : '']}>
                    <Text style={[styles.initialTitle, big? styles.bigTitle : '']}>{getInitial()}</Text>
                </View>
            }
        </View>
    )
}

export default ProfileImageComponent
