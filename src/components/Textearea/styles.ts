import { Inter_100Thin } from '@expo-google-fonts/inter';
import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 95,
        backgroundColor: theme.colors.secondary40,
        borderRadius: 8,
        fontFamily: theme.fonts.text400,
        color: theme.colors.heading,
        fontSize: 13,
        marginRight: 4,

        borderColor: theme.colors.secondary50,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        textAlignVertical: 'top',
    },

})