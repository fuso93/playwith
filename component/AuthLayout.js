import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {FONTS, SIZES, COLORS} from '../constants/theme'
import { StatusBar } from 'expo-status-bar';

const AuthLayout = ({ title, subtitle, titleContainerStyle, children }) => {
    return (
        <View
            style={{
                flex: 1,
                paddingVertical: SIZES.height > 800 ? SIZES.base : SIZES.radius,
                backgroundColor: COLORS.white,
            }}
        >
            <StatusBar style={"auto"} />

            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                contentContainerStyle={styles.keyboardContainer}
            >
                {/*/!* App Logo *!/*/}
                <View style={{ alignItems: 'center', marginTop: 60 }} />

                {/* Title */}
                <View style={[styles.signInContainer, { ...titleContainerStyle }]}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.subTitle}>
                        {subtitle}
                    </Text>
                </View>
                {children}
            </KeyboardAwareScrollView>
        </View>
    );
}

export default AuthLayout;

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        paddingHorizontal: SIZES.padding
    },
    signInContainer: {
        marginTop: SIZES.height > 800 ? SIZES.padding : 0
    },
    title: {
        textAlign: 'center',
        ...FONTS.h2,
        color: COLORS.primary
    },
    subTitle: {
        textAlign: 'center',
        color: COLORS.darkGray,
        marginTop: SIZES.base,
        ...FONTS.body3
}

})