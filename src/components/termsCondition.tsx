// react components
import React from "react";

// react native components
import { Modal, View, Text, ScrollView, TouchableOpacity } from "react-native";

// expo components

// global components
import { globalState } from "src/store";

// constants
import Colors from "src/constants/colors";

type Props = {};

const TermsConditions = (props: Props) => {
  const { isTermsVisble, setIsTermsVisble, setChecked, setPopUpProps } = globalState();

  const handleAccept = () => {
    setChecked(true);
    setIsTermsVisble(false);
  };

  const handleDecline = () => {
    setChecked(false);
    setIsTermsVisble(false);
    setPopUpProps({
      visible: true,
      typeMessage: "info",
      title: "Terms and Conditions",
      message:
        "Shop@Ease  cannot be used without accepting our terms and conditions",
    });
  };
  return (
    <Modal
      animationType="slide"
      visible={isTermsVisble}
      onRequestClose={handleDecline}
    >
      <View
        style={{ backgroundColor: Colors.primary }}
        className="flex-1 items-center justify-center px-8 pt-12 pb-4"
      >
        <Text className="text-3xl text-white font-bold">Shop@Ease</Text>
        <Text className="text-2xl text-white font-bold">
          Terms and Conditions
        </Text>
        <ScrollView className="my-6">
          <Text className="text-white">
            By accessing and using the Shop@Ease mobile application, you agree
            to comply with and be bound by the following terms and conditions:
            1. **User Agreement:** - The use of the App is subject to acceptance
            and compliance with these terms. By using the App, you acknowledge
            that you have read, understood, and agree to be bound by these
            terms. 2. **Account Registration:** - To access certain features of
            the App, you may be required to register for an account. You agree
            to provide accurate, current, and complete information during the
            registration process and to update such information to keep it
            accurate, current, and complete. 3. **Use of the App:** - You agree
            to use the App for lawful purposes only and in accordance with these
            terms. Any unauthorized use of the App is strictly prohibited. 4.
            **Shopping Lists and Content:** - The App allows you to create and
            manage shopping lists. You are solely responsible for the content of
            your lists. Shop@Ease reserves the right to remove any content that
            violates these terms or is deemed inappropriate. 5. **Data
            Privacy:** - Shop@Ease takes user privacy seriously. Please refer to
            our Privacy Policy for information on how we collect, use, and
            disclose your personal information. 6. **Sharing Lists:** - The App
            provides the option to share your shopping lists with family or
            friends. You are responsible for the content you share and must
            ensure that you have the right to share any personal information. 7.
            **Intellectual Property:** - All intellectual property rights in the
            App and its content are owned by Shop@Ease. You agree not to
            reproduce, distribute, modify, or create derivative works from any
            material found on the App without express written consent. 8.
            **Modifications to the App:** - Shop@Ease reserves the right to
            modify, suspend, or discontinue the App, or any part thereof, at any
            time and without notice. 9. **Termination:** - Shop@Ease reserves
            the right to terminate your access to the App, without cause or
            notice, which may result in the forfeiture and destruction of all
            information associated with your account. 10. **Disclaimer:** - The
            App is provided "as is" without any warranties, express or implied.
            Shop@Ease does not warrant that the App will be error-free or
            uninterrupted. 11. **Governing Law:** - These terms and conditions
            are governed by and construed in accordance with the laws of [Your
            Jurisdiction], and you agree to submit to the exclusive jurisdiction
            of the courts in that jurisdiction. By using the Shop@Ease App, you
            agree to these terms and conditions. If you do not agree to these
            terms, please do not use the App. Shop@Ease may update these terms
            from time to time, and your continued use of the App constitutes
            acceptance of those changes.
          </Text>
        </ScrollView>
        <View className="h-fit w-full flex-row items-center justify-center space-x-6">
          <TouchableOpacity
            onPress={handleAccept}
            className="h-12 w-36 items-center justify-center bg-white rounded-md"
          >
            <Text
              style={{ color: Colors.primary }}
              className="text-base font-bold"
            >
              I Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDecline}
            className="h-12 w-36 items-center justify-center bg-[#9f3c2dfd] rounded-md"
          >
            <Text className="text-base text-white font-bold">I Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TermsConditions;
