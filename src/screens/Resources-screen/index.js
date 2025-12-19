import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, ScrollView, StatusBar, Text, Image} from 'react-native';
import styles from './styles';
import {colors} from 'config/colors';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/Ionicons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {Checkbox} from 'components/atoms/checkbox';
import { useNavigation } from '@react-navigation/native';
import { Row } from 'components/atoms/row';


const CELL_COUNT = 6;

const ResourcesScreen = props => {
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded
  const navigation = useNavigation();
  const email = props?.route?.params?.email || 'jessica@mail.com';

  const ref = useBlurOnFulfill({value: otpValue, cellCount: CELL_COUNT});
  const [propsCodeField, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: setOtpValue,
  });

  // Static resources data for cards
  const resources = [
    {
      id: 'ivf',
      title: 'IVF - in vitro fertilization',
      description:
        'Connect with your local Service provider for laboratory Insemination & Egg extraction',
      icon: IMG.ResourcesTestTube,
    },
    {
      id: 'iui',
      title: 'IUI - Intrauterine Insemination',
      description: 'Clinical or at home resources for self insemination',
      icon: IMG.ResourcesSyringe,
    },
    {
      id: 'mrt_ifg',
      title: 'MRT / IFG Advanced Services',
      description:
        'Resources on safe procreation naturally including STD and disease testing.',
      icon: IMG.ResourcesCells,
    },
    {
      id: 'genetic_testing',
      title: 'Genetic Testing',
      description:
        'Connect with iGenomix for your recessive autosomal testing',
      icon: IMG.ResourcesDna,
    },
    {
      id: 'procreation_safety',
      title: 'Procreation Safety',
      description:
        'Resources on safe procreation naturally including STD and disease testing.',
      icon: IMG.ResourcesShiled,
    },
    {
      id: 'legal_resources',
      title: 'Legal Resources',
      description:
        'Guidelines on co-parenting contracts, donor rights, and local surrogacy laws.',
      icon: IMG.ResourcesShiled, // Using shield as placeholder, can be updated later
    },
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}s`;
  };

  const handleResend = () => {
    if (canResend) {
      setTimeLeft(10);
      setCanResend(false);
      // Add your resend OTP logic here
    }
  };

  const handleContinue = () => {
    if (otpValue.length === CELL_COUNT) {
      setError('');
      // Open modal directly
      setShowModal(true);
    } else {
      setError('Please enter complete OTP');
    }
  };

  const handleAgree = () => {
    if (agreed) {
      setShowModal(false);
      navigate("GetStartedScreen")
      // Add your navigation logic here after agreement
      // navigate("Drawer");
    }
  };

  // Clear error when OTP value changes
  useEffect(() => {
    if (error && otpValue.length > 0) {
      setError('');
    }
  }, [otpValue]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.helixBackground} barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        bounces={false}>
        
        {/* Back Arrow */}

        <Row style={{alignItems:'center',justifyContent:"space-between"}}>

         
      
        <TouchableOpacity 
          style={styles.backButton}
          // onPress={() => navigate('Login')}
          onPress={() => navigation.goBack()}
          >
          <Icon name="chevron-back-outline" size={mvs(24)} color={"#8C8C8C"} />
        </TouchableOpacity>
          <Medium
          label={'Resources'}
          fontSize={mvs(18)}
          color={colors.textColor || '#404040'}
          style={styles.title}
        />

        <View>
          
        </View>
          </Row>

        {/* Resources Header */}
       

        {/* Resources Cards */}
        <View style={styles.resourcesContainer}>
          {resources.map(item => {
            const IconComponent = item.icon;
            const isExpanded = expandedCard === item.id;
            
            return (
              <View key={item.id} style={styles.resourceCard}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setExpandedCard(isExpanded ? null : item.id);
                  }}>
                  <View style={styles.resourceInnerCard}>
                    <View style={styles.resourceHeaderRow}>
                      <View style={styles.resourceIconContainer}>
                        <IconComponent width={mvs(60)} height={mvs(60)} />
                      </View>
                      <View style={styles.resourceTextContainer}>
                        <Medium
                          label={item.title}
                          fontSize={mvs(16)}
                          color={colors.textColor || '#404040'}
                        />
                        <Regular
                          label={item.description}
                          fontSize={mvs(14)}
                          color={"#8C8C8C" || '#6D6D6D'}
                          style={{marginTop: mvs(6)}}
                          // numberOfLines={isExpanded ? undefined : 3}
                          numberOfLines={10}
                        />
                      </View>
                      {/* <Icon
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={mvs(20)}
                        color={colors.textColor || '#404040'}
                        style={styles.expandIcon}
                      /> */}
                    </View>
                    
                    {/* Expanded Content - Inside White Container */}
                    {isExpanded && (
                      <View style={styles.expandedContent}>
                    {item.id === 'ivf' && (
                      <>
                        <Regular
                          label="Connect with your local Service provider for laboratory Insemination & Egg extraction."
                          fontSize={mvs(14)}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                          numberOfLines={10}
                        />
                        
                        <Regular
                          label="IVF is a process where an egg is combined with sperm outside the body, in a laboratory ('in vitro'). The resulting embryo is then monitored and transferred to the uterus. It is the most effective form of assisted reproductive technology."
                          fontSize={mvs(14)}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                            numberOfLines={10}
                        />
                        
                        <Bold
                          label="Key Facts:"
                          fontSize={mvs(16)}
                          color={colors.textColor || '#404040'}
                          style={styles.keyFactsTitle}
                            numberOfLines={10}
                        />
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Success Rate:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Varies by age (approx. 20-50% per cycle)."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Timeline:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" One cycle typically takes 2-3 weeks."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Cost:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Average $12,000 - $30,000 per cycle (varies by region)."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <PrimaryButton
                          containerStyle={styles.searchButton}
                          loading={false}
                          onPress={() => {
                            // Handle search for clinics
                          }}
                          title="Search for IVF Clinics Near Me"
                        />
                        
                        <Regular
                          label="Source: CDC / ASRM"
                          fontSize={mvs(12)}
                          color={"#8C8C8C"}
                            numberOfLines={10}
                          style={styles.sourceText}
                        />
                      </>
                    )}
                    
                    {item.id === 'iui' && (
                      <>
                        <Regular
                          label="IUI involves placing sperm directly inside the uterus to facilitate fertilization."
                          fontSize={mvs(14)}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                            numberOfLines={10}
                        />
                        
                        <Regular
                          label="It increases the number of sperm that reach the fallopian tubes."
                          fontSize={mvs(14)}
                            numberOfLines={10}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                        />
                        
                        <Regular
                          label="This can be performed clinically or using at-home insemination kits."
                          fontSize={mvs(14)}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                            numberOfLines={10}
                        />
                        
                        <Bold
                          label="Key Facts:"
                          fontSize={mvs(16)}
                          color={colors.textColor || '#404040'}
                          style={styles.keyFactsTitle}
                            numberOfLines={10}
                        />
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Clinical IUI:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Performed by a doctor; may use fertility drugs."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="At-Home IUI:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Self-insemination using sterile kits (needle-free)."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Cost:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Significantly lower than IVF ($300 – $1,000)."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <PrimaryButton
                          containerStyle={styles.searchButton}
                          loading={false}
                          onPress={() => {
                            // Handle search for clinics
                          }}
                          title="Find IUI Clinics & At-Home Kits"
                        />
                        
                        <Regular
                          label="Source: CDC / ASRM"
                          fontSize={mvs(12)}
                            numberOfLines={10}
                          color={"#8C8C8C"}
                          style={styles.sourceText}
                        />
                      </>
                    )}
                    
                    {item.id === 'mrt_ifg' && (
                      <>
                        <Regular
                          label={'Mitochondrial Replacement Therapy (MRT) is a specialized form of IVF often called "three-person IVF."'}
                          fontSize={mvs(14)}
                            numberOfLines={10}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                        />
                        
                        <Regular
                          label="It replaces the mitochondrial DNA in an egg to prevent the transmission of genetic mitochondrial diseases or improve egg quality in older patients."
                          fontSize={mvs(14)}
                            numberOfLines={10}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                        />
                        
                        <Bold
                          label="Key Facts:"
                          fontSize={mvs(16)}
                          color={colors.textColor || '#404040'}
                          style={styles.keyFactsTitle}
                        />
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Status:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Highly specialized; available in limited regions (e.g., UK, parts of Europe)."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Purpose:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Treating mitochondrial disease and advanced age infertility."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Availability:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Restricted to specific research centers and clinics."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <PrimaryButton
                          containerStyle={styles.searchButton}
                          loading={false}
                          onPress={() => {
                            // Handle search for clinics
                          }}
                          title="Locate Advanced Fertility Centers"
                        />
                        
                        <Regular
                          label="Source: NCBI (National Institutes of Health)"
                          fontSize={mvs(12)}
                            numberOfLines={10}
                          color={"#8C8C8C"}
                          style={styles.sourceText}
                        />
                      </>
                    )}
                    
                    {item.id === 'genetic_testing' && (
                      <>
                        <Regular
                          label="Determine your risk of passing on genetic conditions to your child."
                          fontSize={mvs(14)}
                            numberOfLines={10}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                        />
                        
                        <Regular
                          label="Our partner, iGenomix, offers comprehensive screening for over 600 hereditary disorders."
                          fontSize={mvs(14)}
                            numberOfLines={10}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                        />
                        
                        <Bold
                          label="Key Facts:"
                          fontSize={mvs(16)}
                          color={colors.textColor || '#404040'}
                          style={styles.keyFactsTitle}
                        />
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Screening:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Comprehensive testing for over 600 hereditary disorders."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Partner:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" iGenomix provides professional genetic screening services."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Testing:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Recessive autosomal testing available through iGenomix."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <PrimaryButton
                          containerStyle={styles.searchButton}
                          loading={false}
                          onPress={() => {
                            // Handle order kit
                          }}
                          title="Order iGenomix Kit"
                        />
                        
                        <Regular
                          label="Partner: iGenomix"
                          fontSize={mvs(12)}
                            numberOfLines={10}
                          color={"#8C8C8C"}
                          style={styles.sourceText}
                        />
                      </>
                    )}
                    
                    {item.id === 'procreation_safety' && (
                      <>
                        <Regular
                          label="Ensuring a healthy pregnancy starts before conception."
                          fontSize={mvs(14)}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                            numberOfLines={10}
                        />
                        
                        <Regular
                          label="Whether you are using a donor or a partner, it is vital to screen for infectious diseases (STIs) and understand your genetic compatibility."
                          fontSize={mvs(14)}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                            numberOfLines={10}
                        />
                        
                        <Bold
                          label="Key Facts:"
                          fontSize={mvs(16)}
                          color={colors.textColor || '#404040'}
                          style={styles.keyFactsTitle}
                        />
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="STI Screening:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Test for HIV, Hepatitis B/C, Syphilis, Gonorrhea, and Chlamydia."
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                              numberOfLines={10}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Vaccinations:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Ensure Rubella and Varicella immunity before pregnancy."
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                              numberOfLines={10}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Folic Acid:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                              numberOfLines={10}
                          />
                          <Regular
                            label=" 400mcg daily is recommended to prevent birth defects."
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                              numberOfLines={10}
                          />
                        </View>
                        
                        <PrimaryButton
                          containerStyle={styles.searchButton}
                          loading={false}
                          onPress={() => {
                            // Handle search for testing centers
                          }}
                          title="Find STI Testing Centers Near Me"
                        />
                        
                        <Regular
                          label="Source: CDC"
                          fontSize={mvs(12)}
                            numberOfLines={10}
                          color={"#8C8C8C"}
                          style={styles.sourceText}
                        />
                      </>
                    )}
                    
                    {item.id === 'legal_resources' && (
                      <>
                        <Regular
                          label="Helix does not provide legal advice. Laws regarding gamete donation, surrogacy, and compensation vary by country. It is your responsibility to verify local requirements."
                          fontSize={mvs(14)}
                          color={colors.textColor || '#404040'}
                          style={styles.expandedText}
                            numberOfLines={10}
                        />
                        
                        <Bold
                          label="Key Facts:"
                            numberOfLines={10}
                          fontSize={mvs(16)}
                          color={colors.textColor || '#404040'}
                          style={styles.keyFactsTitle}
                        />
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Contracts are Vital:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Never exchange money or genetic material without a clinical contract."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Parental Rights:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Without a legal agreement, genetic donors may be considered legal parents and liable for child support."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <View style={styles.keyFactItem}>
                          <Bold
                            label="Surrogacy Laws:"
                            fontSize={mvs(14)}
                            color={colors.textColor || '#404040'}
                          />
                          <Regular
                            label=" Commercial surrogacy is illegal in some regions. Verify your local laws before proceeding."
                            fontSize={mvs(14)}
                              numberOfLines={10}
                            color={colors.textColor || '#404040'}
                          />
                        </View>
                        
                        <PrimaryButton
                          containerStyle={styles.searchButton}
                          loading={false}
                          onPress={() => {
                            // Handle search for attorneys
                          }}
                          title="Find Family Law Attorneys"
                        />
                        
                        <Regular
                          label="Source: CDC"
                          fontSize={mvs(12)}
                          color={"#8C8C8C"}
                          style={styles.sourceText}
                        />
                      </>
                    )}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Terms Modal */}
      <ModalWrapper
        visible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        style={styles.modalContainer}>
        <ScrollView 
          contentContainerStyle={styles.modalContent}
          showsVerticalScrollIndicator={false}>
          
          {/* Donate Icon */}
          <View style={styles.modalIconContainer}>
            <Image
              source={IMG.Donate}
              resizeMode="contain"
              style={styles.modalIcon}
            />
          </View>

          {/* Mission Section */}
          <Medium
            label={'Mission'}
            fontSize={mvs(18)}
            color={"#404040"}
            style={styles.sectionTitle}
          />
          
          <Regular
            label={'Despite technology keeping us more connected than ever, millions of people in search for a partner to start a family are finding it harder than ever, feeling disconnected and disheartened by the process. Meanwhile birth rates are declining and the dream of having a child is fading for many.'}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'This is where Helix can help.'}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'Our mission is to expand procreation options globally. We provide a dedicated platform to connect you with like-minded individuals who share your goal of having a child.'}
            fontSize={mvs(14)}
  color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'Helix is here to help you not just date, but procreate.'}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'Signed Team Helix'}
            fontSize={mvs(14)}
           color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />

          {/* Divider */}
          <View style={styles.modalDivider} />

          {/* Responsibility Section */}
          <Medium
            label={'Responsibility'}
            fontSize={mvs(18)}
            color={"#404040"}
            style={styles.sectionTitle}
          />
          
          <Regular
            label={'Helix is a technology platform and matching database, allowing users to connect with the like-minded goal of procreation in mind.'}
            fontSize={mvs(14)}
            color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />
          
          <Regular
            label={'We kindly request that all users engage in their own due diligence before proceeding with any next steps.'}
            fontSize={mvs(14)}
           color={"#404040"}
            style={styles.sectionText}
            numberOfLines={10}
          />

          {/* Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && (
                <Icon name="checkmark" size={mvs(14)} color={colors.helixPrimary} />
              )}
            </View>
            <View style={styles.checkboxTextContainer}>
              <Regular
                fontSize={mvs(12)}
                color={colors.black}
                style={styles.checkboxText}
                numberOfLines={2}>
                <Regular label={'I have read and agree to the '} fontSize={mvs(12)} color={"#404040"} />
                <Regular
                  label={'Terms and Conditions'}
                  fontSize={mvs(12)}
                  color={colors.helixPrimary}
                  style={{textDecorationLine: 'underline'}}
                  onPress={() => {}}
                />
                <Regular label={' and '} fontSize={mvs(12)} color={"#404040"} />
                <Regular
                  label={'Privacy Policy'}
                  fontSize={mvs(12)}
                  color={colors.helixPrimary}
                  style={{textDecorationLine: 'underline'}}
                  onPress={() => {}}
                />
                <Regular label={'.'} fontSize={mvs(12)} color={"#404040"} />
              </Regular>
            </View>
          </TouchableOpacity>

          {/* Agree Button */}
          <PrimaryButton
            containerStyle={styles.agreeButton}
            loading={false}
            onPress={handleAgree}
            title={'Agree'}
            disabled={!agreed}
            
          />
        </ScrollView>
      </ModalWrapper>
    </View>
  );
};

export default ResourcesScreen;
