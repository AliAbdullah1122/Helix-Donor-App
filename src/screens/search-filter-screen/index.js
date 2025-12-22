import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from 'navigation/navigation-ref';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const SearchFilterScreen = () => {
const navigation = useNavigation();
  const [intentExpanded, setIntentExpanded] = useState(false);
  const [basicsExpanded, setBasicsExpanded] = useState(false);
  const [physicalExpanded, setPhysicalExpanded] = useState(false);
  const [ancestryExpanded, setAncestryExpanded] = useState(false);
  const [medicalExpanded, setMedicalExpanded] = useState(false);
  const [geneticExpanded, setGeneticExpanded] = useState(false);
  const [vialExpanded, setVialExpanded] = useState(false);
  const [donorTypeExpanded, setDonorTypeExpanded] = useState(false);

  const [selectedGoals, setSelectedGoals] = useState(['Donor + Relationship']);
  const [selectedSeeking, setSelectedSeeking] = useState(['Sperm']);
  const [selectedMarital, setSelectedMarital] = useState(['Married']);
  const [selectedEducation, setSelectedEducation] = useState(['Specialized Training']);
  const [selectedDiet, setSelectedDiet] = useState(['Pescatarian']);
  const [selectedHairColor, setSelectedHairColor] = useState(['Auburn']);
  const [selectedEyeColor, setSelectedEyeColor] = useState(['Blue']);
  const [selectedBuild, setSelectedBuild] = useState(['Slim']);
  const [selectedJewishAncestry, setSelectedJewishAncestry] = useState(['Yes']);
  const [selectedBloodType, setSelectedBloodType] = useState(['A+']);
  const [selectedCMV, setSelectedCMV] = useState(['Negative']);
  const [selectedVialType, setSelectedVialType] = useState(['IUI (Washed)']);
  const [geneticVerified, setGeneticVerified] = useState(true);
  const [geneticNonCarrier, setGeneticNonCarrier] = useState(true);
  const [selectedGeneticConditions, setSelectedGeneticConditions] = useState(['MKS1', 'MKS1']);
  const [donorBanks, setDonorBanks] = useState(true);
  const [privateDonors, setPrivateDonors] = useState(true);
  const [xyClassicLimited, setXyClassicLimited] = useState(true);
  const [ageRange, setAgeRange] = useState([22, 30]);
  const [locationRange, setLocationRange] = useState([100]);
  const [heightRange, setHeightRange] = useState([67, 71]); // 5'7" to 5'11" in inches
  const [weightRange, setWeightRange] = useState([150, 175]);
  const [educationUnlocked, setEducationUnlocked] = useState(false);
  const [heightUnlocked, setHeightUnlocked] = useState(false);
  const [eyeColorUnlocked, setEyeColorUnlocked] = useState(false);
  const [geneticUnlocked, setGeneticUnlocked] = useState(false);


  const reduxState = useSelector(state => state);
console.log('Redux State:', reduxState);

const subscribed = useSelector(state => state.user.subscribed);
console.log('Subscribed:', subscribed);

  console.log('Subscribed:', subscribed);
  useEffect(() => {
  if (subscribed) {
    setEducationUnlocked(true);
    setHeightUnlocked(true);
    setEyeColorUnlocked(true);
    setGeneticUnlocked(true);
  } else {
    // optional: lock again if unsubscribed
    setEducationUnlocked(false);
    setHeightUnlocked(false);
    setEyeColorUnlocked(false);
    setGeneticUnlocked(false);
  }
}, [subscribed]);

  const toggleGoal = value => {
    if (selectedGoals.includes(value)) {
      setSelectedGoals(selectedGoals.filter(g => g !== value));
    } else {
      setSelectedGoals([...selectedGoals, value]);
    }
  };

  const toggleSeeking = value => {
    if (selectedSeeking.includes(value)) {
      setSelectedSeeking(selectedSeeking.filter(s => s !== value));
    } else {
      setSelectedSeeking([...selectedSeeking, value]);
    }
  };

  const toggleMarital = value => {
    if (selectedMarital.includes(value)) {
      setSelectedMarital(selectedMarital.filter(m => m !== value));
    } else {
      setSelectedMarital([...selectedMarital, value]);
    }
  };

  const toggleEducation = value => {
    if (selectedEducation.includes(value)) {
      setSelectedEducation(selectedEducation.filter(e => e !== value));
    } else {
      setSelectedEducation([...selectedEducation, value]);
    }
  };

  const toggleDiet = value => {
    if (selectedDiet.includes(value)) {
      setSelectedDiet(selectedDiet.filter(d => d !== value));
    } else {
      setSelectedDiet([...selectedDiet, value]);
    }
  };

  const toggleHairColor = value => {
    if (selectedHairColor.includes(value)) {
      setSelectedHairColor(selectedHairColor.filter(h => h !== value));
    } else {
      setSelectedHairColor([...selectedHairColor, value]);
    }
  };

  const toggleEyeColor = value => {
    if (selectedEyeColor.includes(value)) {
      setSelectedEyeColor(selectedEyeColor.filter(e => e !== value));
    } else {
      setSelectedEyeColor([...selectedEyeColor, value]);
    }
  };

  const toggleBuild = value => {
    if (selectedBuild.includes(value)) {
      setSelectedBuild(selectedBuild.filter(b => b !== value));
    } else {
      setSelectedBuild([...selectedBuild, value]);
    }
  };

  const toggleJewishAncestry = value => {
    setSelectedJewishAncestry([value]);
  };

  const toggleBloodType = value => {
    if (selectedBloodType.includes(value)) {
      setSelectedBloodType(selectedBloodType.filter(b => b !== value));
    } else {
      setSelectedBloodType([...selectedBloodType, value]);
    }
  };

  const toggleCMV = value => {
    setSelectedCMV([value]);
  };

  const toggleVialType = value => {
    setSelectedVialType([value]);
  };

  const formatHeight = inches => {
    const feet = Math.floor(inches / 12);
    const inch = inches % 12;
    return `${feet}'${inch}"`;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* Header */}
      <Row style={styles.headerRow}>
        <View />
        <Bold label="Filter" fontSize={mvs(18)} color={colors.black} />
        <TouchableOpacity
        //  onPress={() => navigate('SearchScreen')}
    onPress={() => navigation.goBack()}
         >
          <Icon name="close" size={mvs(22)} color={colors.black} />
        </TouchableOpacity>
      </Row>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: mvs(120)}}>
        {/* Intent & Goals card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setIntentExpanded(!intentExpanded)}>
            <Row style={{alignItems: 'center',justifyContent:"flex-start", flex: 1}}>
              <IMG.Filtergoal width={mvs(20)} height={mvs(20)} />
              <Medium
                label="INTENT & GOALS"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginLeft: mvs(8)}}
              />
            </Row>
            <Icon
              name={intentExpanded ? 'chevron-up' : 'chevron-down'}
              size={mvs(18)}
              color={colors.black}
            />
          </TouchableOpacity>

          {intentExpanded && (
            <View style={styles.cardBody}>
              <Medium
                label="Their Goal is"
                fontSize={mvs(14)}
                color={colors.black}
              />
              <View style={styles.chipRow}>
                {['Co-Parenting', 'Private Donor', 'Donor + Relationship', 'Donor + Marriage'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedGoals.includes(item)}
                      onPress={() => toggleGoal(item)}
                    />
                  ),
                )}
              </View>

              <Medium
                label="I'm Seeking"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginTop: mvs(16)}}
              />
              <Row style={styles.seekingRow}>
                {['Sperm', 'Egg'].map((item, index) => (
                  <View key={item} style={index > 0 && styles.seekingChip}>
                    <FilterChip
                      label={item}
                      selected={selectedSeeking.includes(item)}
                      onPress={() => toggleSeeking(item)}
                    />
                  </View>
                ))}
              </Row>
            </View>
          )}
        </View>

        {/* Basics card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setBasicsExpanded(!basicsExpanded)}>
             <Row style={{alignItems: 'center',justifyContent:"flex-start", flex: 1}}>
              <IMG.FilterBasis width={mvs(20)} height={mvs(20)} />
              <Medium
                label="BASICS"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginLeft: mvs(8)}}
              />
            </Row>
            <Icon
              name={basicsExpanded ? 'chevron-up' : 'chevron-down'}
              size={mvs(18)}
              color={colors.black}
            />
          </TouchableOpacity>

          {basicsExpanded && (
            <View style={styles.cardBody}>
              {/* Age Range */}
              <Medium
                label="Age Range"
                fontSize={mvs(14)}
                color={colors.black}
              />
              <View style={styles.sliderWrapper}>
                <Row style={styles.sliderLabels}>
                  <Regular
                    label={ageRange[0].toString()}
                    fontSize={mvs(12)}
                    color={colors.black}
                  />
                  <Regular
                    label={ageRange[1].toString()}
                    fontSize={mvs(12)}
                    color={colors.black}
                  />
                </Row>
                <MultiSlider
                  values={ageRange}
                  onValuesChange={setAgeRange}
                  min={18}
                  max={60}
                  step={1}
                  allowOverlap={false}
                  snapped
                  trackStyle={styles.sliderTrack}
                  selectedStyle={styles.sliderSelected}
                  unselectedStyle={styles.sliderUnselected}
                  markerStyle={styles.sliderMarker}
                  containerStyle={styles.sliderContainer}
                />
              </View>

              {/* Location */}
              <Row style={{marginTop: mvs(20), justifyContent: 'space-between'}}>
                <Medium
                  label="Location"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <Regular
                  label={`Within ${locationRange[0]} miles`}
                  fontSize={mvs(12)}
                  color="#8C8C8C"
                />
              </Row>
              <View style={styles.sliderWrapper}>
                <MultiSlider
                  values={locationRange}
                  onValuesChange={setLocationRange}
                  min={0}
                  max={500}
                  step={10}
                  snapped
                  trackStyle={styles.sliderTrack}
                  selectedStyle={styles.sliderSelected}
                  unselectedStyle={styles.sliderUnselected}
                  markerStyle={styles.sliderMarker}
                  containerStyle={styles.sliderContainer}
                />
              </View>

              {/* Marital Status */}
              <Medium
                label="Marital Status"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginTop: mvs(20)}}
              />
              <View style={styles.chipRow}>
                {['Single', 'Married', 'Divorced', 'Any'].map(item => (
                  <FilterChip
                    key={item}
                    label={item}
                    selected={selectedMarital.includes(item)}
                    onPress={() => toggleMarital(item)}
                  />
                ))}
              </View>

              {/* Education */}
              <Row style={{marginTop: mvs(20), alignItems: 'center'}}>
                <Medium
                  label="Education"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <IMG.FilterLock width={mvs(16)} height={mvs(16)} style={{marginLeft: mvs(8)}} />
                {/* <View style={styles.lockDot} /> */}
              </Row>
              <View style={styles.chipRow}>
                {['In School', 'High School', 'Undergraduate Degree', 'Graduate Degree', 'Associate\'s Degree', 'Post Graduate Degree', 'Specialized Training', 'Doctorate'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedEducation.includes(item)}
                      onPress={() => toggleEducation(item)}
                      isLocked={!educationUnlocked}
                    />
                  ),
                )}
              </View>
              {!educationUnlocked && (
                
                // <TouchableOpacity style={styles.unlockButton} onPress={() => setEducationUnlocked(true)}>
                <TouchableOpacity style={styles.unlockButton} onPress={() => navigate('PremiumUnlockFilterScreen')}>
                  <Medium
                    label="Unlock"
                    fontSize={mvs(14)}
                    color={colors.white}
                  />
                </TouchableOpacity>
              )}

              {/* Diet */}
              <Medium
                label="Diet"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginTop: mvs(20)}}
              />
              <View style={styles.chipRow}>
                {['Omnivore', 'Pescatarian', 'Vegetarian', 'Vegan', 'Kosher', 'Halal', 'Gluten-Free'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedDiet.includes(item)}
                      onPress={() => toggleDiet(item)}
                    />
                  ),
                )}
              </View>

              {/* Occupation */}
              {/* <TouchableOpacity style={styles.navigationRow}> */}
              <TouchableOpacity style={styles.navigationRow} onPress={() => navigate('SearchOccupationScreen')}>
                <Medium
                  label="Occupation (2 Selected)"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <Icon name="chevron-forward" size={mvs(18)} color={colors.black} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Physical Attributes card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setPhysicalExpanded(!physicalExpanded)}>
          <Row style={{alignItems: 'center',justifyContent:"flex-start", flex: 1}}>
              <IMG.FilterPhysical width={mvs(20)} height={mvs(20)} />
              <Medium
                label="PHYSICAL ATTRIBUTES"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginLeft: mvs(8)}}
              />
            </Row>
            <Icon
              name={physicalExpanded ? 'chevron-up' : 'chevron-down'}
              size={mvs(18)}
              color={colors.black}
            />
          </TouchableOpacity>
          {physicalExpanded && (
            <View style={styles.cardBody}>
              {/* Height */}
              <Row style={{alignItems: 'center'}}>
                <Medium
                  label="Height"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <IMG.FilterLock width={mvs(16)} height={mvs(16)} style={{marginLeft: mvs(8)}} />
                {/* <View style={styles.lockDot} /> */}
              </Row>
              <View style={styles.sliderWrapper}>
                <Row style={styles.sliderLabels}>
                  <Regular
                    label={formatHeight(heightRange[0])}
                    fontSize={mvs(12)}
                    color={colors.black}
                  />
                  <Regular
                    label={formatHeight(heightRange[1])}
                    fontSize={mvs(12)}
                    color={colors.black}
                  />
                </Row>
                <MultiSlider
                  values={heightRange}
                  onValuesChange={setHeightRange}
                  min={60}
                  max={84}
                  step={1}
                  allowOverlap={false}
                  snapped
                  trackStyle={styles.sliderTrack}
                  selectedStyle={styles.sliderSelected}
                  unselectedStyle={styles.sliderUnselected}
                  markerStyle={styles.sliderMarker}
                  containerStyle={styles.sliderContainer}
                />
              </View>
              {!heightUnlocked && (
                // <TouchableOpacity style={styles.unlockButton} onPress={() => setHeightUnlocked(true)}>
                <TouchableOpacity style={styles.unlockButton} onPress={() => navigate('PremiumUnlockFilterScreen')}>
                  <Medium
                    label="Unlock"
                    fontSize={mvs(14)}
                    color={colors.white}
                  />
                </TouchableOpacity>
              )}

              {/* Weight */}
              <Medium
                label="Weight"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginTop: mvs(20)}}
              />
              <View style={styles.sliderWrapper}>
                <Row style={styles.sliderLabels}>
                  <Regular
                    label={weightRange[0].toString()}
                    fontSize={mvs(12)}
                    color={colors.black}
                  />
                  <Regular
                    label={`${weightRange[1]} lbs`}
                    fontSize={mvs(12)}
                    color={colors.black}
                  />
                </Row>
                <MultiSlider
                  values={weightRange}
                  onValuesChange={setWeightRange}
                  min={100}
                  max={300}
                  step={1}
                  allowOverlap={false}
                  snapped
                  trackStyle={styles.sliderTrack}
                  selectedStyle={styles.sliderSelected}
                  unselectedStyle={styles.sliderUnselected}
                  markerStyle={styles.sliderMarker}
                  containerStyle={styles.sliderContainer}
                />
              </View>
              <Row style={{justifyContent: 'flex-end', marginTop: mvs(4)}}>
                <Regular
                  label={`${weightRange[0]} - ${weightRange[1]} lbs`}
                  fontSize={mvs(12)}
                  color="#8C8C8C"
                />
              </Row>

              {/* Hair Color */}
              <Medium
                label="Hair Color"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginTop: mvs(20)}}
              />
              <View style={styles.chipRow}>
                {['Black', 'Blonde', 'Brown', 'Red', 'Auburn'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedHairColor.includes(item)}
                      onPress={() => toggleHairColor(item)}
                    />
                  ),
                )}
              </View>

              {/* Eye Color */}
              <Row style={{marginTop: mvs(20), alignItems: 'center'}}>
                <Medium
                  label="Eye Color"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <IMG.FilterLock width={mvs(16)} height={mvs(16)} style={{marginLeft: mvs(8)}} />
                {/* <View style={styles.lockDot} /> */}
              </Row>
              <View style={styles.chipRow}>
                {['Black', 'Green', 'Brown', 'Hazel', 'Blue'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedEyeColor.includes(item)}
                      onPress={() => toggleEyeColor(item)}
                      isLocked={!eyeColorUnlocked}
                    />
                  ),
                )}
              </View>
              {!eyeColorUnlocked && (
                // <TouchableOpacity style={styles.unlockButton} onPress={() => setEyeColorUnlocked(true)}>
                <TouchableOpacity style={styles.unlockButton} onPress={() => navigate('PremiumUnlockFilterScreen')}>
                  <Medium
                    label="Unlock"
                    fontSize={mvs(14)}
                    color={colors.white}
                  />
                </TouchableOpacity>
              )}

              {/* Build */}
              <Medium
                label="Build"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginTop: mvs(20)}}
              />
              <View style={styles.chipRow}>
                {['Athletic', 'Average', 'Curvy', 'Slim', 'Large'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedBuild.includes(item)}
                      onPress={() => toggleBuild(item)}
                    />
                  ),
                )}
              </View>
            </View>
          )}
        </View>

        {/* Ancestry & Background card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setAncestryExpanded(!ancestryExpanded)}>
             <Row style={{alignItems: 'center',justifyContent:"flex-start", flex: 1}}>
              <IMG.FilterAncestors width={mvs(20)} height={mvs(20)} />
              <Medium
                label="ANCESTRY & BACKGROUND"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginLeft: mvs(8)}}
              />
            </Row>
            <Icon
              name={ancestryExpanded ? 'chevron-up' : 'chevron-down'}
              size={mvs(18)}
              color={colors.black}
            />
          </TouchableOpacity>
          {ancestryExpanded && (
            <View style={styles.cardBody}>
              {/* Race / Ethnicity */}
              {/* <TouchableOpacity style={styles.navigationRow}> */}
              <TouchableOpacity style={styles.navigationRow} onPress={() => navigate('SearchEthnicityScreen')}>
                <Medium
                  label="Race / Ethnicity (2 Selected)"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <Icon name="chevron-forward" size={mvs(18)} color={colors.black} />
              </TouchableOpacity>

              {/* Nationality */}
              {/* <TouchableOpacity style={[styles.navigationRow, {marginTop: mvs(16)}]}> */}
              <TouchableOpacity style={[styles.navigationRow, {marginTop: mvs(16)}]} onPress={() => navigate('SearchNationlaityScreen')}>
                <Medium
                  label="Nationality (2 Selected)"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <Icon name="chevron-forward" size={mvs(18)} color={colors.black} />
              </TouchableOpacity>

              {/* Jewish Ancestry */}
              <Medium
                label="Jewish Ancestry"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginTop: mvs(16)}}
              />
              <View style={styles.chipRow}>
                {['Yes', 'No', 'Any'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedJewishAncestry.includes(item)}
                      onPress={() => toggleJewishAncestry(item)}
                    />
                  ),
                )}
              </View>

              {/* Religion */}
              {/* <TouchableOpacity style={[styles.navigationRow, {marginTop: mvs(16)}]}> */}
              <TouchableOpacity style={[styles.navigationRow, {marginTop: mvs(16)}]} onPress={() => navigate('SearchReligionScreen')}>
                <Medium
                  label="Religion (2 Selected)"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <Icon name="chevron-forward" size={mvs(18)} color={colors.black} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Medical Health card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setMedicalExpanded(!medicalExpanded)}>
              <Row style={{alignItems: 'center',justifyContent:"flex-start", flex: 1}}>
              <IMG.FilterMedical width={mvs(20)} height={mvs(20)} />
              <Medium
                label="MEDICAL HEALTH"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginLeft: mvs(8)}}
              />
            </Row>
            <Icon
              name={medicalExpanded ? 'chevron-up' : 'chevron-down'}
              size={mvs(18)}
              color={colors.black}
            />
          </TouchableOpacity>
          {medicalExpanded && (
            <View style={styles.cardBody}>
              {/* Blood Type */}
              <Medium
                label="Blood Type"
                fontSize={mvs(14)}
                color={colors.black}
              />
              <View style={styles.chipRow}>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedBloodType.includes(item)}
                      onPress={() => toggleBloodType(item)}
                    />
                  ),
                )}
              </View>

              {/* CMV Status */}
              <Medium
                label="CMV Status"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginTop: mvs(20)}}
              />
              <View style={styles.chipRow}>
                {['Positive', 'Negative', 'Any'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedCMV.includes(item)}
                      onPress={() => toggleCMV(item)}
                    />
                  ),
                )}
              </View>
            </View>
          )}
        </View>

        {/* Genetic Health card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setGeneticExpanded(!geneticExpanded)}>
              <Row style={{alignItems: 'center',justifyContent:"flex-start", flex: 1}}>
              <IMG.FilterGenetic width={mvs(20)} height={mvs(20)} />
              <Medium
                label="GENETIC HEALTH"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginLeft: mvs(8)}}
              />
            </Row>
            <Icon
              name={geneticExpanded ? 'chevron-up' : 'chevron-down'}
              size={mvs(18)}
              color={colors.black}
            />
          </TouchableOpacity>
          {geneticExpanded && (
            <View style={styles.cardBody}>
              {/* Exclusion Mode */}
              <Row style={{alignItems: 'center'}}>
                <Medium
                  label="EXCLUSION MODE"
                  fontSize={mvs(14)}
                  color={colors.black}
                />
                <IMG.FilterLock width={mvs(16)} height={mvs(16)} style={{marginLeft: mvs(8)}} />
                {/* <View style={styles.lockDot} /> */}
              </Row>
              <Regular
                label="Donors who are carriers of the conditions selected below will be REMOVED from your search results."
                fontSize={mvs(12)}
                color="#8C8C8C"
                style={{marginTop: mvs(8), lineHeight: mvs(18)}}
              />

              {/* Checkboxes */}
              <View style={styles.checkboxRow}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setGeneticVerified(!geneticVerified)}>
                  <View style={[styles.checkboxBox, geneticVerified && styles.checkboxChecked]}>
                    {geneticVerified && <Icon name="checkmark" size={mvs(14)} color={colors.white} />}
                  </View>
                  <Regular
                    label="Show only iGenomix Verified Donors"
                    fontSize={mvs(14)}
                    color={colors.black}
                    style={{marginLeft: mvs(12), flex: 1}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setGeneticNonCarrier(!geneticNonCarrier)}>
                  <View style={[styles.checkboxBox, geneticNonCarrier && styles.checkboxChecked]}>
                    {geneticNonCarrier && <Icon name="checkmark" size={mvs(14)} color={colors.white} />}
                  </View>
                  <Regular
                    label="Show only Non-Carrier Donors"
                    fontSize={mvs(14)}
                    color={colors.black}
                    style={{marginLeft: mvs(12), flex: 1}}
                  />
                </TouchableOpacity>
              </View>

              {/* Genetic Conditions Filter */}
              {/* <TouchableOpacity style={[styles.geneticFilterButton, {marginTop: mvs(16)}]}> */}
              <TouchableOpacity style={[styles.geneticFilterButton, {marginTop: mvs(16)}]} onPress={()=> navigate('SearchGeneticScreen')}>
                <Regular
                  label={`Genetic Conditions Filter (${selectedGeneticConditions.length})`}
                  fontSize={mvs(14)}
                  color="#8C8C8C"
                />
                <Icon name="chevron-forward" size={mvs(18)} color={colors.black} />
              </TouchableOpacity>

              {/* Selected Conditions */}
              {selectedGeneticConditions.length > 0 && (
                <>
                  <Medium
                    label="Selected:"
                    fontSize={mvs(14)}
                    color={colors.black}
                    style={{marginTop: mvs(16)}}
                  />
                  <View style={styles.chipRow}>
                    {selectedGeneticConditions.map((item, index) => (
                      <FilterChip
                        key={`${item}-${index}`}
                        label={item}
                        selected={true}
                        onPress={() => {
                          const newConditions = [...selectedGeneticConditions];
                          newConditions.splice(index, 1);
                          setSelectedGeneticConditions(newConditions);
                        }}
                        isLocked={!geneticUnlocked}
                      />
                    ))}
                  </View>
                </>
              )}

              {!geneticUnlocked && (
                // <TouchableOpacity style={styles.unlockButton} onPress={() => setGeneticUnlocked(true)}>
                <TouchableOpacity style={styles.unlockButton} onPress={() => navigate('PremiumUnlockFilterScreen')}>
                  <Medium
                    label="Unlock"
                    fontSize={mvs(14)}
                    color={colors.white}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Vial Type card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setVialExpanded(!vialExpanded)}>
              <Row style={{alignItems: 'center',justifyContent:"flex-start", flex: 1}}>
              <IMG.FilterVial width={mvs(20)} height={mvs(20)} />
              <Medium
                label="VIAL TYPE"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginLeft: mvs(8)}}
              />
            </Row>
            <Icon
              name={vialExpanded ? 'chevron-up' : 'chevron-down'}
              size={mvs(18)}
              color={colors.black}
            />
          </TouchableOpacity>
          {vialExpanded && (
            <View style={styles.cardBody}>
              <View style={styles.chipRow}>
                {['IUI (Washed)', 'ICI (Unwashed)', 'ART', 'Any'].map(
                  item => (
                    <FilterChip
                      key={item}
                      label={item}
                      selected={selectedVialType.includes(item)}
                      onPress={() => toggleVialType(item)}
                    />
                  ),
                )}
              </View>
            </View>
          )}
        </View>

        {/* Donor Type & Availability card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setDonorTypeExpanded(!donorTypeExpanded)}>
               <Row style={{alignItems: 'center',justifyContent:"flex-start", flex: 1}}>
              <IMG.FilterDonorType width={mvs(20)} height={mvs(20)} />
              <Medium
                label="DONOR TYPE & AVAILABILITY"
                fontSize={mvs(14)}
                color={colors.black}
                style={{marginLeft: mvs(8)}}
              />
            </Row>
            <Icon
              name={donorTypeExpanded ? 'chevron-up' : 'chevron-down'}
              size={mvs(18)}
              color={colors.black}
            />
          </TouchableOpacity>
          {donorTypeExpanded && (
            <View style={styles.cardBody}>
              <View style={styles.checkboxList}>
                <CheckboxItem
                  label="Donor Banks"
                  checked={donorBanks}
                  onPress={() => setDonorBanks(!donorBanks)}
                />
                <CheckboxItem
                  label="Private Donors"
                  checked={privateDonors}
                  onPress={() => setPrivateDonors(!privateDonors)}
                />
                <CheckboxItem
                  label="xyClassic Limited Donors"
                  checked={xyClassicLimited}
                  onPress={() => setXyClassicLimited(!xyClassicLimited)}
                />
                <CheckboxItem label="Current Available Inventory" checked={false} onPress={() => {}} />
                <CheckboxItem label="Audio File Available" checked={false} onPress={() => {}} />
                <CheckboxItem label="Retired Donors" checked={false} onPress={() => {}} />
                <CheckboxItem label="Has Children" checked={false} onPress={() => {}} />
                <CheckboxItem label="Legacy50 Donors" checked={false} onPress={() => {}} />
                <CheckboxItem label="Colorado Compliant" checked={false} onPress={() => {}} />
                <CheckboxItem label="xyLimited Donors" checked={false} onPress={() => {}} />
                <CheckboxItem label="xyGene Donors" checked={false} onPress={() => {}} />
                <CheckboxItem label="Non-Carrier Donors" checked={false} onPress={() => {}} />
                <CheckboxItem label="xySelect Donors" checked={false} onPress={() => {}} />
                <CheckboxItem label="Exclusive Donors" checked={false} onPress={() => {}} />
                <CheckboxItem label="Child Photo Available" checked={false} onPress={() => {}} />
                <CheckboxItem label="Adult Photo Available" checked={false} onPress={() => {}} />
                <CheckboxItem label="xyAnonymous" checked={false} onPress={() => {}} />
                <CheckboxItem label="xyIdentity Disclosure" checked={false} onPress={() => {}} />
                <CheckboxItem label="Keirsey Profile Available" checked={false} onPress={() => {}} />
                <CheckboxItem label="ART Vials Available" checked={false} onPress={() => {}} />
                <CheckboxItem label="Reported Pregnancy" checked={false} onPress={() => {}} />
                <CheckboxItem label="New Donors" checked={false} onPress={() => {}} />
                <CheckboxItem label="Canadian Compliant" checked={false} onPress={() => {}} />
                <CheckboxItem label="UK Compliant" checked={false} onPress={() => {}} />
                <CheckboxItem label="Only Donors with Photos" checked={false} onPress={() => {}} />
                <CheckboxItem label="Additional Sibling Only Donors" checked={false} onPress={() => {}} />
                <CheckboxItem label="Not Additional Children Only Donors" checked={false} onPress={() => {}} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <Row style={styles.bottomButtonsRow}>
        <TouchableOpacity style={styles.clearButton}>
          <Medium
            label="Clear all (4)"
            fontSize={mvs(14)}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>navigate("SearchResultFilterScreen")} style={styles.applyButton}>
          <Medium label="Show 12" fontSize={mvs(14)} color={colors.white} />
        </TouchableOpacity>
      </Row>
    </View>
  );
};

const CheckboxItem = ({label, checked, onPress}) => {
  return (
    <TouchableOpacity style={styles.checkbox} onPress={onPress}>
      <View style={[styles.checkboxBox, checked && styles.checkboxChecked]}>
        {checked && <Icon name="checkmark" size={mvs(14)} color={colors.white} />}
      </View>
      <Regular
        label={label}
        fontSize={mvs(14)}
        color={colors.black}
        style={{marginLeft: mvs(12), flex: 1}}
      />
    </TouchableOpacity>
  );
};

const FilterChip = ({label, selected, onPress, isLocked = false}) => {
  const handlePress = e => {
    e.stopPropagation();
    onPress();
  };

  const handleRemove = e => {
    e.stopPropagation();
    onPress();
  };

  const chipStyle = selected
    ? isLocked
      ? styles.chipSelectedLocked
      : styles.chipSelected
    : styles.chip;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={chipStyle}>
      <Regular
        label={label}
        fontSize={mvs(13)}
        color={selected ? colors.white : '#3F3F3F'}
      />
      {selected && (
        <TouchableOpacity
          onPress={handleRemove}
          style={styles.chipClose}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="close" size={mvs(14)} color={colors.white} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SearchFilterScreen;

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
  scroll: {
    flex: 1,
    paddingHorizontal: mvs(12),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: mvs(18),
    marginBottom: mvs(16),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardBody: {
    paddingHorizontal: mvs(16),
    paddingBottom: mvs(16),
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: mvs(8),
    columnGap: mvs(8),
    marginTop: mvs(10),
  },
  seekingRow: {
    flexDirection: 'row',
    justifyContent:"flex-start",
    flexWrap: 'wrap',
    rowGap: mvs(8),
    gap:mvs(6),
    columnGap: 10,
    marginTop: mvs(10),
    alignItems: 'center',
  },
  seekingChip: {
    marginRight: mvs(-4),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(14),
    paddingVertical: mvs(6),
    borderRadius: mvs(20),
    borderWidth: 1,
    borderColor: '#D4D4D8',
    backgroundColor: colors.white,
  },
  chipSelected: {
    // backgroundColor: colors.primary,
    // borderWidth: 0,
    // borderRadius: mvs(20),
    // paddingHorizontal: mvs(14),
    // paddingVertical: mvs(6),
    // paddingRight: mvs(8),
     flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(14),
    paddingVertical: mvs(6),
    borderRadius: mvs(20),
    borderWidth: 1,
    borderColor: '#D4D4D8',
    backgroundColor: colors.primary,
  },
  chipSelectedLocked: {
    // backgroundColor: '#8C8C8C',
    // borderWidth: 0,
    // borderRadius: mvs(20),
    // paddingHorizontal: mvs(14),
    // paddingVertical: mvs(6),
    // paddingRight: mvs(8),
     flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(14),
    paddingVertical: mvs(6),
    borderRadius: mvs(20),
    borderWidth: 1,
    borderColor: '#D4D4D8',
    backgroundColor: "#8C8C8C",
  },
  chipClose: {
    marginLeft: mvs(6),
    padding: mvs(2),
  },
  sliderWrapper: {
    marginTop: mvs(12),
    marginBottom: mvs(4),
  },
  sliderLabels: {
    justifyContent: 'space-between',
    marginBottom: mvs(8),
  },
  sliderContainer: {
    height: mvs(30),
  },
  sliderTrack: {
    height: mvs(4),
    borderRadius: mvs(2),
  },
  sliderSelected: {
    backgroundColor: colors.primary,
  },
  sliderUnselected: {
    backgroundColor: '#E0E0E0',
  },
  sliderMarker: {
    backgroundColor: colors.primary,
    width: mvs(16),
    height: mvs(16),
    borderRadius: mvs(8),
    borderWidth: 2,
    borderColor: colors.white,
  },
  bottomButtonsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: mvs(40),
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
  applyButton: {
    flex: 1,
    height: mvs(48),
    borderRadius: mvs(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginLeft: mvs(8),
  },
  lockDot: {
    width: mvs(6),
    height: mvs(6),
    borderRadius: mvs(3),
    backgroundColor: '#FF5F57',
    marginLeft: mvs(4),
  },
  unlockButton: {
    backgroundColor: colors.primary,
    borderRadius: mvs(40),
    paddingVertical: mvs(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(16),
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mvs(8),
  },
  checkboxRow: {
    marginTop: mvs(12),
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mvs(12),
  },
  checkboxBox: {
    width: mvs(20),
    height: mvs(20),
    borderWidth: 2,
    borderColor: '#D4D4D8',
    borderRadius: mvs(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxList: {
    marginTop: mvs(8),
  },
  geneticFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mvs(12),
    paddingHorizontal: mvs(16),
    backgroundColor: '#F5F5F5',
    borderRadius: mvs(12),
  },
});
