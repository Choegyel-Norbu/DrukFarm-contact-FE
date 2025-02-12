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
            left={props => <IconButton {...props} icon="logout" />}
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
              Yes, Logout
            </Button>
            <Button mode="text" onPress={onDismiss} style={styles.cancelButton}>
              Cancel
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
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  message: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  actions: {
    justifyContent: 'space-between',
    marginTop: 15,
  },
  logoutButton: {
    backgroundColor: '#cc5200',
  },
  cancelButton: {
    color: '#FFFFFF',
  },
});

export default LogoutDialog;
