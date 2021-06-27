import React from "react";
import { View, Text } from 'react-native';
import { userAuth } from "../../hooks/auth";

import { RectButton } from "react-native-gesture-handler";

import { Avatar } from '../Avatar';

import { styles } from "./styles";
import { Alert } from "react-native";

export function Profile() {
    const { user, singOut } = userAuth();
    function handleSingOut() {
        Alert.alert('Logout', 'Deseja sair de GamePlay',
            [
                {
                    text: 'Não',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => singOut()
                }
            ]
        )
    }
    return (
        <View style={styles.container}>
            <RectButton onPress={handleSingOut}>

                <Avatar urlImage={user.avatar} />
                <View>

                    <View style={styles.user}>

                        <Text style={styles.greeting}>Ola,</Text>
                        <Text style={styles.username}>{user.firstName}</Text>
                    </View>
                    <Text style={styles.message}>Hoje é dia de vitória</Text>
                </View>
            </RectButton>

        </View>
    );
}