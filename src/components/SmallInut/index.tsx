import React, { useState } from "react";

import { View, ImageBackground, TextInput, TextInputProps } from 'react-native';

import { Feather } from "@expo/vector-icons";
import { RectButton } from 'react-native-gesture-handler';

import { styles } from "./styles";

export function SmallInput({ ...rest }: TextInputProps) {

    return (
        <TextInput
            style={styles.container}
            keyboardType='numeric'
            {...rest}
        />
    );
}
