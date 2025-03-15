import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Button,
  Card,
  IconButton,
} from 'react-native-paper';

const LogoutDialog = ({visible, onDismiss, onConfirm}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="Confirm Logout"
            titleStyle={styles.title}
            left={props => <IconButton {...props} icon="logout" size={30} />}
          />
          <Card.Content>
            <Text style={styles.message}>
              Are you sure you want to log out?
            </Text>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button
              mode="contained"
              onPress={onConfirm}
              style={styles.logoutButton}>
              <Text style={{color: 'blue'}}>Logout</Text>
            </Button>
            <Button
              mode="contained"
              onPress={onDismiss}
              style={styles.cancelButton}>
              <Text style={{color: 'blue'}}>Cancel</Text>
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    borderRadius: 15,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    // elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 800,
    color: '#333333',
    textAlign: 'justify',
  },
  message: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  actions: {
    justifyContent: 'flex-start',
    padding: 0,
  },
  logoutButton: {
    backgroundColor: '#fff',
  },
  cancelButton: {
    backgroundColor: '#fff',
  },
});

export default LogoutDialog;
