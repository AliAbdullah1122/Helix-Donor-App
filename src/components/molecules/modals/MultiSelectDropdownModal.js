import { CrossModal } from 'assets/icons';
import { ModalWrapper } from 'components/atoms/modal-wrapper';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { t } from 'i18next';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Medium from 'typography/medium-text';
import { PrimaryButton } from 'components/atoms/buttons';

const MultiSelectDropdownModal = ({
    style = {},
    visible = false,
    onClose = () => { },
    onSave = (selectedIds) => { },
    items = [],
    selectedIds = [],
    title = 'Select Adjectives',
}) => {
    const [currentSelected, setCurrentSelected] = useState(selectedIds);

    useEffect(() => {
        setCurrentSelected(selectedIds);
    }, [selectedIds, visible]);

    const toggleItem = (id) => {
        if (currentSelected.includes(id)) {
            setCurrentSelected(currentSelected.filter(item => item !== id));
        } else {
            setCurrentSelected([...currentSelected, id]);
        }
    };

    const handleSave = () => {
        onSave(currentSelected);
        onClose();
    };

    return (
        <ModalWrapper
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            visible={visible}
            style={[styles.contentContainerStyle, style]}>
            <View style={styles.container}>
                <View style={styles.header} />
                <TouchableOpacity onPress={onClose} style={styles.cross}>
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
                        const isSelected = currentSelected.includes(item?.id);
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => toggleItem(item?.id)}
                                style={styles.button}>
                                <Medium
                                    label={item?.title || item?.name}
                                    color={colors.black}
                                    style={{ fontSize: mvs(16) }}
                                />
                                <Icon
                                    name={isSelected ? 'check-box' : 'check-box-outline-blank'}
                                    size={mvs(24)}
                                    color={isSelected ? colors.primary : colors.lightGray}
                                />
                            </TouchableOpacity>
                        );
                    })}

                    <PrimaryButton
                        title="Save Selection"
                        onPress={handleSave}
                        containerStyle={styles.saveBtn}
                    />
                </ScrollView>
            </View>
        </ModalWrapper>
    );
};

export default MultiSelectDropdownModal;

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
        minHeight: mvs(300),
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
        paddingVertical: mvs(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderBottomColor: colors.lightGray,
    },
    cross: {
        padding: mvs(18),
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 1,
    },
    saveBtn: {
        marginTop: mvs(30),
        marginBottom: mvs(10),
        borderRadius: mvs(30),
    }
});
