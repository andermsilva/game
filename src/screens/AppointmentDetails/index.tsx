import React, { useState, useEffect } from "react";

import { View, ImageBackground, Text, FlatList, Alert, Share, Platform } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";

import { Fontisto } from "@expo/vector-icons";

import BannerImg from '../../assest/banner.png';

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { MemberProps, Members } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";

import { Load } from "../../components/Load";


import { theme } from "../../global/styles/theme";
import { styles } from './styles';
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";

import * as Linking from 'expo-linking';



type Params = {
    guildSelected: AppointmentProps
}

type GuildWidGet = {
    id: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function AppointmentDetails() {
    const navigation = useNavigation();

    const [widget, setWidget] = useState<GuildWidGet>({} as GuildWidGet);

    const [loading, setLoading] = useState(true);

    async function fetchGuilWidget() {

        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
            setLoading(false);
        } catch (error) {
            Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');



        } finally {
            setLoading(false);
        }

    }

    const route = useRoute();
    const { guildSelected } = route.params as Params;

    function handleShereEniation() {
        const message = Platform.OS === 'ios'
            ? `Junte - se a ${guildSelected.guild.name}`
            : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite

        });

    }

    function handleOpenGild() {
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuilWidget();
    }, []);

    return (
        <Background>
            <Header
                title='Detalhes'
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton onPress={handleShereEniation}>
                        <Fontisto
                            name='share'
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />
            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>

                    <Text style={styles.title} >
                        {guildSelected.guild.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>
            {
                loading ? <Load /> :
                    <>

                        <ListHeader
                            title='Jogadores'



                            subtitle={`Total ${widget.members.length}`}

                        />

                        <FlatList
                            data={widget.members}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Members data={item}

                                />

                            )}

                            ItemSeparatorComponent={() => <ListDivider isCentered />}
                            style={styles.members}
                        />
                    </>
            }
            {
                guildSelected.guild.owner &&

                <View style={styles.footer}>
                    <ButtonIcon
                        title='Entrar na partida'
                        onPress={handleOpenGild}
                    />

                </View>
            }
        </Background>
    );
}
