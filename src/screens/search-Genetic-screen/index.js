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

const SearchGeneticScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedConditions, setSelectedConditions] = useState(['MKS1', 'MKS1']);

  // All genetic conditions list
  const allConditions = useMemo(
    () => [
      {
        name: '17-Beta Hydroxysteroid Dehydrogenase 3 Deficiency',
        abbreviation: 'HSD17B.3',
      },
      {
        name: '21-Alpha-Hydroxylase-Deficient Congenital Adrenal Hyperplasia',
        abbreviation: 'CYP21A2',
      },
      {
        name: '3-Hydroxy-3-Methylglutaryl-CoA Lyase Deficiency',
        abbreviation: 'HMGCL',
      },
      {
        name: '3-Methylcrotonyl-CoA Carboxylase Deficiency, MCCC1-Related',
        abbreviation: 'MCCC1',
      },
      {
        name: '3-Methylcrotonyl-CoA Carboxylase Deficiency, MCCC2-Related',
        abbreviation: 'MCCC2',
      },
      {
        name: '3-Methylglutaconic Aciduria Type IIL also known as Costeff Optic Atrophy',
        abbreviation: 'OPA3',
      },
      {
        name: '3-Phosphoglycerate Dehydrogenase Deficiency_ PHGDH-Related',
        abbreviation: 'PHGDH',
      },
      {
        name: '6-Pyruvoyl-Tetrahydropterin Synthase Deficiency',
        abbreviation: 'PTS',
      },
      {
        name: 'Aarskog-Scott Syndrome',
        abbreviation: 'FGD1',
      },
      {
        name: 'Abetalipoproteinemia',
        abbreviation: 'MTTP',
      },
      {
        name: 'Achondroplasia',
        abbreviation: 'FGFR3',
      },
      {
        name: 'Acute Intermittent Porphyria',
        abbreviation: 'HMBS',
      },
    ],
    [],
  );

  // Filtered conditions based on search
  const filteredConditions = useMemo(() => {
    if (!searchText.trim()) {
      return allConditions;
    }
    return allConditions.filter(
      condition =>
        condition.name.toLowerCase().includes(searchText.toLowerCase()) ||
        condition.abbreviation.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, allConditions]);

  const toggleCondition = abbreviation => {
    if (selectedConditions.includes(abbreviation)) {
      setSelectedConditions(
        selectedConditions.filter(c => c !== abbreviation),
      );
    } else {
      setSelectedConditions([...selectedConditions, abbreviation]);
    }
  };

  const handleClearAll = () => {
    setSelectedConditions([]);
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
        <Bold label="Exclude Conditions" fontSize={mvs(18)} color={colors.textColor} />
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="close" size={mvs(22)} color={colors.black} />
        </TouchableOpacity>
      </Row>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: mvs(100)}}>
        {/* Exclusion Mode Section */}
        <View style={styles.exclusionSection}>
          <Medium
            label="EXCLUSION MODE"
            fontSize={mvs(14)}
            color={colors.textColor}
            style={styles.exclusionTitle}
          />
          <Regular
            label="Donors who are carriers of the conditions selected below will be REMOVED from your search results."
            fontSize={mvs(14)}
            numberOfLines={10}
            color="#8C8C8C"
            style={styles.exclusionDescription}
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={mvs(20)} color="#8C8C8C" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conditions to exclude"
              placeholderTextColor="#8C8C8C"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Selected Section */}
        {selectedConditions.length > 0 && (
          <>
            <Medium
              label="Selected"
              fontSize={mvs(14)}
              color={colors.black}
              style={styles.sectionTitle}
            />
            <View style={styles.chipRow}>
              {selectedConditions.map((condition, index) => (
                <SelectedChip
                  key={`${condition}-${index}`}
                  label={`(${condition})`}
                  onRemove={() => toggleCondition(condition)}
                />
              ))}
            </View>
            <View style={styles.divider} />
          </>
        )}

        {/* Conditions List */}
        <View style={styles.conditionsList}>
          {filteredConditions.map(condition => (
            <TouchableOpacity
              key={condition.abbreviation}
              style={styles.conditionItem}
              onPress={() => toggleCondition(condition.abbreviation)}>
              <View style={styles.conditionTextContainer}>
                <Regular
                  label={condition.name}
                  fontSize={mvs(14)}
                  numberOfLines={10}
                  color={colors.textColor}
                />
                <Regular
                  label={`(${condition.abbreviation})`}
                  fontSize={mvs(14)}
                  numberOfLines={10}
                  color="#8C8C8C"
                  style={{marginTop: mvs(2)}}
                />
              </View>
              {selectedConditions.includes(condition.abbreviation) && (
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
            label={`Clear all (${selectedConditions.length})`}
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

export default SearchGeneticScreen;

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
    paddingHorizontal: mvs(0),
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
  exclusionSection: {
    marginTop: mvs(12),
    marginBottom: mvs(16),
  },
  exclusionTitle: {
    marginBottom: mvs(8),
  },
  exclusionDescription: {
    lineHeight: mvs(18),
  },
  sectionTitle: {
    marginBottom: mvs(12),
    marginTop: mvs(8),
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
  conditionsList: {
    marginTop: mvs(8),
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: mvs(14),
  },
  conditionTextContainer: {
    flex: 1,
    marginRight: mvs(12),
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
