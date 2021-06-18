import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import CloserIcon from "../../assests/Closer-ico.ico";
import { isAuth } from "../../helpers/auth";
import axios from "axios";
import { toast } from "react-toastify";
const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#BF1337",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#BF1337",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};
class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, email, password } = steps;

    this.setState({ name, email, password });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <h3>Summary</h3>
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
      namee: "aa",
      emaill: "",
      passwordd: "",
      stepps: [],
    };
  }
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd({ steps, values }) {
    let name = this.state.namee;
    let email = this.state.emaill;
    let password = this.state.passwordd;
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        toast.success("hey");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errors);
      });
  }

  render() {
    let { n, emaill, passwordd } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          floating={true}
          opened={false}
          botAvatar={CloserIcon}
          userAvatar={isAuth() && isAuth().picture}
          recognitionEnable={true}
          recognitionLang="en"
          speechSynthesis={{ enable: true, lang: "en" }}
          handleEnd={this.handleEnd}
          steps={
            isAuth()
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
                    trigger: "5",
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
                        speechSynthesis={{ enable: true, lang: "en" }}
                      />
                    ),
                    asMessage: true,
                    trigger: "update",
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
              : !isAuth()([
                  {
                    id: "end-message",
                    message:
                      "your question to collect data",
                  },
                ])
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
