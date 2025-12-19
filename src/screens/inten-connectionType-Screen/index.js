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

const IntentConnectiontypeScreen = props => {
  const [selectedServices, setSelectedServices] = useState([]);
  const navigation = useNavigation();

  const serviceOptions = [
    {
      id: 'donor',
      title: 'Donor Banks',
      icon: IMG.bank,
      iconType: 'svg',
      iconPosition: 'left',
    },
    {
      id: 'surrogacy',
      title: 'Private Donors (Donation Only)',

      icon: IMG.giftNew,
      iconType: 'svg',
      iconPosition: 'left',
    },
    {
      id: 'donor',
      title: 'Private Donor + Co-Parenting',
      icon: IMG.Egg,
      iconType: 'svg',
      iconPosition: 'left',
    },
    {
      id: 'surrogacy',
      title: 'Surrogacy Services',

      icon: IMG.sperm,
      iconType: 'svg',
      iconPosition: 'left',
    },
    {
      id: 'donor',
      title: 'Private Donor + Relationship',
      icon: IMG.Heart2,
      iconType: 'svg',
      iconPosition: 'left',
    },
    {
      id: 'surrogacy',
      title: 'Private Donor + Marriage',

      icon: IMG.ring,
      iconType: 'svg',
      iconPosition: 'left',
    },
    {
      id: 'surrogacy',
      title: 'Private Donor + Surrogate',

      icon: IMG.Private,
      iconType: 'svg',
      iconPosition: 'left',
    },
  ];

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const handleContinue = () => {
    // Handle continue action
    console.log('Selected services:', selectedServices);
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
        <View style={{marginTop:mvs(50)}}>
        <Medium
          label="What kind of procreation pairing would you like to be?"
          fontSize={mvs(24)}
          color={colors.textColor}
          style={styles.heading}
          numberOfLines={10}
        />
        <Regular
          label="Select all that apply."
          fontSize={mvs(14)}
          color={colors.textColor}
          style={{...styles.heading,marginTop:mvs(10)}}
        />
        </View>

        {/* Service Options */}
        <View style={styles.optionsContainer}>
          {serviceOptions.map((option) => {
            const isSelected = selectedServices.includes(option.id);
            return (
              <LinearGradient
                key={option.id}
                colors={['rgba(175, 168, 168, 0.2)', 'rgba(233, 233, 233, 0.2)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0.1}}
                style={styles.serviceCardGradient}>
                <TouchableOpacity
                  onPress={() => handleServiceToggle(option.id)}
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
                              height={mvs(24)} 
                              width={mvs(24)}
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
                              height={mvs(24)} 
                              width={mvs(24)}
                            />
                          )}
                        </View>
                      )}
                      <View style={styles.serviceTextContainer}>
                        <Medium
                          label={option.title}
                          fontSize={mvs(16)}
                          color={colors.textColor}
                          style={styles.serviceTitle}
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
          onPress={()=>navigate("DriverRegistrationPart1Screen")}
          // onPress={() => {
          //   const selectedService = selectedServices[0]; // Get first selected service
          //   navigate("RoleSelectionScreen", { serviceType: selectedService });
          // }}
          title={'Continue'}
        />
        </Row>
      </ScrollView>
    </View>
  );
};

export default IntentConnectiontypeScreen;
