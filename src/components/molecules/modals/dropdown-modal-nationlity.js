import {CrossModal, CrossModalRed} from 'assets/icons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {colors} from 'config/colors';
import {ORDER_ITEMS} from 'config/constants';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import React, {useState, useEffect} from 'react';
import {
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

const DropdownModalNationality = ({
  style = {},
  value,
  visible = false,
  onClose = item => {},
  onChangeText,
  items = [],
  label = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => {
        const itemText = (item?.title || item?.name || item?.type || item?.id || '')
          .toString()
          .toLowerCase();
        return itemText.includes(searchQuery.toLowerCase());
      });
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  const handleItemSelect = (itemId) => {
    setSearchQuery('');
    onChangeText(itemId);
    onClose();
  };

  if (!visible) return null;

  // Render all dropdowns as inline views under the input
  return (
    <View style={styles.inlineDropdownContainer}>
      <View style={styles.simpleContainer}>
        <ScrollView
          contentContainerStyle={styles.simpleScrollContent}
          showsVerticalScrollIndicator={false}>
          {filteredItems.length === 0 ? (
            <View style={styles.noResults}>
              <Regular
                label="No items found"
                color={colors.gray}
                style={styles.noResultsText}
              />
            </View>
          ) : (
            filteredItems.map((item, index) => {
              const isLastItem = index === filteredItems.length - 1;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleItemSelect(item?.id)}
                  style={[
                    styles.simpleDropdownItem,
                    isLastItem && styles.simpleLastItem,
                  ]}>
                  <Regular
                    label={item?.title || item?.name || item?.type || item?.id}
                    style={{fontSize: mvs(16)}}
                    color={colors.textColor || '#404040'}
                  />
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default DropdownModalNationality;

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  simpleModalStyle: {
    width: '90%',
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxHeight: mvs(572),
    minHeight: mvs(200),
    backgroundColor: colors.white,
    paddingTop: mvs(15),
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  inlineDropdownContainer: {
    position: 'relative',
    zIndex: 1000,
    marginTop: mvs(4),
  },
  simpleContainer: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    maxHeight: mvs(300),
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  simpleScrollContent: {
    paddingVertical: mvs(8),
  },
  simpleDropdownItem: {
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(14),
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },
  simpleLastItem: {
    borderBottomWidth: 0,
  },
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  pick: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: mvs(20),
    color: colors.black,
    marginBottom: mvs(10),
  },
  button: {
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(12),
    marginBottom: mvs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: colors.lightGray,
  },
  cross: {
    paddingHorizontal: mvs(12),
    paddingVertical: mvs(5),
    alignSelf: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: mvs(20),
    marginBottom: mvs(10),
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: mvs(15),
    paddingHorizontal: mvs(10),
    backgroundColor: colors.inputBackground,
  },
  searchIcon: {
    marginRight: mvs(8),
  },
  searchInput: {
    flex: 1,
    fontSize: mvs(16),
    color: colors.black,
    paddingVertical: mvs(10),
  },
  clearButton: {
    padding: mvs(4),
  },
  noResults: {
    padding: mvs(20),
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: mvs(16),
    color: colors.gray,
  },
});