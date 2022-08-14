import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        marginVertical: 15,
        marginHorizontal: 10
    },
    loading: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    emptyText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#295eff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5,
    },
    
})