
import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Onboarding, Login, Forgot, Signup} from "../screens";
const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Onboard"
                component={Onboarding}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Forgot"
                component={Forgot}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>

    );
};

export default OnboardingStack;