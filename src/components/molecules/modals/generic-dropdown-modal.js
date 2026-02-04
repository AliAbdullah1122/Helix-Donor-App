import { CrossModal } from 'assets/icons';
import { ModalWrapper } from 'components/atoms/modal-wrapper';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Medium from 'typography/medium-text';

const GenericDropdownModal = ({
    style = {},
    value,
    visible = false,
    onClose = () => { },
    onSelect = () => { },
    items = [],
    title = 'Select Option',
}) => {
    return (
        <ModalWrapper
            onBackdropPress={() => onClose()}
            onBackButtonPress={() => onClose()}
            visible={visible}
            style={[styles.contentContainerStyle, style]}>
            <View style={styles.container}>
                <View style={styles.header} />
                <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
                    <CrossModal height={mvs(25)} width={mvs(25)} />
                </TouchableOpacity>
                <Medium
                    numberOfLines={2}
                    style={styles.pick}
                    label={title}
                    color={colors.black}
                />
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: mvs(20),
                        paddingTop: mvs(10),
                        paddingBottom: mvs(20),
                    }}>
                    {items?.map((item, index) => {
                        // Check if item is selected based on title or ID matches the value string
                        const isSelected = item?.title === value || item?.label === value || item?.id === value;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => onSelect(item)}
                                style={styles.button}>
                                <Medium
                                    label={item?.label || item?.title || item?.name}
                                    color={colors.black}
                                    style={{ fontSize: mvs(16) }}
                                />
                                <Icon
                                    name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
                                    size={mvs(20)}
                                    color={isSelected ? colors.primary : colors.textColorSecondary}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </ModalWrapper>
    );
};

export default GenericDropdownModal;

const styles = StyleSheet.create({
    contentContainerStyle: {
        width: '100%',
        backgroundColor: colors.transparent,
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    container: {
        maxHeight: mvs(572),
        minHeight: mvs(200),
        backgroundColor: colors.white,
        paddingTop: mvs(15),
        borderTopRightRadius: mvs(20),
        borderTopLeftRadius: mvs(20),
    },
    header: {
        height: mvs(3),
        borderRadius: mvs(5),
        width: mvs(104),
        alignSelf: 'center',
        backgroundColor: colors.lightGray,
        marginBottom: mvs(20),
    },
    pick: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: mvs(20),
        marginBottom: mvs(10),
    },
    button: {
        paddingHorizontal: mvs(10),
        marginBottom: mvs(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.7,
        borderBottomColor: colors.lightGray,
        paddingBottom: mvs(10),
    },
    cross: {
        padding: mvs(18),
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 0,
        right: 0,
    },
});
