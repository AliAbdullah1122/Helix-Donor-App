import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,

  Platform,
} from 'react-native';
import { mvs } from 'config/metrices';
import { colors } from 'config/colors';
import * as IMG from 'assets/images';
import { Row } from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigate, goBack } from 'navigation/navigation-ref';
import fonts from 'assets/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SearchReligionScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedOccupations, setSelectedOccupations] = useState(['Agnostic']);

  // All occupations list
  const allOccupations = useMemo(
    () => [
      'Atheist',
      'Baha\'i',
      'Buddhism',
      'Christianity',
      'Hinduism',
      'Islam',
      'Jainism',
      'Shinto',
      'Sikhism',
      'Spiritual but not religious',
      'Other',
      'None',
    ],
    [],
  );

  // Filtered occupations based on search
  const filteredOccupations = useMemo(() => {
    if (!searchText.trim()) {
      return allOccupations;
    }
    return allOccupations.filter(occupation =>
      occupation.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, allOccupations]);

  const toggleOccupation = occupation => {
    if (selectedOccupations.includes(occupation)) {
      setSelectedOccupations(
        selectedOccupations.filter(o => o !== occupation),
      );
    } else {
      setSelectedOccupations([...selectedOccupations, occupation]);
    }
  };

  const handleClearAll = () => {
    setSelectedOccupations([]);
  };

  const handleSave = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ marginBottom: Platform.OS === 'ios' ? mvs(-34) : 0 }} />
      <StatusBar backgroundColor={colors.helixBackground} barStyle="dark-content" />

      {/* Header */}
      <Row style={styles.headerRow}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-back-ios" size={mvs(22)} color={colors.textColorSecondary} />
        </TouchableOpacity>
        <Bold label="Religion" fontSize={mvs(18)} color={colors.textColor} />
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="close" size={mvs(22)} color={colors.textColorSecondary} />
        </TouchableOpacity>
      </Row>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          {/* <Icon name="search" size={mvs(20)} color="#8C8C8C" /> */}
          <IMG.SearchNew width={mvs(18)} height={mvs(18)} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.placeholder}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Divider */}
      {/* <View style={styles.divider} /> */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: mvs(100) }}>
        {/* Selected Section */}
        {selectedOccupations.length > 0 && (
          <>
            <Bold
              label="Selected"
              fontSize={mvs(14)}
              color={colors.textColor}
              style={styles.sectionTitle}
            />
            <View style={styles.chipRow}>
              {selectedOccupations.map(occupation => (
                <SelectedChip
                  key={occupation}
                  label={occupation}
                  onRemove={() => toggleOccupation(occupation)}
                />
              ))}
            </View>
            <View style={styles.divider} />
          </>
        )}

        {/* Occupation List */}
        <View style={styles.occupationList}>
          {filteredOccupations.map(occupation => (
            <TouchableOpacity
              key={occupation}
              style={styles.occupationItem}
              onPress={() => toggleOccupation(occupation)}>
              <Regular
                label={occupation}
                fontSize={mvs(14)}
                color={colors.textColor}
                style={{ fontWeight: mvs('400') }}
              />
              {/* {selectedOccupations.includes(occupation) && (
                <Icon name="checkmark" size={mvs(20)} color={colors.primary} />
              )} */}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <Row style={styles.bottomButtonsRow}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
          <Medium
            label={`Clear all (${selectedOccupations.length})`}
            fontSize={mvs(14)}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Medium label="Save" fontSize={mvs(14)} color={colors.white} />
        </TouchableOpacity>
      </Row>
    </View>
  );
};

const SelectedChip = ({ label, onRemove }) => {
  return (
    <TouchableOpacity style={styles.selectedChip} onPress={onRemove}>
      <Regular
        label={label}
        fontSize={mvs(12)}
        color={colors.white}
        style={{ fontWeight: "400" }}
      />
      <Icon name="close" size={mvs(14)} color={colors.white} style={{ marginLeft: mvs(5) }} />
    </TouchableOpacity>
  );
};

export default SearchReligionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F9',
  },
  headerRow: {
    paddingHorizontal: mvs(20),
    paddingTop: mvs(20),
    paddingBottom: mvs(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(20),

  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: mvs(40),
    paddingHorizontal: mvs(16),
    height: mvs(46),
    // paddingVertical: mvs(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: mvs(10),
    fontSize: mvs(14),
  color: colors.inputText,
    fontWeight: "400",
    fontFamily: fonts.regular
  },
  divider: {
    height: mvs(1.5),
    // backgroundColor: '#E5E5E5',
    backgroundColor: colors.placeholder,
    // marginHorizontal: mvs(20),
    marginVertical: mvs(12),
    width: "100%"
  },
  scroll: {
    flex: 1,
    paddingHorizontal: mvs(20),
    paddingVertical:mvs(10),
  },
  sectionTitle: {
    marginBottom: mvs(12),
    fontWeight: "600"
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: mvs(8),
    columnGap: mvs(8),
    marginBottom: mvs(8),
  },
  selectedChip: {
    flexDirection: 'row',
    minHeight: mvs(30),
    alignItems: 'center',
    paddingHorizontal: mvs(10),
    justifyContent: "center",
    paddingVertical: mvs(6),
    borderRadius: mvs(20),
    backgroundColor: colors.primary,
  },
  occupationList: {
    // marginTop: mvs(8),
  },
  occupationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mvs(10),
  },
  bottomButtonsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: mvs(20),
    paddingHorizontal: mvs(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: mvs(20),
    columnGap: mvs(12),
  },
  clearButton: {
    flex: 1,
    height: mvs(48),
    borderRadius: mvs(24),
    borderWidth: 1.8,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
        backgroundColor: colors.helixBackground,
    // backgroundColor: colors.white,
    marginRight: mvs(8),
  },
  saveButton: {
    flex: 1,
    height: mvs(48),
    borderRadius: mvs(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginLeft: mvs(8),
  },
});