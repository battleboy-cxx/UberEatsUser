import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { updateUser, createUser } from "../../graphql/mutations";

const Profile = () => {
  const { dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");

  const { sub, setDbUser } = useAuthContext();

  const navigation = useNavigation();

  const userUpdate = async () => {
    try {
      const user = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: dbUser.id,
            name,
            address,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            sub,
          },
        })
      );
    } catch (e) {
      Alert.alert("Error", e.errors[0].message);
    }

  };

  const userCreate = async () => {
    try {
      const user = await API.graphql(
        graphqlOperation(createUser, {
          input: {
            name,
            address,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            sub,
          },
        })
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.errors[0].message);
    }
  };
  const onSave = async () => {
    if (dbUser) {
      await userUpdate();
    } else {
      await userCreate();
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <Button onPress={onSave} title="Save" style={{ margin: 10 }} />
      <Text
        onPress={() => Auth.signOut()}
        style={{ textAlign: "center", color: "red", margin: 10 }}
      >
        Sign out
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default Profile;
