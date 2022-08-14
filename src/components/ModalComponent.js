import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import globalStyle from '../styles'

const ModalComponent = ({ modalVisible, setModalVisible, onClick}) => {
  return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Delete Contact</Text>
            <View style={globalStyle.row}>
                <Pressable
                    style={[styles.button, styles.buttonYes]}
                    onPress={() => onClick()}
                >
                    <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>No</Text>
                </Pressable>
            </View>
            </View>
        </View>
        </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    minWidth: '50%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    maxWidth: '50%',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    elevation: 2
  },
  buttonYes: {
    backgroundColor: "#295eff",
  },
  buttonClose: {
    backgroundColor: "#ddd",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ModalComponent;