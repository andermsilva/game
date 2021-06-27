import React from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';

import IllustrationImg from '../../assest/illustration.png';

import { theme } from '../../global/styles/theme';
import { styles } from './styles'

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

import { userAuth } from '../../hooks/auth';

export function SingIn() {

    const { loading, sinIng } = userAuth();

    async function handleSinIng() {

        try {

            await sinIng();


        } catch (error) {
            Alert.alert(error)
        }

    }

    return (
        <Background>

            <View style={styles.container}>
                <Image source={IllustrationImg} style={styles.image} resizeMode='stretch' />

                <View style={styles.content}>
                    <Text style={styles.title}>

                        Conecte-se {`\n`}
                        e organize suas {`\n`}
                        jogatinas

                    </Text>
                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games{`\n`}
                        favoritos com seus amigos
                    </Text>
                    {loading ? <ActivityIndicator color={theme.colors.primary} />

                        : <ButtonIcon
                            title='Entrar com Discord'

                            onPress={handleSinIng}

                        />
                    }
                </View>

            </View>

        </Background>
    );
}