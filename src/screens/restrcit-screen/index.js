// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   Pressable,
//   FlatList,
//   LayoutAnimation,
//   Platform,
//   UIManager,
// } from 'react-native';
// import {colors} from 'config/colors';
// import {mvs} from 'config/metrices';
// import {navigate} from 'navigation/navigation-ref';
// import {PrimaryButton} from 'components/atoms/buttons';
// import * as IMG from 'assets/images';
// import Medium from 'typography/medium-text';
// import Regular from 'typography/regular-text';
// import Icon from 'react-native-vector-icons/Feather';

// // enable smooth expand animation for Android
// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const SubmitScreen = () => {
//   const [faqVisible, setFaqVisible] = useState(false);
//   const [expandedIndex, setExpandedIndex] = useState(null);
// const [currentStep, setCurrentStep] = useState(1); 

//   const faqs = [
//     {
//       id: 1,
//       question: 'How much time will take to approval',
//       answer:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     },
//     {
//       id: 2,
//       question: 'How to cancel application?',
//       answer:
//         'You can cancel your application anytime before verification by contacting support.',
//     },
//     {
//       id: 3,
//       question: 'Lorem epsum?',
//       answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     {
//       id: 4,
//       question: 'Lorem epsum?',
//       answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
//     },
//   ];

//   const toggleExpand = index => {
//     LayoutAnimation.easeInEaseOut();
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   return (
//     <View style={{flex: 1, backgroundColor: colors.white}}>
//       <ScrollView
//         contentContainerStyle={{
//           flexGrow: 1,
// paddingBottom: mvs(120),
//           backgroundColor: colors.white,
//         }}>
//         {/* Orange Header Section */}
//         <View
//           style={{
//             backgroundColor: colors.primary,
//             height: mvs(300),
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           {/* Logo Circle */}
//           <View
//             style={{
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginBottom: mvs(190),
//             }}>
//             <Image
//               source={IMG.parcelNew}
//               resizeMode="contain"
//               style={{width: mvs(59), height: mvs(66)}}
//             />
//           </View>
//         </View>

//         {/* White Card Overlay */}
//         <View style={{backgroundColor: colors.white}}>
//           <View
//             style={{
//               backgroundColor: colors.white,
//               marginHorizontal: mvs(16),
//               marginTop: mvs(-200),
//               borderRadius: mvs(12),
//               shadowColor: '#000',
//               shadowOpacity: 0.1,
//               shadowRadius: 6,
//               elevation: 5,
//               paddingVertical: mvs(15),
//               paddingHorizontal: mvs(20),
//             }}>
//             {/* Title */}
            // <Medium
            //   label="Thanks for submit your application"
            //   color={colors.black}
            //   numberOfLines={2}
            //   fontSize={mvs(16)}
            //   style={{
            //     textAlign: 'center',
            //     fontWeight: '500',
            //     marginBottom: mvs(4),
            //   }}
            // />
            // <Regular
            //   numberOfLines={3}
            //   label="We’re reviewing your identity. We take security seriously and your information is safe with us."
            //   color={colors.subteXTcOLOR}
            //   fontSize={mvs(13)}
            //   style={{
            //     textAlign: 'center',
            //     lineHeight: mvs(18),
            //     fontWeight: '400',
            //   }}
            // />

//             {/* Center Icon */}
//             <View style={{alignItems: 'center', marginVertical: mvs(14)}}>
//               <Image
//                 source={IMG.submitimage}
//                 resizeMode="contain"
//                 style={{width: mvs(120), height: mvs(120)}}
//               />
//             </View>

//             {/* Steps */}
//             <View style={{marginTop: mvs(10), marginBottom: mvs(25)}}>
//               {/* Step 1 */}
//               <View style={{flexDirection: 'row', marginBottom: mvs(25)}}>
//                 <View style={{alignItems: 'center'}}>
//                   <View
//                     style={{
//                       width: mvs(22),
//                       height: mvs(22),
//                       borderRadius: mvs(11),
//                       backgroundColor: colors.primary,
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}>
//                     <Text style={{color: colors.white, fontSize: mvs(13)}}>
//                       ✓
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       width: mvs(3),
//                       height: mvs(40),
//                       backgroundColor: colors.borderColor,
//                       marginTop: mvs(5),
//                     }}
//                   />
//                 </View>

//                 <View style={{flex: 1, marginLeft: mvs(12)}}>
//                   <Medium
//                     label="Application submitted to App"
//                     fontSize={mvs(14)}
//                     color={colors.black}
//                   />
//                   <Regular
//                     label="We’ve sent your request to our management on 10 June 2025"
//                     color={colors.subteXTcOLOR}
//                     numberOfLines={10}
//                     fontSize={mvs(12)}
//                     style={{marginTop: mvs(2)}}
//                   />
//                 </View>
//               </View>

//               {/* Step 2 */}
//               <View style={{flexDirection: 'row', marginBottom: mvs(25)}}>
//                 <View style={{alignItems: 'center'}}>
//                   <View
//                     style={{
//                       width: mvs(22),
//                       height: mvs(22),
//                       borderRadius: mvs(11),
//                       borderWidth: 2,
//                       borderColor: colors.primary,
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}>
                    // <View
                    //   style={{
                    //     width: mvs(10),
                    //     height: mvs(10),
                    //     borderRadius: mvs(5),
                    //     backgroundColor: colors.primary,
                    //   }}
                    // />
//                   </View>
//                   <View
//                     style={{
//                       width: mvs(3),
//                       height: mvs(35),
//                       backgroundColor: colors.borderColor,
//                       marginTop: mvs(5),
//                     }}
//                   />
//                 </View>

//                 <View style={{flex: 1, marginLeft: mvs(12)}}>
//                   <Medium
//                     label="Application is under scrutiny"
//                     fontSize={mvs(14)}
//                     color={colors.black}
//                   />
//                   <Regular
//                     label="We’ve sent your request to our management on 10 June 2025"
//                     color={colors.subteXTcOLOR}
//                     numberOfLines={10}
//                     fontSize={mvs(12)}
//                     style={{marginTop: mvs(2)}}
//                   />
//                 </View>
//               </View>

//               {/* Step 3 */}
//               <View style={{flexDirection: 'row'}}>
//                 <View style={{alignItems: 'center'}}>
//                   <View
//                     style={{
//                       width: mvs(22),
//                       height: mvs(22),
//                       borderRadius: mvs(11),
//                       backgroundColor: '#EAEAEA',
//                     }}
//                   />
//                 </View>

//                 <View style={{flex: 1, marginLeft: mvs(12)}}>
//                   <Medium
//                     label="Verified your application as a driver"
//                     fontSize={mvs(14)}
//                     color={colors.black}
//                   />
//                   <Regular
//                     label="We’ve sent your request to our management on 10 June 2025"
//                     color={colors.subteXTcOLOR}
//                     numberOfLines={10}
//                     fontSize={mvs(12)}
//                     style={{marginTop: mvs(2)}}
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Read FAQ Button */}
//             <TouchableOpacity
//               onPress={() => setFaqVisible(true)}
//               style={{
//                 borderWidth: 1,
//                 borderColor: colors.primary,
//                 borderRadius: mvs(50),
//                 paddingVertical: mvs(12),
//                 alignItems: 'center',
//                 // marginBottom: mvs(20),
//               }}>
//               <Medium
//                 label="Read FAQ"
//                 color={colors.primary}
//                 fontSize={mvs(15)}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//       {/* <View style={{backgroundColor:"red"}}> */}
//       {/* Sign Out Button */}
//       <View
//         style={{
//           // backgroundColor: colors.white, // ensures it blends in naturally
//           paddingVertical: mvs(10),
//           // borderTopWidth: 1,
//           // borderColor: '#EAEAEA', // subtle divider line (optional)
//         }}>
//         <PrimaryButton
//           title="Sign Out"
//           containerStyle={{
//             borderRadius: mvs(50),
//             width: '90%',
//             backgroundColor: colors.primary,
//             alignSelf: 'center',
//           }}
//         />
//       </View>

//       {/* </View> */}

//       {/* Sign Out Button */}

//       {/* ===== FAQ MODAL ===== */}
//       <Modal
//         visible={faqVisible}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setFaqVisible(false)}>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'flex-end',
//             backgroundColor: 'rgba(0,0,0,0.4)',
//           }}>
//           <View
//             style={{
//               backgroundColor: colors.white,
//               borderTopLeftRadius: mvs(25),
//               borderTopRightRadius: mvs(25),
//               paddingTop: mvs(15),
//               maxHeight: '80%',
//             }}>
//             {/* Drag Indicator */}
//             <View
//               style={{
//                 alignSelf: 'center',
//                 width: mvs(50),
//                 height: mvs(5),
//                 borderRadius: mvs(3),
//                 backgroundColor: '#D8D8D8',
//                 marginBottom: mvs(10),
//               }}
//             />

//             {/* Header */}
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingHorizontal: mvs(20),
//                 paddingBottom: mvs(10),
//                 borderBottomWidth: 1,
//                 borderColor: '#E5E5E5',
//               }}>
//               <Medium label="FAQs" fontSize={mvs(17)} color={colors.black} />
//               <TouchableOpacity onPress={() => setFaqVisible(false)}>
//                 <Text style={{fontSize: mvs(20), color: colors.black}}>✕</Text>
//               </TouchableOpacity>
//             </View>

//             {/* FAQ List */}
//             <FlatList
//               data={faqs}
//               keyExtractor={item => item.id.toString()}
//               contentContainerStyle={{padding: mvs(20), paddingBottom: mvs(50)}}
//               renderItem={({item, index}) => (
//                 <View
//                   style={{
//                     backgroundColor: colors.white,
//                     borderWidth: 1,
//                     borderColor: '#E6E6E6',
//                     borderRadius: mvs(12),
//                     marginBottom: mvs(15),
//                     overflow: 'hidden',
//                   }}>
//                   <Pressable
//                     onPress={() => toggleExpand(index)}
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       padding: mvs(15),
//                     }}>
//                     <Medium
//                       numberOfLines={10}
//                       label={item.question}
//                       fontSize={mvs(12)}
//                       color={colors.black}
//                       style={{fontWeight: '500'}}
//                       // style={{ color: colors.black, fontWeight: '600', fontSize: mvs(14) }}
//                     />

//                     <Icon
//                       name={
//                         expandedIndex === index ? 'chevron-up' : 'chevron-down'
//                       }
//                       size={mvs(18)}
//                       color={colors.black}
//                     />
//                   </Pressable>

//                   {expandedIndex === index && (
//                     <View
//                       style={{
//                         paddingHorizontal: mvs(15),
//                         paddingBottom: mvs(12),
//                       }}>
//                       <Regular
//                         numberOfLines={10}
//                         label={item.answer}
//                         fontSize={mvs(12)}
//                         color={colors.subteXTcOLOR}
//                         style={{fontWeight: '400'}}
//                         // style={{
//                         //   color: colors.subteXTcOLOR,
//                         //   fontSize: mvs(13),
//                         //   lineHeight: mvs(18),
//                         // }}
//                       />
//                     </View>
//                   )}
//                 </View>
//               )}
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default SubmitScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {PrimaryButton} from 'components/atoms/buttons';
import * as IMG from 'assets/images';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import Icon from 'react-native-vector-icons/Feather';
import { navigate } from 'navigation/navigation-ref';

// enable layout animation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RestrictScreen = () => {
  const [faqVisible, setFaqVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, or 3

  const faqs = [
    {
      id: 1,
      question: 'How much time will take to approval',
      answer:
        'It usually takes up to 2 business days for verification. Please be patient as we review your details.',
    },
    {
      id: 2,
      question: 'How to cancel application?',
      answer:
        'You can cancel your application anytime before verification by contacting our support team.',
    },
    {
      id: 3,
      question: 'How do I edit my submitted data?',
      answer: 'Go to your profile section and click on "Edit Application".',
    },
  ];

  const toggleExpand = index => {
    LayoutAnimation.easeInEaseOut();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: mvs(120),
          backgroundColor: colors.white,
        }}>
        {/* Orange Header */}
        <View
          style={{
            backgroundColor: colors.primary,
            height: mvs(300),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={IMG.parcelNew}
            resizeMode="contain"
            style={{width: mvs(59), height: mvs(66), marginBottom: mvs(190)}}
          />
        </View>

        {/* White Card */}
        <View style={{backgroundColor: colors.white}}>
          <View
            style={{
              backgroundColor: colors.white,
              marginHorizontal: mvs(16),
              marginTop: mvs(-200),
              borderRadius: mvs(12),
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5,
              paddingVertical: mvs(15),
              paddingHorizontal: mvs(20),
            }}>
            {/* === Conditional Title & Image === */}
            {currentStep === 3 ? (
              <>
                <Medium
                  label="Congratulations"
                  color={colors.black}
                  fontSize={mvs(18)}
                  style={{
                    textAlign: 'center',
                    fontWeight: '600',
                    marginBottom: mvs(4),
                  }}
                />
                <Regular
                  label="Your application has been approved successfully!"
                  color={colors.subteXTcOLOR}
                  numberOfLines={10}
                  fontSize={mvs(14)}
                  style={{
                    textAlign: 'center',
                    lineHeight: mvs(20),
                    fontWeight: '400',
                  }}
                />
                <View style={{alignItems: 'center', marginVertical: mvs(14)}}>
                  <Image
                    source={IMG.completesubmit}
                    resizeMode="contain"
                    style={{width: mvs(120), height: mvs(120)}}
                  />
                </View>
              </>
            ) : (
              <>
                <Medium
                  label="Thanks for submitting your application"
                  color={colors.black}
                  fontSize={mvs(16)}
                  style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    marginBottom: mvs(4),
                  }}
                />
                <Regular
                  label="We’re reviewing your identity. Your information is safe with us."
                  color={colors.subteXTcOLOR}
                  fontSize={mvs(13)}
                  numberOfLines={3}
                  style={{
                    textAlign: 'center',
                    lineHeight: mvs(18),
                    fontWeight: '400',
                  }}
                />
                <View style={{alignItems: 'center', marginVertical: mvs(14)}}>
                  <Image
                    source={IMG.restricted}
                    resizeMode="contain"
                    style={{width: mvs(120), height: mvs(120)}}
                  />
                </View>
              </>
            )}

            {/* === Steps Section === */}
            <View style={{marginTop: mvs(10), marginBottom: mvs(25)}}>
              {/* Step 1 */}
              <View style={{flexDirection: 'row', marginBottom: mvs(25)}}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: mvs(22),
                      height: mvs(22),
                      borderRadius: mvs(11),
                      backgroundColor: colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: colors.white, fontSize: mvs(13)}}>✓</Text>
                  </View>
                  <View
                    style={{
                      width: mvs(3),
                      height: mvs(40),
                      backgroundColor: colors.borderColor,
                      marginTop: mvs(5),
                    }}
                  />
                </View>
                <View style={{flex: 1, marginLeft: mvs(12)}}>
                  <Medium
                    label="Application submitted to App"
                    fontSize={mvs(14)}
                    color={colors.black}
                  />
                  <Regular
                    label="We’ve sent your request to our management on 10 June 2025"
                    color={colors.subteXTcOLOR}
                     numberOfLines={10}
                    fontSize={mvs(12)}
                    style={{marginTop: mvs(2)}}
                  />
                </View>
              </View>

              {/* Step 2 */}
              <View style={{flexDirection: 'row', marginBottom: mvs(25)}}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: mvs(22),
                      height: mvs(22),
                      borderRadius: mvs(11),
                      borderWidth: 2,
                      borderColor: colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        currentStep >= 2 ? colors.primary : 'transparent',
                    }}>
                    {/* {currentStep >= 2 && (
                      <Text style={{color: colors.white, fontSize: mvs(13)}}>✓</Text>
                    )} */}

                    {currentStep >= 2 ? (
    // show checkmark when step >= 2
    <Text style={{color: colors.white, fontSize: mvs(13)}}>✓</Text>
  ) : (
    // show inner dot when step < 2
    <View
      style={{
        width: mvs(10),
        height: mvs(10),
        borderRadius: mvs(5),
        backgroundColor: colors.primary,
      }}
    />
  )}
                  </View>
                  <View
                    style={{
                      width: mvs(3),
                      height: mvs(35),
                      backgroundColor: colors.borderColor,
                      marginTop: mvs(5),
                    }}
                  />
                </View>

                <View style={{flex: 1, marginLeft: mvs(12)}}>
                  <Medium
                    label="Application is under scrutiny"
                    fontSize={mvs(14)}
                    numberOfLines={2}
                    color={colors.black}
                  />
                  <Regular
                    label="We’re reviewing your details for verification."
                    color={colors.subteXTcOLOR}
                    numberOfLines={10}
                    fontSize={mvs(12)}
                    style={{marginTop: mvs(2)}}
                  />
                </View>
              </View>

              {/* Step 3 */}
              <View style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: mvs(22),
                      height: mvs(22),
                      borderRadius: mvs(11),
                      borderWidth: currentStep === 2 ? 1 : 0,
        borderColor: currentStep === 2 ? 'red' : 'transparent',
                      backgroundColor:
          currentStep === 3
            ? colors.primary
            : currentStep === 2
            ? colors.white
            : '#EAEAEA',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {/* {currentStep === 3 && (
                      <Text style={{color: colors.white, fontSize: mvs(13)}}>✓</Text>
                    )} */}
                    {currentStep === 3 ? (
        <Text style={{color: colors.white, fontSize: mvs(13)}}>✓</Text>
      ) : currentStep === 2 ? (
        <Text style={{color: 'red', fontSize: mvs(11),textAlign:"center",marginBottom:mvs(2)}}>✕</Text>
      ) : null}
                  </View>
                </View>
                <View style={{flex: 1, marginLeft: mvs(12)}}>
                  <Medium
                    label="Verified your application as a driver"
                    fontSize={mvs(14)}
                    numberOfLines={2}
                    color={colors.black}
                  />
                  <Regular
                    label="Your application has been successfully approved."
                    color={colors.subteXTcOLOR}
                    numberOfLines={10}
                    fontSize={mvs(12)}
                    style={{marginTop: mvs(2)}}
                  />
                </View>
              </View>
            </View>

            {/* === Conditional Buttons === */}
            {/* {currentStep === 1 ? (
              <TouchableOpacity
                onPress={() => setFaqVisible(true)}
                style={{
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: mvs(50),
                  paddingVertical: mvs(12),
                  alignItems: 'center',
                }}>
                <Medium label="Read FAQ" color={colors.primary} fontSize={mvs(15)} />
              </TouchableOpacity>
            ) : currentStep === 2 ? (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: mvs(50),
                  paddingVertical: mvs(12),
                  alignItems: 'center',
                }}>
                <Medium label="Edit Application" color={colors.primary} fontSize={mvs(15)} />
              </TouchableOpacity>
            ) : null} */}

            {currentStep === 1 ? (
  <TouchableOpacity
    onPress={() => setFaqVisible(true)}
    style={{
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: mvs(50),
      paddingVertical: mvs(12),
      alignItems: 'center',
    }}>
    <Medium label="Read FAQ" color={colors.primary} fontSize={mvs(15)} />
  </TouchableOpacity>
) : currentStep === 2 ? (
  <TouchableOpacity
    style={{
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: mvs(50),
      paddingVertical: mvs(12),
      alignItems: 'center',
    }}>
    <Medium label="Edit Application" color={colors.primary} fontSize={mvs(15)} />
  </TouchableOpacity>
) : currentStep === 3 ? (
  <TouchableOpacity
    onPress={() => navigate('Drawer')}
    style={{
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: mvs(50),
      paddingVertical: mvs(12),
      alignItems: 'center',
    }}>
    <Medium label="Go to Orders" color={colors.primary} fontSize={mvs(15)} />
  </TouchableOpacity>
) : null}

          </View>
        </View>
      </ScrollView>

      {/* === Sign Out Button === */}
      <View style={{paddingVertical: mvs(10)}}>
        <PrimaryButton
          title="Sign Out"
          containerStyle={{
            borderRadius: mvs(50),
            width: '90%',
            backgroundColor: colors.primary,
            alignSelf: 'center',
          }}
        />
      </View>

      {/* === FAQ Modal === */}
      <Modal
        visible={faqVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFaqVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              borderTopLeftRadius: mvs(25),
              borderTopRightRadius: mvs(25),
              paddingTop: mvs(15),
              maxHeight: '80%',
            }}>
            <View
              style={{
                alignSelf: 'center',
                width: mvs(50),
                height: mvs(5),
                borderRadius: mvs(3),
                backgroundColor: '#D8D8D8',
                marginBottom: mvs(10),
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: mvs(20),
                paddingBottom: mvs(10),
                borderBottomWidth: 1,
                borderColor: '#E5E5E5',
              }}>
              <Medium label="FAQs" fontSize={mvs(17)} color={colors.black} />
              <TouchableOpacity onPress={() => setFaqVisible(false)}>
                <Text style={{fontSize: mvs(20), color: colors.black}}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={faqs}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{padding: mvs(20), paddingBottom: mvs(50)}}
              renderItem={({item, index}) => (
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderWidth: 1,
                    borderColor: '#E6E6E6',
                    borderRadius: mvs(12),
                    marginBottom: mvs(15),
                  }}>
                  <Pressable
                    onPress={() => toggleExpand(index)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: mvs(15),
                    }}>
                    <Medium
                      label={item.question}
                      numberOfLines={10}
                      fontSize={mvs(13)}
                      color={colors.black}
                      style={{fontWeight: '500'}}
                    />
                    <Icon
                      name={
                        expandedIndex === index ? 'chevron-up' : 'chevron-down'
                      }
                      size={mvs(18)}
                      color={colors.black}
                    />
                  </Pressable>
                  {expandedIndex === index && (
                    <View
                      style={{
                        paddingHorizontal: mvs(15),
                        paddingBottom: mvs(12),
                      }}>
                      <Regular
                        label={item.answer}
                        numberOfLines={30}
                        fontSize={mvs(12)}
                        color={colors.subteXTcOLOR}
                      />
                    </View>
                  )}
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RestrictScreen;
