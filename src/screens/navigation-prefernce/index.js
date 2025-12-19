import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';

const NavigationPreferenceScreen = () => {
  const [selectedApp, setSelectedApp] = useState('Google Maps');

  const navigationApps = [
    {label: 'Google Maps (default)', value: 'Google Maps'},
    {label: 'Mapbox', value: 'Mapbox'},
    {label: 'Apple Maps', value: 'Apple Maps'},
    {label: 'Waze', value: 'Waze'},
  ];

  const handleSelect = value => {
    setSelectedApp(value);
  };

  return (
    <View style={styles.container}>
       <Header1x2x title={'Navigation Preference'} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(20),
          paddingTop: mvs(20),
        }}>
        <Medium
          label={'Choose your preferred app for route navigation'}
          color={colors.black}
          fontSize={mvs(15)}
          style={{marginBottom: mvs(20)}}
        />

        {navigationApps.map((app, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionCard,
              selectedApp === app.value && {backgroundColor: '#F9FAFB'},
            ]}
            onPress={() => handleSelect(app.value)}>
            <View style={styles.row}>
              <View
                style={[
                  styles.radioOuter,
                  selectedApp === app.value && {
                    borderColor: colors.primary,
                  },
                ]}>
                {selectedApp === app.value && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.optionText}>{app.label}</Text>
            </View>
          </TouchableOpacity>
        ))}

       
      </ScrollView>
       <View style={styles.bottomButton}>
             <TouchableOpacity


               style={[
                 styles.nextBtn,
                //  {opacity: selectedOption ? 1 : 0.6},
               ]}>
               <Medium label="Update" color={colors.white} fontSize={mvs(16)} />
             </TouchableOpacity>
           </View>
    </View>
  );
};

export default NavigationPreferenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: mvs(50),
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingVertical: mvs(14),
    paddingHorizontal: mvs(15),
    marginBottom: mvs(15),
  },
  radioOuter: {
    width: mvs(22),
    height: mvs(22),
    borderRadius: mvs(11),
    borderWidth: 2,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: mvs(13),
    height: mvs(13),
    borderRadius: mvs(20),
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: mvs(15),
    color: colors.black,
    marginLeft: mvs(10),
  },
  updateButton: {
    backgroundColor: colors.primary,
    borderRadius: mvs(50),
    paddingVertical: mvs(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(40),
  },
  updateText: {
    color: colors.white,
    fontSize: mvs(15),
    fontWeight: '500',
  },
    bottomButton: {
      paddingHorizontal: mvs(20),
      paddingVertical: mvs(15),
      backgroundColor: colors.white,
      borderTopWidth: 1,
      borderColor: '#F2F2F2',
    },
      nextBtn: {
    backgroundColor: colors.primary,
    paddingVertical: mvs(14),
    borderRadius: mvs(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
