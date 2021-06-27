import React from "react";

import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';

import { SingIn } from "../screens/Singin";

import { userAuth } from "../hooks/auth";

export function Routes() {
    const { user } = userAuth();
    return (
        <NavigationContainer>
            {user.id ?

                <AppRoutes />
                :
                <SingIn />
            }
        </NavigationContainer>
    );
}