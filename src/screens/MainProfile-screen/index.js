
import React, {useMemo, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {navigate} from 'navigation/navigation-ref';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const MainProfileScreen = () => {
  // Sample profile data
  const profiles = useMemo(
    () => [
      {
        id: 1,
        name: 'Jessica',
        age: 36,
        location: 'Austin, Texas',
        flag: '🇺🇸',
        image: IMG.HomeImageOng, // PNG image
      },
    ],
    [],
  );

  const profile = profiles[0];

  // Expand / collapse states for detail sections
  const [aboutExpanded, setAboutExpanded] = useState(true);
  const [photosExpanded, setPhotosExpanded] = useState(true);
  const [physicalExpanded, setPhysicalExpanded] = useState(true);
  const [educationExpanded, setEducationExpanded] = useState(true);
  const [healthExpanded, setHealthExpanded] = useState(true);
  const [geneticExpanded, setGeneticExpanded] = useState(true);
  const [subscriptionExpanded, setSubscriptionExpanded] = useState(true);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

      {/* Full Background Image */}
      <Image
        source={profile.image}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Top overlay controls */}
      
      <Row style={styles.topOverlayRow}>
        <View />
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigate('Home')}>
          <IMG.SettingsProfile width={mvs(30)} height={mvs(30)} />
        </TouchableOpacity>
      </Row>

      {/* Name and Location overlaid on image */}
      <View style={styles.nameLocationContainer}>
        <Bold
          label={`${profile.name}, ${profile.age}`}
          fontSize={mvs(28)}
          color={colors.white}
        />
        <Row style={{alignItems: 'center', marginTop: mvs(4)}}>
          <IMG.HomeFlags width={mvs(22)} height={mvs(16)} />
          <Medium
            label={` ${profile.location}`}
            fontSize={mvs(24)}
            color={colors.white}
            style={{marginLeft: mvs(4)}}
          />
        </Row>
      </View>

      {/* Edit Profile Button overlaid on image */}
      <View style={styles.editButtonContainer}>
        <TouchableOpacity style={styles.editProfileButton}>
          <IMG.MainProfileEdit width={mvs(16)} height={mvs(16)} />
          <Medium
            label="Edit Profile"
            fontSize={mvs(14)}
            color={colors.black}
            style={{marginLeft: mvs(8)}}
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable content starting from blue section */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Blue info sheet - first item in scroll */}
        <View style={styles.infoSheet}>
            <Row style={styles.infoTopRow}>
              <Regular label={"5' 6\""} fontSize={mvs(14)} color={colors.white} />
            <Regular label={'154lbs'} fontSize={mvs(14)} color={colors.white} />
            <Regular label={'0+'} fontSize={mvs(14)} color={colors.white} />
            </Row>
          <View
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: colors.white,
              height: mvs(1),
              width: '100%',
            }}
          />
            <Row style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Eye Color'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Blue'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Hair Color'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Brown'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
            </Row>
          <View
            style={{
              marginTop: mvs(6),
              borderBottomWidth: 0.4,
              borderBottomColor: colors.white,
              height: mvs(1),
              width: '100%',
            }}
          />
            <Row style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Education'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'MBA'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Occupation'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Finance Manager'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
            </Row>
          <View
            style={{
              marginTop: mvs(6),
              borderBottomWidth: 0.4,
              borderBottomColor: colors.white,
              height: mvs(1),
              width: '100%',
            }}
          />
            <Row style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Race'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'Caucasian'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
              <View style={styles.infoColumn}>
                <Medium
                  label={'Ethnicity'}
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label={'American'}
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginTop: mvs(4)}}
                />
              </View>
            </Row>
          <View
            style={{
              marginTop: mvs(6),
              borderBottomWidth: 0.4,
              borderBottomColor: colors.white,
              height: mvs(1),
              width: '100%',
            }}
          />
          <Row style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Medium
                label={'My Role'}
                fontSize={mvs(14)}
                color={colors.white}
              />
              <Regular
                label={'Looking for a Donor'}
                fontSize={mvs(14)}
                color={colors.white}
                style={{marginTop: mvs(4)}}
              />
            </View>
            <View style={styles.infoColumn}>
              <Medium
                label={"I'm Seeking"}
                fontSize={mvs(14)}
                color={colors.white}
              />
              <Regular
                label={'Sperm'}
                fontSize={mvs(14)}
                color={colors.white}
                style={{marginTop: mvs(4)}}
              />
            </View>
          </Row>
          <View
            style={{
              marginTop: mvs(6),
              borderBottomWidth: 0.4,
              borderBottomColor: colors.white,
              height: mvs(1),
              width: '100%',
            }}
          />
          <Row style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Medium
                label={'My Goal'}
                fontSize={mvs(14)}
                color={colors.white}
              />
              <Regular
                label={'Private Donor, Co-Parenting'}
                fontSize={mvs(14)}
                color={colors.white}
                style={{marginTop: mvs(4)}}
              />
            </View>
          </Row>
        </View>

        {/* White expandable cards */}
        {/* ABOUT card */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setAboutExpanded(prev => !prev)}>
            <Row style={styles.sectionHeader}>
              <Row style={{alignItems: 'center'}}>
                <IMG.ProfileUser width={mvs(16)} height={mvs(16)} />
                <Bold
                  label="ABOUT"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  style={{marginLeft: mvs(8)}}
                />
              </Row>
              <IMG.MainProfileEdit width={mvs(16)} height={mvs(16)} />
            </Row>
          </TouchableOpacity>
          {aboutExpanded && (
            <View style={styles.sectionBody}>
              <Medium
                label="In Your Own Words"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(6), alignSelf: 'center'}}
              />
              <Regular
                label="Creative director living in Austin with my golden retriever, Leo. I've built a life I love and I'm ready and excited to take the next step to become a mother. Looking for a kind, responsible co-parenting partner to share in the adventure of raising a child."
                fontSize={mvs(14)}
                color={colors.primary}
              />
              <View
                style={{
                  marginVertical: mvs(10),
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: '#E5E7EB',
                }}
              />
              <Medium
                label="Personality & Interests"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(8), alignSelf: 'center'}}
              />
              <Regular
                label="Adjectives"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(4)}}
              />
              <Regular
                label="Smart, Flexible, Persevering (Determined)"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(8)}}
              />
              <Regular
                label="Favorite Hero"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(4)}}
              />
              <Regular
                label="Mother Theresa – she excelled in teaching and used all her resources to help, nourish, and educate the most disadvantaged."
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(8)}}
              />
              <Regular
                label="Hobbies & Interests"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(4)}}
              />
              <Regular
                label="Travel, Teaching, Movies"
                fontSize={mvs(14)}
                color={colors.primary}
              />
            </View>
          )}
        </View>

        {/* MY PHOTOS card */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPhotosExpanded(prev => !prev)}>
            <Row style={styles.sectionHeader}>
              <Row style={{alignItems: 'center'}}>
                <IMG.Mainprofilegallery width={mvs(16)} height={mvs(16)} />
                <Bold
                  label="MY PHOTOS"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  style={{marginLeft: mvs(8)}}
                />
              </Row>
              <IMG.MainProfileEdit width={mvs(16)} height={mvs(16)} />
            </Row>
          </TouchableOpacity>
          {photosExpanded && (
            <View style={styles.sectionBody}>
              <View style={styles.photosGrid}>
                {[1, 2, 3, 4].map((item, index) => (
                  <Image
                    key={index}
                    source={profile.image}
                    style={styles.photoItem}
                    resizeMode="cover"
                  />
                ))}
              </View>
            </View>
          )}
        </View>

        {/* PHYSICAL ATTRIBUTES card */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPhysicalExpanded(prev => !prev)}>
            <Row style={styles.sectionHeader}>
              <Row style={{alignItems: 'center'}}>
                <IMG.ProfileDetailBicep width={mvs(16)} height={mvs(16)} />
                <Bold
                  label="PHYSICAL ATTRIBUTES"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  style={{marginLeft: mvs(8)}}
                />
              </Row>
              <IMG.MainProfileEdit width={mvs(16)} height={mvs(16)} />
            </Row>
          </TouchableOpacity>
          {physicalExpanded && (
            <View style={styles.sectionBody}>
              <Row style={styles.sectionRow}>
                <Medium label="Height" fontSize={mvs(14)} color={colors.primary} />
                <Regular label={'5\' 6"'} fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium label="Weight" fontSize={mvs(14)} color={colors.primary} />
                <Regular
                  label="154 lbs (69 kg)"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Body Build"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Medium" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium label="Race" fontSize={mvs(14)} color={colors.primary} />
                <Regular
                  label="White Or Caucasian"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Ethnicity"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="Kazakh, Russian"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Face Shape"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Oval" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Skin Tone"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Fair" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Eye Color"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="Green/Grey"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Hair Color"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Brown" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Hair Type"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Wavy" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Hair Texture"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Fine" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Hair Loss"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="None" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Beard Color"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="Brown, Dark"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Eyebrows"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Medium" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Long Eyelashes"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="No" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Hairy Chest"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="No" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium label="Hairy" fontSize={mvs(14)} color={colors.primary} />
                <Regular label="No" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Freckles"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="None" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Dimples"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="No" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium label="Lips" fontSize={mvs(14)} color={colors.primary} />
                <Regular label="Normal" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Nose Shape"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Normal" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Ear Lobes"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="Detached"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Dominant Hand"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Right" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Shoe Size"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="8.5" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium label="Acne" fontSize={mvs(14)} color={colors.primary} />
                <Regular label="No" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Acne Information"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="-" fontSize={mvs(14)} color={colors.primary} />
              </Row>
            </View>
          )}
      </View>

        {/* EDUCATION & CAREER card */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setEducationExpanded(prev => !prev)}>
            <Row style={styles.sectionHeader}>
              <Row style={{alignItems: 'center'}}>
                <IMG.ProfileDetailEducation
                  width={mvs(16)}
                  height={mvs(16)}
                />
                <Bold
                  label="EDUCATION & CAREER"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  style={{marginLeft: mvs(8)}}
                />
              </Row>
              <IMG.MainProfileEdit width={mvs(16)} height={mvs(16)} />
            </Row>
          </TouchableOpacity>
          {educationExpanded && (
            <View style={styles.sectionBody}>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Occupation"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="Research Assistant"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Education Level"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="PhD (Currently enrolled)"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Undergraduate"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Regular
                label="Bachelor of Science, Economics (Graduated)"
                fontSize={mvs(14)}
                color={colors.primary}
              />
              <Row style={styles.sectionRow}>
            <Medium
                  label="Graduate"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Regular
                label="Master of Science, Finance (Graduated)"
                fontSize={mvs(14)}
                color={colors.primary}
              />
              <Row style={styles.sectionRow}>
                <Medium label="PhD" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Regular
                label="Economics (Currently enrolled)"
                fontSize={mvs(14)}
                color={colors.primary}
              />
            </View>
          )}
        </View>

        {/* HEALTH SUMMARY card */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setHealthExpanded(prev => !prev)}>
            <Row style={styles.sectionHeader}>
              <Row style={{alignItems: 'center'}}>
                <IMG.ProfileDetailEducationHealth
                  width={mvs(16)}
                  height={mvs(16)}
                />
                <Bold
                  label="HEALTH SUMMARY"
              fontSize={mvs(14)}
                  color={colors.primary}
              style={{marginLeft: mvs(8)}}
            />
          </Row>
              <IMG.MainProfileEdit width={mvs(16)} height={mvs(16)} />
            </Row>
          </TouchableOpacity>
          {healthExpanded && (
            <View style={styles.sectionBody}>
              <Medium
                label="Birth & Childhood"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{alignSelf: 'center', marginBottom: mvs(8)}}
              />
              <Row style={styles.sectionRow}>
                <Medium
                  label="Carried to Term"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Yes" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Pregnancy Complications"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="No" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Birth Weight"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="7 lbs 11 ounces"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Birth Length"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="20 inches"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Childhood Health"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="Excellent"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <View
                style={{
                  marginVertical: mvs(10),
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: '#E5E7EB',
                }}
              />
              <Medium
                label="Health Information"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{alignSelf: 'center', marginBottom: mvs(8)}}
              />
              <Row style={styles.sectionRow}>
                <Medium
                  label="CMV Status"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="Negative"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Eyesight Correction"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="Yes, Nearsighted"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Hernia"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular label="Yes" fontSize={mvs(14)} color={colors.primary} />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Allergies"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="None Reported"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Comments"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
                <Regular
                  label="Donor has an inguinal hernia."
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
        </Row>
      </View>
          )}
        </View>

        {/* GENETIC PROFILE card */}
        <View style={styles.sectionCard}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setGeneticExpanded(prev => !prev)}>
            <Row style={styles.sectionHeader}>
              <Row style={{alignItems: 'center'}}>
                <IMG.ProfileDetailGenetic width={mvs(16)} height={mvs(16)} />
                <Bold
                  label="GENETIC PROFILE"
                  fontSize={mvs(14)}
                  color={colors.primary}
                  style={{marginLeft: mvs(8)}}
                />
              </Row>
              <IMG.MainProfileEdit width={mvs(16)} height={mvs(16)} />
            </Row>
          </TouchableOpacity>
          {geneticExpanded && (
            <View style={styles.sectionBody}>
              <Row style={{alignItems: 'center', marginBottom: mvs(6)}}>
                <Medium
                  label={'⚠  ADVISORY'}
                  fontSize={mvs(14)}
                  color={colors.primary || '#EAB308'}
                />
              </Row>
              <Regular
                label="This donor is a carrier of one or more genetic conditions."
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(10)}}
              />
              <Medium
                label="Expanded Carrier Screen (283 Genes)"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{
                  alignSelf: 'center',
                  marginBottom: mvs(10),
                }}
              />
              <Medium
                label="POSITIVE CARRIER STATUS"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(4)}}
              />
              <Regular
                label="Limb-Girdle Muscular Dystrophy, Type 2A (CAPN3): Carrier"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(4)}}
              />
              <Regular
                label="• One pathogenic variant, c.1465C>T, p.R489W, was detected."
                fontSize={mvs(14)}
                color={colors.primary}
              />
              <Regular
                label="• Carriers are not expected to show symptoms."
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(10)}}
              />
              <Medium
                label="NEGATIVE RESULTS"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(4)}}
              />
              <Regular
                label="Cystic Fibrosis (CFTR): Reduced Risk"
                fontSize={mvs(14)}
                color={colors.primary}
              />
              <Regular
                label="Spinal Muscular Atrophy (SMN1): Reduced Risk (2 copies of SMN1 detected)"
                fontSize={mvs(14)}
                color={colors.primary}
              />
              <Regular
                label="Tay-Sachs Disease (HEXA): Reduced Risk (Normal enzyme analysis)"
                fontSize={mvs(14)}
                color={colors.primary}
              />
              <Regular
                label="Sickle Cell Disease (HBB): Reduced Risk"
                fontSize={mvs(14)}
                color={colors.primary}
                style={{marginBottom: mvs(12)}}
              />
            </View>
          )}
        </View>

        {/* MY SUBSCRIPTION card */}
        <View style={[styles.sectionCard, {marginBottom: mvs(40),backgroundColor:colors.primary}]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSubscriptionExpanded(prev => !prev)}>
            <Row style={styles.sectionHeader}>
              <Row style={{alignItems: 'center'}}>
                <IMG.Mainprofileshiled width={mvs(16)} height={mvs(16)} />
                <Bold
                  label="MY SUBSCRIPTION"
                  fontSize={mvs(14)}
                  color={colors.white}
                  style={{marginLeft: mvs(8)}}
                />
              </Row>
              <Icon
                name={subscriptionExpanded ? 'chevron-up' : 'chevron-down'}
                size={mvs(18)}
                color={colors.white}
              />
            </Row>
          </TouchableOpacity>
          {subscriptionExpanded && (
            <View style={styles.sectionBody}>
              <Row style={styles.sectionRow}>
                <Medium label="Status" fontSize={mvs(14)} color={colors.primary} />
                <Row style={{alignItems: 'center'}}>
                  <Regular
                    label="Premium Member"
                    fontSize={mvs(14)}
                    color={colors.primary}
                  />
                  {/* <Icon name="star" size={mvs(16)} color="#EAB308" style={{marginLeft: mvs(4)}} /> */}
                  <IMG.MatchSparkle width={mvs(12)} height={mvs(12)}/>
                </Row>
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Member Since"
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label="March 2025"
                  fontSize={mvs(14)}
                  color={colors.white}
                />
              </Row>
              <Row style={styles.sectionRow}>
                <Medium
                  label="Next Billing Date"
                  fontSize={mvs(14)}
                  color={colors.white}
                />
                <Regular
                  label="September 12, 2025"
                  fontSize={mvs(14)}
                  color={colors.white}
                />
              </Row>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  marginTop: mvs(12),
                  backgroundColor: colors.white,
                  borderRadius: mvs(22),
                  paddingVertical: mvs(10),
                  alignItems: 'center',
                }}>
                <Medium
                  label="Manage Subscription"
                  fontSize={mvs(14)}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainProfileScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: Dimensions.get('window').height,
  },
  topOverlayRow: {
    position: 'absolute',
    top: mvs(50),
    left: mvs(20),
    right: mvs(20),
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 10,
  },
  settingsButton: {
    padding: mvs(8),
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: mvs(8),
  },
  nameLocationContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.38,
    left: mvs(20),
    zIndex: 10,
  },
  editButtonContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.50,
    left: 0,
    right: 0,
    // bottom:mvs(20),
    alignItems: 'center',
    width:"100%",
    zIndex: 10,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    width:"90%",
    backgroundColor: "#D9D9D9",
    borderRadius: mvs(20),
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(10),
    alignSelf: 'center',
  },
  scrollContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.55,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(40),
  },
  infoSheet: {
    marginTop: mvs(14),
    backgroundColor: 'rgba(58, 62, 144, 0.85)',
    borderRadius: mvs(24),
    paddingHorizontal: mvs(20),
    paddingTop: mvs(16),
    paddingBottom: mvs(14),
  },
  infoTopRow: {
    justifyContent: 'space-between',
    marginBottom: mvs(16),
  },
  infoRow: {
    justifyContent: 'space-between',
    marginTop: mvs(12),
  },
  infoColumn: {
    // flex: 1,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: mvs(18),
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(12),
    marginTop: mvs(12),
  },
  sectionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionBody: {
    marginTop: mvs(10),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    paddingTop: mvs(10),
  },
  sectionRow: {
    justifyContent: 'space-between',
    marginTop: mvs(6),
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: mvs(8),
  },
  photoItem: {
    width: (SCREEN_WIDTH - mvs(72)) / 2,
    height: (SCREEN_WIDTH - mvs(72)) / 2,
    borderRadius: mvs(12),
    marginBottom: mvs(12),
  },
});
