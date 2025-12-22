import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {navigate, goBack} from 'navigation/navigation-ref';
import React, {useState} from 'react';
import {TouchableOpacity, View, ScrollView, StatusBar, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {colors} from 'config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Medium from 'typography/medium-text';
import { Row } from 'components/atoms/row';
import { useNavigation } from '@react-navigation/native';

const RoleSelectionScreen = props => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const navigation = useNavigation();
  const serviceType = props?.route?.params?.serviceType || 'donor';

  // Donor service options
  const donorOptions = [
    {
      id: 'looking-for-donor',
      title: "I'm Looking for a Donor",
      description: 'Find a compatible match to help you build your family',
      icon: IMG.SearchNew,
      iconType: 'svg',
      iconPosition: 'left',
    },
    {
      id: 'am-donor',
      title: 'I am a Donor',
      description: 'Offer the gift of life and help create a family',
      icon: IMG.DonateSvg,
      iconType: 'svg',
      iconPosition: 'right',
    },
  ];

  // Surrogacy service options
  const surrogacyOptions = [
    {
      id: 'looking-for-surrogate',
      title: 'I am Looking for Surrogate',
      description: 'Connect with a compassionate carrier to help build your family.',
      icon: IMG.SearchNew,
      iconType: 'svg',
      iconPosition: 'left',
    },
    {
      id: 'am-surrogate',
      title: 'I am a Surrogate',
      description: 'Offer the gift of life by carrying a child for intended parents.',
      icon: IMG.feter,
      iconType: 'svg',
      iconPosition: 'right',
    },
  ];

  const serviceOptions = serviceType === 'surrogacy' ? surrogacyOptions : donorOptions;

  const handleRoleToggle = (roleId) => {
    setSelectedRoles(prev => {
      if (prev.includes(roleId)) {
        return [];
      } else {
        return [roleId];
      }
    });
  };

  const handleContinue = () => {
    // navigate("DriverRegistrationPart1Screen")
      if (serviceType === 'surrogacy') {
    navigate('GameteSelectionScreen');
    return;
  }
    // donor flow: if "I'm Looking for a Donor" is selected, go to GameteSelectionScreen
    if (serviceType !== 'surrogacy' && selectedRoles.includes('looking-for-donor')) {
      navigate('GameteSelectionScreen');
      return;
    }

    // default: just log selection (existing logic)
    console.log('Selected roles:', selectedRoles);
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
        <View style={{marginTop:mvs(40)}}>
        <Medium
          label={serviceType === 'surrogacy' ? "What are you looking for?" : "What best describes you?"}
          fontSize={mvs(24)}
          color={colors.textColor}
          style={styles.heading}
        />
        </View>

        {/* Role Options */}
        <View style={styles.optionsContainer}>
          {serviceOptions.map((option) => {
            const isSelected = selectedRoles.includes(option.id);
            return (
              <LinearGradient
                key={option.id}
                colors={['rgba(175, 168, 168, 0.2)', 'rgba(233, 233, 233, 0.2)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0.1}}
                style={styles.serviceCardGradient}>
                <TouchableOpacity
                  onPress={() => handleRoleToggle(option.id)}
                  activeOpacity={0.7}
                  style={[
                    styles.serviceCardOuter,
                    isSelected && styles.serviceCardOuterSelected,
                  ]}>
                  <View style={styles.serviceCardInner}>
                    <View style={[
                      styles.serviceCardContent,
                      option.iconPosition === 'right' && styles.serviceCardContentReverse
                    ]}>
                      {option.iconPosition === 'right' && (
                        <View style={[styles.serviceIconContainer, styles.serviceIconContainerRight]}>
                          {option.iconType === 'image' ? (
                            <Image
                              source={option.icon}
                              resizeMode="contain"
                              style={styles.serviceIcon}
                            />
                          ) : (
                            <option.icon 
                              height={mvs(60)} 
                              width={mvs(60)}
                            />
                          )}
                        </View>
                      )}
                      {option.iconPosition === 'left' && (
                        <View style={styles.serviceIconContainer}>
                          {option.iconType === 'image' ? (
                            <Image
                              source={option.icon}
                              resizeMode="contain"
                              style={styles.serviceIcon}
                            />
                          ) : (
                            <option.icon 
                              height={mvs(60)} 
                              width={mvs(60)}
                            />
                          )}
                        </View>
                      )}
                      <View style={styles.serviceTextContainer}>
                        <Medium
                          label={option.title}
                          fontSize={mvs(16)}
                          color={isSelected ? colors.helixPrimary : colors.textColor}
                          style={styles.serviceTitle}
                        />
                        <Regular
                          label={option.description}
                          fontSize={mvs(14)}
                          color="#8C8C8C"
                          style={styles.serviceDescription}
                          numberOfLines={2}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            );
          })}
        </View>

        {/* Continue Button */}
        <Row>
        <PrimaryButton
          containerStyle={styles.BackButton}
          onPress={() => navigation.goBack()}
          title={'Back'}
          textStyle={{color:colors.primary}}
        />
        <PrimaryButton
          containerStyle={styles.continueButton}
          onPress={handleContinue}
          title={'Continue'}
        />
        </Row>
      </ScrollView>
    </View>
  );
};

export default RoleSelectionScreen;
