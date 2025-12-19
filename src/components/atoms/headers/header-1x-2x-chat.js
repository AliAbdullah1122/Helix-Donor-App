import {useNavigation} from '@react-navigation/native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Medium from 'typography/medium-text';
import {Row} from '../row';
import {SearchInput} from '../inputs';

const HeaderX = ({
  style = {},
  mtop = 0,
  title,
  back = true,
  onChangeText = t => {},
  isSearch = false,
  placeholder = 'Search here',
  ...props
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
        {/* Left: Back Button */}
        {back ? (
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Icon
              name={'chevron-back'}
              size={mvs(30)}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <View style={{width: mvs(30)}} />
        )}

        {/* Center: Title */}
        {title ? (
          <Medium fontSize={mvs(20)} label={title} style={[styles.title]} />
        ) : (
          <View />
        )}

        {/* Right: Entypo Dots */}
        <TouchableOpacity
          onPress={() => {
            console.log('Menu pressed');
          }}
        >
          <Entypo
            name={'dots-three-vertical'}
            size={mvs(20)}
            color={colors.white}
          />
        </TouchableOpacity>
      </Row>

      {/* Optional Search Bar */}
      {isSearch && (
        <SearchInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          mtop={mtop}
        />
      )}
    </View>
  );
};

export default React.memo(HeaderX);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(15),
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
  },
});
