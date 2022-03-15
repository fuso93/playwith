
import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Onboarding, Login} from "../screens";
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
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>

    );
};

export default OnboardingStack;