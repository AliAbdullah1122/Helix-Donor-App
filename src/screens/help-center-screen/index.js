import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {goBack} from 'navigation/navigation-ref';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import {Row} from 'components/atoms/row';
import {UTILS} from 'utils';
import * as IMG from 'assets/images';

const HelpCenterScreen = () => {
  const [expandedSections, setExpandedSections] = useState({
    customerService: true,
    email: false,
    website1: false,
    website2: false,
    facebook1: false,
    facebook2: false,
  });

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePhoneCall = phoneNumber => {
    UTILS.dialPhone(phoneNumber);
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@example.com');
  };

  const handleWebsite1 = () => {
    Linking.openURL('https://wa.me/1234567890');
  };

  const handleWebsite2 = () => {
    Linking.openURL('https://www.example.com');
  };

  const handleFacebook1 = () => {
    UTILS.openFacebookLink();
  };

  const handleFacebook2 = () => {
    UTILS.openTwitterLink();
  };

  const renderSection = (
    key,
    imageSource,
    title,
    isExpanded,
    content,
    onPress = null,
  ) => {
    return (
      <View style={[styles.card, isExpanded && styles.cardActive]}>
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={onPress || (() => toggleSection(key))}>
          <Row style={styles.cardHeaderRow}>
            <View style={styles.iconContainer}>
              <Image
                source={imageSource}
                style={[
                  styles.iconImage,
                  isExpanded && {tintColor: colors.primary},
                ]}
                resizeMode="contain"
              />
            </View>
            <Medium
              label={title}
              fontSize={mvs(14)}
              color={colors.blackgrey}
              style={styles.cardTitle}
            />
            <Icon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={mvs(20)}
              color={isExpanded ? colors.primary : colors.subteXTcOLOR}
            />
          </Row>
        </TouchableOpacity>
        {isExpanded && content}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="chevron-back" size={mvs(30)} color={colors.white} />
        </TouchableOpacity>
        <Medium
          label="Help Center"
          color={colors.white}
          fontSize={mvs(18)}
          style={styles.headerTitle}
        />
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Customer Service */}
        {renderSection(
          'customerService',
          IMG.Support,
          'Customer Service',
          expandedSections.customerService,
          <View style={styles.expandedContent}>
            <TouchableOpacity
              style={styles.phoneRow}
              onPress={() => handlePhoneCall('+9664805550103')}>
              <View style={styles.phoneNumberContainer}>
                <View style={styles.bullet} />
                <Regular
                  label="+966(480) 555-0103"
                  fontSize={mvs(14)}
                  color={colors.blackgrey}
                />
              </View>
              <MaterialIcons
                name="phone"
                size={mvs(20)}
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.phoneRow}
              onPress={() => handlePhoneCall('+9664805550103')}>
              <View style={styles.phoneNumberContainer}>
                <View style={styles.bullet} />
                <Regular
                  label="+966 (480) 555-0103"
                  fontSize={mvs(14)}
                  color={colors.blackgrey}
                />
              </View>
              <MaterialIcons
                name="phone"
                size={mvs(20)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>,
        )}

        {/* Email */}
        {renderSection(
          'email',
          IMG.Email,
          'Email',
          expandedSections.email,
          <View style={styles.expandedContent}>
            <TouchableOpacity onPress={handleEmail}>
              <Regular
                label="support@example.com"
                fontSize={mvs(14)}
                color={colors.blackgrey}
              />
            </TouchableOpacity>
          </View>,
        )}

        {/* Website 1 (WhatsApp) */}
        {renderSection(
          'website1',
          IMG.Whatsapp,
          'Website',
          expandedSections.website1,
          <View style={styles.expandedContent}>
            <TouchableOpacity onPress={handleWebsite1}>
              <Regular
                label="Contact us on WhatsApp"
                fontSize={mvs(14)}
                color={colors.blackgrey}
              />
            </TouchableOpacity>
          </View>,
        )}

        {/* Website 2 (Globe) */}
        {renderSection(
          'website2',
          IMG.Language,
          'Website',
          expandedSections.website2,
          <View style={styles.expandedContent}>
            <TouchableOpacity onPress={handleWebsite2}>
              <Regular
                label="Visit our website"
                fontSize={mvs(14)}
                color={colors.blackgrey}
              />
            </TouchableOpacity>
          </View>,
        )}

        {/* Facebook 1 */}
        {renderSection(
          'facebook1',
          IMG.Facebook,
          'Facebook',
          expandedSections.facebook1,
          <View style={styles.expandedContent}>
            <TouchableOpacity onPress={handleFacebook1}>
              <Regular
                label="Follow us on Facebook"
                fontSize={mvs(14)}
                color={colors.blackgrey}
              />
            </TouchableOpacity>
          </View>,
        )}

        {/* Facebook 2 (X/Twitter) */}
        {renderSection(
          'facebook2',
          IMG.TwitterNew,
          'Facebook',
          expandedSections.facebook2,
          <View style={styles.expandedContent}>
            <TouchableOpacity onPress={handleFacebook2}>
              <Regular
                label="Follow us on X (Twitter)"
                fontSize={mvs(14)}
                color={colors.blackgrey}
              />
            </TouchableOpacity>
          </View>,
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(12),
    height: mvs(60),
  },
  backButton: {
    padding: mvs(5),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: mvs(40),
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: mvs(16),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    borderWidth: 1,
    borderColor: '#EBECEF',
    marginBottom: mvs(12),
    overflow: 'hidden',
  },
  cardActive: {
    borderColor: colors.primary,
  },
  cardHeader: {
    padding: mvs(15),
  },
  cardHeaderRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: mvs(12),
  },
  iconImage: {
    width: mvs(24),
    height: mvs(24),
  },
  cardTitle: {
    flex: 1,
  },
  expandedContent: {
    paddingHorizontal: mvs(15),
    paddingBottom: mvs(15),
    borderTopWidth: 1,
    borderTopColor: '#EBECEF',
    marginTop: mvs(10),
    paddingTop: mvs(15),
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: mvs(12),
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bullet: {
    width: mvs(6),
    height: mvs(6),
    borderRadius: mvs(3),
    backgroundColor: colors.primary,
    marginRight: mvs(10),
  },
});

export default HelpCenterScreen;

