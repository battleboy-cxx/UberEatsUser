import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const { dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");

  const { sub, setDbUser } = useAuthContext();

  const navigation = useNavigation();

  const updateUserInput = `
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      address
      lat
      lng
      sub
    }
  }
`;

  const createUserInput = `
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      address
      lat
      lng
      sub
    }
  }
`;
  const updateUser = async () => {
    try {
      const user = await API.graphql(
        graphqlOperation(updateUserInput, {
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

  const createUser = async () => {
    try {
      const user = await API.graphql(
        graphqlOperation(createUserInput, {
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
      await updateUser();
    } else {
      await createUser();
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
