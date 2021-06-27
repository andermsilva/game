import React, { useState } from "react";

import { View, Platform, Text, KeyboardAvoidingView, ScrollView } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import uuid from 'react-native-uuid'



import { Feather } from "@expo/vector-icons";
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

import { Header } from "../../components/Header";

import { COLLECTION_APPOINTMENTS } from '../../configs/database'

import { Guilds } from "../Guilds";
import { GuildIcon } from "../../components/GuildIcon";
import { GuildProps } from "../../components/Guild";

import { CategorySelect } from "../../components/CategorySelect";

import { Background } from "../../components/Background";
import { Button } from "../../components/Button";
import { SmallInput } from "../../components/SmallInut";
import { Textarea } from "../../components/Textearea";

import { ModalView } from "../../components/ModalView";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";




export function AppointmentCreate() {
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuid] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navegation = useNavigation();


    function handleCategorySelect(categoryId: string) {
        setCategory(categoryId);
    }

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }
    function handleCloseGuilds() {
        setOpenGuildsModal(false);
    }
    function handleOpenGuildSelect(guildSelect: GuildProps) {
        setGuid(guildSelect);

        setOpenGuildsModal(false);
    }


    async function handleSalve() {
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description: description
        }

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointment = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointment, newAppointment])
        );
        navegation.navigate('Home')
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Background>

                <ScrollView>
                    <Header
                        title='Agendar Partida'

                    />

                    <Text
                        style={[styles.label,
                        { marginLeft: 24, marginTop: 36, marginBottom: 18 }
                        ]}
                    >
                        Cateoria
                    </Text>

                    <CategorySelect
                        hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />
                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon ?
                                        <GuildIcon

                                            guildId={guild.id}
                                            iconId={guild.icon}
                                        />
                                        :
                                        <View style={styles.image} />

                                }
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {
                                            guild.name ? guild.name : '  selecione um servidor'
                                        }

                                    </Text>
                                </View>
                                <Feather
                                    name='chevron-right'
                                    color={theme.colors.heading}
                                    size={18}
                                />

                            </View>
                        </RectButton>


                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e mês

                                </Text>

                                <View style={styles.colunm}>

                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setDay}

                                    />

                                    <Text style={styles.divider}>/</Text>

                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMonth}

                                    />

                                </View>
                            </View>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Hora e minuto

                                </Text>

                                <View style={styles.colunm}>

                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />

                                    <Text style={styles.divider}>:</Text>

                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />

                                </View>
                            </View>
                        </View>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>Descrição</Text>

                            <Text style={styles.caracteresLimit}>Max 100 caracteres </Text>
                        </View>
                        <Textarea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}

                        />

                        <View style={styles.footer}>
                            <Button
                                title='Agendar'
                                onPress={handleSalve}
                            />
                        </View>
                    </View>
                </ScrollView>

                <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                    <Guilds handleGuildSelect={handleOpenGuildSelect} />
                </ModalView>
            </Background>
        </KeyboardAvoidingView>
    );
}
