import React,{ useRef, useState } from 'react';
import {View, Text, StyleSheet, Animated , Image} from 'react-native';
import {useNavigation} from "@react-navigation/native"; //다른 대로 이동
import {StatusBar} from "expo-status-bar";
import constants from "../constants/constants";
import { SIZES, FONTS, COLORS } from "../constants/theme";


const Onboarding = () => {

    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef();

    const [currentIndex, setCurrentIndex] = useState(0)

    const onViewChangeRef = useRef(({ viewableItems, changed }) => {
        setCurrentIndex(viewableItems[0].index)
    })
    return (
        <View style={styles.mainContainer}>
            <StatusBar style={"auto"} />
            <Animated.FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                data={constants.onboarding_screens}
                scrollEventThrottle={16}
                snapToAlignment={"center"}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={onViewChangeRef.current}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: SIZES.width }}>
                            <View style={{ flex: 3 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        width: '100%',
                                        height: index == 1 ? "86%" : "100%"
                                    }}
                                >
                                    <Image
                                        source={item.bannerImage}
                                        resizeMode={'contain'}
                                        style={{ width: 300, height: 300 }}
                                    />
                                </View>
                            </View>

                            <View style={styles.detailContainer}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                                <Text  style={styles.desc}>
                                    {item.description}
                                </Text>

                            </View>

                        </View>
                    )
                }}
            />
        </View>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:COLORS.white
    },
    detailContainer: {
        flex:1,
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal: SIZES.radius,
        marginVertical:SIZES.padding+15
    },
    title:{
        ...FONTS.h1,
        fontSize: 24
    },
    desc:{
        marginTop:SIZES.radius,
        textAlign:'center',
        color:COLORS.gray,
        paddingHorizontal:SIZES.padding,
        ...FONTS.body3
    }
})