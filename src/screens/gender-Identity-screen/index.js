import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {navigate, goBack} from 'navigation/navigation-ref';
import React, {useState} from 'react';
import {TouchableOpacity, View, ScrollView, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {colors} from 'config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Medium from 'typography/medium-text';

const GenderIdentityScreen = props => {
  const [selectedGender, setSelectedGender] = useState('man');

  const genderOptions = [
    {
      id: 'woman',
      label: 'Woman',
      icon: IMG.female,
    },
    {
      id: 'man',
      label: 'Man',
      icon: IMG.Male,
    },
    {
      id: 'other',
      label: 'Other (Trans, Agender...)',
      icon: IMG.Mix,
    },
  ];

  const handleContinue = () => {
    // Handle continue action

    console.log('Selected gender:', selectedGender);
    navigate("ServiceTypeScreen")
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.helixBackground} barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false} 
        bounces={false}>
        
        {/* Back Button */}
        {/* <TouchableOpacity 
          style={styles.backButton}
          onPress={goBack}>
          <Icon name="arrow-back" size={mvs(24)} color={colors.black} />
        </TouchableOpacity> */}

        {/* Heading */}
        <Medium
          label="I am a .."
          fontSize={mvs(24)}
          color={colors.textColor}
          style={styles.heading}
        />

        {/* Gender Options */}
        <View style={styles.optionsContainer}>
          {genderOptions.map((option) => (
             <LinearGradient
                colors={['rgba(175, 168, 168, 0.2)', 'rgba(233, 233, 233, 0.2)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0.1}}
                style={styles.optionCardGradient}>
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedGender(option.id)}
              activeOpacity={0.7}
              style={[
                styles.optionCardOuter,
                selectedGender === option.id && styles.optionCardOuterSelected,
              ]}>
             
                <View style={styles.optionCardInner}>
                  <View style={styles.optionIconContainer}>
                    <option.icon 
                      height={mvs(45)} 
                      width={mvs(45)}
                    />
                  </View>
                  <Regular
                    label={option.label}
                    fontSize={mvs(16)}
                    color={colors.textColor}
                    style={styles.optionLabel}
                  />
                </View>
         
            </TouchableOpacity>
                 </LinearGradient>
          ))}
        </View>

        {/* Continue Button */}
        <PrimaryButton
          containerStyle={styles.continueButton}
          onPress={handleContinue}
          title={'Continue'}
          
        />
      </ScrollView>
    </View>
  );
};

export default GenderIdentityScreen;
