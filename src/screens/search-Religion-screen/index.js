import React, {useState, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {navigate, goBack} from 'navigation/navigation-ref';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const SearchReligionScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedOccupations, setSelectedOccupations] = useState(['Doctor']);

  // All occupations list
  const allOccupations = useMemo(
    () => [
      'Doctor',
      'Teacher',
      'Athlete',
      'Engineer',
      'Scientist',
    
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
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* Header */}
      <Row style={styles.headerRow}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-back-ios" size={mvs(22)} color={colors.textColor} />
        </TouchableOpacity>
        <Bold label="Religion" fontSize={mvs(18)} color={colors.textColor} />
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="close" size={mvs(22)} color={colors.black} />
        </TouchableOpacity>
      </Row>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={mvs(20)} color="#8C8C8C" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for an occupation"
            placeholderTextColor="#8C8C8C"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Divider */}
      {/* <View style={styles.divider} /> */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: mvs(100)}}>
        {/* Selected Section */}
        {selectedOccupations.length > 0 && (
          <>
              <Medium
              label="Selected"
                fontSize={mvs(14)}
              color={colors.black}
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
                color={colors.black}
              />
              {selectedOccupations.includes(occupation) && (
                <Icon name="checkmark" size={mvs(20)} color={colors.primary} />
              )}
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

const SelectedChip = ({label, onRemove}) => {
  return (
    <TouchableOpacity style={styles.selectedChip} onPress={onRemove}>
      <Regular
        label={label}
        fontSize={mvs(13)}
        color={colors.white}
      />
      <Icon name="close" size={mvs(14)} color={colors.white} style={{marginLeft: mvs(6)}} />
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
    paddingVertical: mvs(12),
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: mvs(40),
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: mvs(12),
    fontSize: mvs(14),
    color: colors.black,
  },
  divider: {
    height: mvs(1.5),
    backgroundColor: '#E5E5E5',
    // marginHorizontal: mvs(20),
    marginVertical: mvs(12),
    width:"100%"
  },
  scroll: {
    flex: 1,
    paddingHorizontal: mvs(20),
  },
  sectionTitle: {
    marginBottom: mvs(12),
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
    alignItems: 'center',
    paddingHorizontal: mvs(14),
    paddingVertical: mvs(6),
    borderRadius: mvs(20),
    backgroundColor: colors.primary,
  },
  occupationList: {
    marginTop: mvs(8),
  },
  occupationItem: {
     flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mvs(14),
  },
  bottomButtonsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: mvs(20),
    paddingHorizontal: mvs(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: mvs(12),
  },
  clearButton: {
    flex: 1,
    height: mvs(48),
    borderRadius: mvs(24),
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
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
