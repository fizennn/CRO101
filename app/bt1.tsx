"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Dimensions } from "react-native"

type ContactType = {
  name: string
  email: string
  position: string
  photo: string
}

const DATA: ContactType[] = [
  {
    name: "Đặc Vụ 1",
    email: "dacvu1@gmail.com",
    position: "HaNoi",
    photo: "https://th.bing.com/th/id/OIP.9KsVH6q5_9jfwJyGLWDbiwAAAA?rs=1&pid=ImgDetMain",
  },
  {
    name: "Đặc Vụ 2",
    email: "dacvu2@gmail.com",
    position: "HaNoi",
    photo: "https://th.bing.com/th/id/OIP.9KsVH6q5_9jfwJyGLWDbiwAAAA?rs=1&pid=ImgDetMain",
  },
  {
    name: "Đặc Vụ 3",
    email: "dacvu3@gmail.com",
    position: "HaNoi",
    photo: "https://th.bing.com/th/id/OIP.9KsVH6q5_9jfwJyGLWDbiwAAAA?rs=1&pid=ImgDetMain",
  },
  {
    name: "Đặc Vụ 4",
    email: "dacvu4@gmail.com",
    position: "HaNoi",
    photo: "https://th.bing.com/th/id/OIP.9KsVH6q5_9jfwJyGLWDbiwAAAA?rs=1&pid=ImgDetMain",
  },
  {
    name: "Đặc Vụ 5",
    email: "dacvu5@gmail.com",
    position: "HaNoi",
    photo: "https://th.bing.com/th/id/OIP.9KsVH6q5_9jfwJyGLWDbiwAAAA?rs=1&pid=ImgDetMain",
  },
  {
    name: "Đặc Vụ 6",
    email: "dacvu6@gmail.com",
    position: "HaNoi",
    photo: "https://th.bing.com/th/id/OIP.9KsVH6q5_9jfwJyGLWDbiwAAAA?rs=1&pid=ImgDetMain",
  },
]

const ContactItem: React.FC<{
  contact: ContactType
  index: number
  onEdit: (contact: ContactType) => void
  onDelete: (index: number) => void
}> = ({ contact, index, onEdit, onDelete }) => {
  return (
    <View style={styles.listItem}>
      <Image source={{ uri: contact.photo }} style={styles.avatar} />

      <View style={styles.bodyItem}>
        <Text style={styles.nameText}>{contact.name}</Text>
        <Text style={styles.emailText}>{contact.email}</Text>
        <Text style={styles.positionText}>{contact.position}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(contact)}>
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(index)}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ContactList = () => {
  const [contacts, setContacts] = useState(DATA)
  const [editingContact, setEditingContact] = useState<ContactType | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleEdit = (contact: ContactType, index: number) => {
    setEditingContact(contact)
    setEditingIndex(index)
    setIsModalVisible(true)
  }

  const handleDelete = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (editingContact && editingIndex !== null) {
      setContacts(contacts.map((contact, index) => (index === editingIndex ? editingContact : contact)))
      setIsModalVisible(false)
      setEditingContact(null)
      setEditingIndex(null)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingContact(null)
    setEditingIndex(null)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => `${item.email}-${index}`}
        renderItem={({ item, index }) => (
          <ContactItem
            contact={item}
            index={index}
            onEdit={(contact) => handleEdit(contact, index)}
            onDelete={handleDelete}
          />
        )}
      />
      <Modal animationType="fade" transparent={true} visible={isModalVisible} onRequestClose={handleCancel}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh sửa liên hệ</Text>
            {editingContact && (
              <>
                <TextInput
                  style={styles.input}
                  value={editingContact.name}
                  onChangeText={(text) => setEditingContact({ ...editingContact, name: text })}
                  placeholder="Tên"
                />
                <TextInput
                  style={styles.input}
                  value={editingContact.email}
                  onChangeText={(text) => setEditingContact({ ...editingContact, email: text })}
                  placeholder="Email"
                />
                <TextInput
                  style={styles.input}
                  value={editingContact.position}
                  onChangeText={(text) => setEditingContact({ ...editingContact, position: text })}
                  placeholder="Vị trí"
                />
                <TextInput
                  style={styles.input}
                  value={editingContact.photo}
                  onChangeText={(text) => setEditingContact({ ...editingContact, photo: text })}
                  placeholder="URL hình ảnh"
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Lưu</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bodyItem: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  positionText: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
})

export default ContactList
