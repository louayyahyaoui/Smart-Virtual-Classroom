import React, { Component } from "react";
import { Header, Table } from "semantic-ui-react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import CloserIcon from "../../assests/Closer-ico.ico";
import { isAuth } from "../../helpers/auth";
import axios from "axios";

import { toast } from "react-toastify";
import ComponentSkills from "./ComponentSkills";
import ComponentLanguages from "./ComponentLanguages";
import ComponentInterests from "./ComponentInterests";

const theme = {
  background: "#ffffff",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#BF1337",
  headerFontColor: "#ffffff",
  headerFontSize: "15px",
  botBubbleColor: "#BF1337",
  botFontColor: "#ffffff",
  userBubbleColor: "#ffffff",
  userFontColor: "#4a4a4a",
};
class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      languages: [],
      skills: [],
      phoneNumber: "11",
      address: "22",
      interests: [],
    };
  }

  componentWillMount() {
    const { steps } = this.props;

    const {
      name,
      email,
      password,
      languages,
      skills,
      phoneNumber,
      address,
      interests,
    } = steps;

    this.setState({
      name,
      email,
      password,
      languages,
      skills,
      phoneNumber,
      address,
      interests,
    });
  }

  render() {
    const {
      name,
      email,
      password,
      languages,
      skills,
      phoneNumber,
      address,
      interests,
    } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <h3>Summary</h3>
        {!isAuth() ? (
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{name.value}</td>
              </tr>
              <tr>
                <td>email</td>
                <td>{email.value}</td>
              </tr>
              <tr>
                <td>password</td>
                <td>{password.value}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <Table basic="very" celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Informations</Table.HeaderCell>
                <Table.HeaderCell>Your Answers</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Phone Number</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  {this.props.steps.AnswerPhoneNumber.message}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Address</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  {this.props.steps.AnswerAddress.message}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Skills</Header.Content>
                  </Header>
                </Table.Cell>

                {this.props.RendredValue.botskills.map((skill, index) => (
                  <Table.Cell key={index}>{skill}</Table.Cell>
                ))}
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Languages</Header.Content>
                  </Header>
                </Table.Cell>

                {this.props.RendredValue.botlanguages.map((skill, index) => (
                  <Table.Cell key={index}>{skill}</Table.Cell>
                ))}
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>Interests</Header.Content>
                  </Header>
                </Table.Cell>

                {this.props.RendredValue.botinterest.map((skill, index) => (
                  <Table.Cell key={index}>{skill}</Table.Cell>
                ))}
              </Table.Row>
            </Table.Body>
          </Table>
        )}
      </div>
    );
  }
}

Chatbot.propTypes = {
  steps: PropTypes.object,
};

Chatbot.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namee: "",
      emaill: "",
      passwordd: "",
      languagess: [],
      skillss: [],
      phoneNumberr: "",
      addresss: "",
      interestss: [],
      stepps: [],
      botskills: [],
      botlanguages: [],
      botinterest: [],
    };
    this.updateSkills = this.updateSkills.bind(this);
    this.updateLanguages = this.updateLanguages.bind(this);
    this.updateInterests = this.updateInterests.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
  }

  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.updateLanguages = this.updateLanguages.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateInterests = this.updateInterests.bind(this);
  }

  componentDidUpdate() {
    this.handleEnd = this.handleEnd.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.updateLanguages = this.updateLanguages.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateInterests = this.updateInterests.bind(this);
  }
  componentWillUnmount() {
    this.handleEnd = this.handleEnd.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.updateLanguages = this.updateLanguages.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateInterests = this.updateInterests.bind(this);
  }

  updateLanguages(newLanguages) {
    this.setState({
      languagess: newLanguages,
    });

    newLanguages.forEach((element) => {
      this.setState({
        botlanguages: this.state.botlanguages.push(element),
      });
    });
  }

  updatePhone(newPhone) {
    this.setState({
      phoneNumberr: newPhone,
    });
  }

  updateSkills(newSkills) {
    this.setState({
      skillss: newSkills,
    });

    for (let i = 0; i < newSkills.length; i++) {
      this.setState({
        botskills: this.state.botskills.push(newSkills[i]),
      });
    }
  }

  updateInterests(newInteests) {
    this.setState({
      interestss: newInteests,
    });

    newInteests.forEach((element) => {
      this.setState({
        botinterest: this.state.botinterest.push(element),
      });
    });
  }

  handleEnd({ steps, values }) {
    let name = this.state.namee;
    let email = this.state.emaill;
    let password = this.state.passwordd;
    let phone = this.state.phoneNumberr;
    let address = this.state.addresss;
    let skills = this.state.skillss;

    let languages = this.state.languagess;
    let interests = this.state.interestss;

    if (!isAuth()) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/register`, {
          name,
          email,
          password,
        })
        .then((res) => {
          toast.success(
            "Registration Done ! Check your email for account activation"
          );
        })
        .catch((err) => {
          toast.error(err.response.data.errors);
        });
    } else {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/user/updateProfile/${
            isAuth()._id
          }`,
          {
            name: isAuth().name,
            email: isAuth().email,
            bio: isAuth().bio,
            linkedInUrl: isAuth().linkedInUrl,
            GithubUrl: isAuth().GithubUrl,
            sexe: isAuth().sexe,
            address: address,
            phone: phone,
            birthday: isAuth().birthday,
            cv: isAuth().cv,
            picture: isAuth().picture,
          }
        )
        .then((res) => {
          axios
            .put(
              `${process.env.REACT_APP_API_URL}/api/user/updateUserDataSkills/${
                isAuth()._id
              }`,
              {
                skills: skills,
              }
            )
            .then(() => {
              axios
                .put(
                  `${
                    process.env.REACT_APP_API_URL
                  }/api/user/updateUserDataLanguages/${isAuth()._id}`,
                  {
                    languages: languages,
                  }
                )
                .then(() => {
                  axios
                    .put(
                      `${
                        process.env.REACT_APP_API_URL
                      }/api/user/updateUserDataInterestes/${isAuth()._id}`,
                      {
                        interes: interests,
                      }
                    )
                    .then(() => {
                      toast.success(
                        "Your profile has been updated succefully ;)"
                      );
                    });
                });
            });

          toast.success("Your profile has been updated succefully ;)");
        })
        .catch((err) => {
          toast.error(err.response.data.errors);
        });
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          floating={true}
          opened={false}
          botAvatar={CloserIcon}
          userAvatar={isAuth() && isAuth().picture}
          recognitionEnable={true}
          recognitionLang="en"
          speechSynthesis={{ enable: false, lang: "en" }}
          handleEnd={this.handleEnd}
          steps={
            !isAuth()
              ? [
                  {
                    id: "1",
                    message: "What is your full-name?",
                    trigger: "name",
                  },
                  {
                    id: "name",
                    user: true,
                    trigger: "3",
                    validator: (value) => {
                      if (!value) {
                        return "name required !";
                      }

                      this.setState({
                        namee: value,
                      });
                      return true;
                    },
                  },
                  {
                    id: "3",
                    message: "Hi {previousValue}! What is your email?",
                    trigger: "email",
                  },
                  {
                    id: "email",

                    user: true,

                    validator: (value) => {
                      if (!value) {
                        return "email required !";
                      } else if (
                        !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)
                      ) {
                        return "email invalid (exmp@exmp.exmp) ! ";
                      }

                      this.setState({
                        emaill: value,
                      });
                      return true;
                    },
                    trigger: "5",
                  },
                  {
                    id: "5",
                    message: "Choose a password?",
                    trigger: "password",
                  },
                  {
                    id: "password",
                    user: true,
                    trigger: "6",
                    validator: (value) => {
                      if (!value) {
                        return "password required !";
                      } else if (!/[A-Z]/.test(value)) {
                        return "password must start with capital lettre  ! ";
                      } else if (!/[0-9]/.test(value)) {
                        return "password must contain a number  ! ";
                      } else if (!(value.length >= 8)) {
                        return "password length must be greater than 7 caracters  ! ";
                      }
                      this.setState({
                        passwordd: value,
                      });
                      return true;
                    },
                  },
                  {
                    id: "6",
                    message: "Confirm your password?",
                    trigger: "passwordC",
                  },
                  {
                    id: "passwordC",
                    user: true,
                    trigger: "7",
                    validator: (value) => {
                      if (!value) {
                        return "password required !";
                      } else if (!/[A-Z]/.test(value)) {
                        return "password must start with capital lettre  ! ";
                      } else if (!/[0-9]/.test(value)) {
                        return "password must contain a number  ! ";
                      } else if (!(value.length >= 8)) {
                        return "password length must be greater than 7 caracters  ! ";
                      } else if (value !== this.state.passwordd) {
                        return `confirm password didnt match`;
                      }

                      return true;
                    },
                  },
                  {
                    id: "7",
                    message: "Great! Check out your summary",
                    trigger: "review",
                  },
                  {
                    id: "review",

                    component: (
                      <Chatbot
                        recognitionEnable={true}
                        recognitionLang="en"
                        speechSynthesis={{ enable: false, lang: "en" }}
                      />
                    ),
                    asMessage: true,
                  },
                  {
                    id: "update",
                    message: "Would you like to update some field?",
                    trigger: "update-question",
                  },
                  {
                    id: "update-question",
                    options: [
                      { value: "yes", label: "Yes", trigger: "update-yes" },
                      { value: "no", label: "No", trigger: "end-message" },
                    ],
                  },
                  {
                    id: "update-yes",
                    message: "What field would you like to update?",
                    trigger: "update-fields",
                  },
                  {
                    id: "update-fields",
                    options: [
                      { value: "name", label: "Name", trigger: "update-name" },
                      {
                        value: "email",
                        label: "email",
                        trigger: "update-email",
                      },
                      {
                        value: "password",
                        label: "password",
                        trigger: "update-password",
                      },
                    ],
                  },
                  {
                    id: "update-name",
                    update: "name",
                    trigger: "7",
                  },
                  {
                    id: "update-email",
                    update: "email",
                    trigger: "7",
                  },
                  {
                    id: "update-password",
                    update: "password",
                    trigger: "7",
                  },

                  {
                    id: "end-message",

                    message:
                      "Thanks! Your data was submitted successfully! please verify your email :)",
                    end: true,
                  },
                ]
              : [
                  {
                    id: "Hello-Message",
                    message: "Welcome back Mr/Ms  " + isAuth().name,
                    trigger: "Ask-About-Profile",
                  },
                  {
                    id: "Ask-About-Profile",
                    message:
                      "Welcome to CLOSER , I'm Stephane and i will help you to upgrade your profile to have a great experience with us , so did you mind if i ask you some question ?",
                    trigger: "Ask-questions",
                  },
                  {
                    id: "Ask-questions",
                    options: [
                      { value: "yes", label: "Yes", trigger: "Ask-yes" },
                      { value: "no", label: "No", trigger: "Ask-no" },
                    ],
                  },
                  {
                    id: "Ask-yes",
                    message: "thank you ;)",
                    trigger: "PhoneNumber",
                  },
                  {
                    id: "Ask-no",
                    message: "ok :)",
                  },
                  {
                    id: "PhoneNumber",
                    message: "what's your phone number ?",
                    trigger: "AnswerPhoneNumber",
                  },
                  {
                    id: "AnswerPhoneNumber",
                    user: true,
                    trigger: "Address",
                    validator: (value) => {
                      if (!/[0-9]/.test(value)) {
                        return "Phone number must contain  numbers  ! ";
                      } else if (!(value.toString().length === 8)) {
                        return "Phone number length must be equal to 8 numbers  ! ";
                      }

                      this.updatePhone(value);

                      return true;
                    },
                  },
                  {
                    id: "Address",
                    message: "what's your Address ?",
                    trigger: "AnswerAddress",
                  },
                  {
                    id: "AnswerAddress",
                    user: true,
                    trigger: "Languages",
                    validator: (value) => {
                      if (!value) {
                        return "Address is required !";
                      }
                      this.setState({ addresss: value });

                      return true;
                    },
                  },
                  {
                    id: "Languages",
                    message: "Which languages did you speak ?",
                    trigger: "AnswerLanguages",
                  },
                  {
                    id: "AnswerLanguages",
                    component: (
                      <ComponentLanguages
                        refreshLanguages={this.updateLanguages}
                      />
                    ),
                  },
                  {
                    id: "skillsAsk",
                    message: "your main skills ?",
                    trigger: "AnswerSkills",
                  },
                  {
                    id: "AnswerSkills",
                    component: (
                      <ComponentSkills refreshSkills={this.updateSkills} />
                    ),
                  },
                  {
                    id: "interests-ask",
                    message: "what are you interested In ?",
                    trigger: "Answer-interests",
                  },

                  {
                    id: "Answer-interests",
                    component: (
                      <ComponentInterests
                        refreshInterests={this.updateInterests}
                      />
                    ),
                  },
                  {
                    id: "Summary",
                    message: "Great! Check out your summary",
                    trigger: "review",
                  },
                  {
                    id: "review",
                    trigger: "askPermition",

                    component: (
                      <Chatbot
                        RendredValue={this.state}
                        recognitionEnable={true}
                        recognitionLang="en"
                        speechSynthesis={{ enable: true, lang: "en" }}
                      />
                    ),
                  },
                  {
                    id: "askPermition",
                    message: "Great Work! did you confirm your information ?",
                    trigger: "Confirm",
                  },
                  {
                    id: "Confirm",
                    options: [
                      { value: "yes", label: "Yes", trigger: "ConfirmYes" },
                      { value: "no", label: "No", trigger: "ConfirmNo" },
                    ],
                  },
                  {
                    id: "ConfirmYes",
                    message:
                      "Thanks ! your information has been added succefully check your profile for any update",
                    end: true,
                  },
                  {
                    id: "ConfirmNo",
                    message:
                      "It is Okay then, check your profile for any update",
                  },
                ]
          }
        />
      </ThemeProvider>
    );
  }
}
SimpleForm.propTypes = {
  valeur: PropTypes.object,
};

SimpleForm.defaultProps = {
  valeur: undefined,
};
export default SimpleForm;
