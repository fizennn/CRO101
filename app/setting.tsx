import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/FontAwesome";

const SettingsScreen = ({ navigation }) => {
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' }
        });
    }, []);

    const handleLogout = () => {
        setLogoutModalVisible(true);
    };

    const confirmLogout = () => {
        setLogoutModalVisible(false);
        navigation.getParent().reset({
            index: 0,
            routes: [{ name: 'SplashScreen' }],
          });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.getParent()?.setOptions({
                        tabBarStyle: { display: 'block', backgroundColor: '#0C0F14', borderTopWidth: 0 }
                    });
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    });
                }}>
                    <Image source={require('../assets/images/back.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Setting</Text>
                <Text></Text>
            </View>

            {/* Danh sách menu */}
            <ScrollView>
                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>
                        <Icon name="history" size={22} color="#d68c44" />
                    </View>
                    <Text style={styles.menuText}>History</Text>
                    <Icon name="chevron-right" size={18} color="#888" style={styles.arrow} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={()=>{
                    navigation.navigate('ProfileScreen');
                }}>
                    <View style={styles.iconWrapper}>
                        <Icon name="user" size={22} color="#d68c44" />
                    </View>
                    <Text style={styles.menuText}>Personal Details</Text>
                    <Icon name="chevron-right" size={18} color="#888" style={styles.arrow} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>
                        <Icon name="map-marker" size={22} color="#d68c44" />
                    </View>
                    <Text style={styles.menuText}>Address</Text>
                    <Icon name="chevron-right" size={18} color="#888" style={styles.arrow} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>
                        <Icon name="credit-card" size={22} color="#d68c44" />
                    </View>
                    <Text style={styles.menuText}>Payment Method</Text>
                    <Icon name="chevron-right" size={18} color="#888" style={styles.arrow} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>
                        <Icon name="info-circle" size={22} color="#d68c44" />
                    </View>
                    <Text style={styles.menuText}>About</Text>
                    <Icon name="chevron-right" size={18} color="#888" style={styles.arrow} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconWrapper}>
                        <Icon name="question-circle" size={22} color="#d68c44" />
                    </View>
                    <Text style={styles.menuText}>Help</Text>
                    <Icon name="chevron-right" size={18} color="#888" style={styles.arrow} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <View style={styles.iconWrapper}>
                        <Icon name="sign-out" size={22} color="#d68c44" />
                    </View>
                    <Text style={styles.menuText}>Log out</Text>
                    <Icon name="chevron-right" size={18} color="#888" style={styles.arrow} />
                </TouchableOpacity>
            </ScrollView>

            {/* Logout Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isLogoutModalVisible}
                onRequestClose={() => {
                    setLogoutModalVisible(!isLogoutModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#ccc' }}
                                onPress={() => setLogoutModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#d68c44' }}
                                onPress={confirmLogout}
                            >
                                <Text style={styles.textStyle}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#0C0F14',
    },
    header: {
        marginTop:35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomColor: "#333",
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#1E1E1E",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: "#fff",
        fontWeight:'500'
    },
    arrow: {
        marginLeft: "auto",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#1E1E1E",
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
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "#fff",
        fontSize: 18
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%',
        alignItems: 'center'
    },
    textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default SettingsScreen;