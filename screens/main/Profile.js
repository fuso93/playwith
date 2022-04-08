import React from 'react';
import {View,Text} from "react-native";

const Profile = () => {
    return (
        <View>
            <View>
                <View>
                    <Image
                        source={require('../../assets/images/back.png')}
                        resizeMode={'cover'}
                        paddingButton={10}
                        padding={10}
                        radius={15}
                    >

                    </Image>
                </View>
            </View>
        </View>
    );
};

export default Profile;