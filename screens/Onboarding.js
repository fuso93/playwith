import React from 'react';
import {View, Text,Button} from 'react-native';
import {useNavigation} from "@react-navigation/native"; //다른 대로 이동 

const Onboarding = () => {

    const navigation = useNavigation();
    return (
        <View>
            <Text>
                onboarding
            </Text>
            <Button
                title={"화면이동"}
                onPress={()=> navigation.navigate('Login')}
            />
        </View>
    );
};

export default Onboarding;