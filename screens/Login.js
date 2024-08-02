import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { Block, Text, theme, Toast } from "galio-framework";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

class Login extends React.Component {
  state = {
    username: '',
    showToast: false,
    showErrorModal: false,
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handleLogin = async () => {
    const { username } = this.state;
    const { navigation } = this.props;
    
    if (!username) {
      // Handle empty fields
      this.setState({ showToast: true });
      setTimeout(() => {
        this.setState({ showToast: false });
      }, 3000);
    } else {
    //GO TO APİ
    navigation.navigate('App');
    }
  };

  render() {
    const { showToast, showErrorModal } = this.state;
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.loginContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Google ile Giriş Yap
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex style={{ marginTop : 40}}>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Kendinize eşsiz bir kullanıcı adı seçin ve yarışmaya başlayın !
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ }}>
                      <Input
                        onChangeText={this.handleUsernameChange}
                        borderless
                        placeholder="Kullanıcı Adı"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        error={!this.state.username && showToast}
                      />
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton}  onPress={this.handleLogin}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Giriş Yap
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
            {/* Error Modal */}
            {showErrorModal && (
              <Block style={styles.errorModal}>
                <Text style={{ marginBottom: 10 }}>
                  Hatalı kullanıcı adı girdiniz.
                </Text>
                <Button onPress={() => this.setState({ showErrorModal: false })}>
                  Kapat
                </Button>
              </Block>
            )}
            {/* Toast notifications */}
            <Toast isShow={showToast} positionIndicator="bottom" color="error">
              Lütfen kullanıcı adını girin.
            </Toast>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  createButton: {
    width: width * 0.5,
    marginTop: 70
  },
  errorModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    top: "40%",
    left: "10%",
    width: width * 0.8,
    alignItems: "center"
  }
});

export default Login;
