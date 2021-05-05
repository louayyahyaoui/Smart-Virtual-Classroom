import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Feed,
  Form,
  Header,
  Icon,
  Message,
  Modal,
} from "semantic-ui-react";
import { isAuth } from "../../helpers/auth";
import { ChangePassword } from "../../redux/slices/User";

function ModalChangePassword(pops) {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [formClassName, SetFormClassName] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const dispatch = useDispatch();
  const handleChangeCurrent = (e) => {
    setCurrentPass(e.target.value);
  };
  const handleChangeNew = (e) => {
    setnewPass(e.target.value);
  };
  const handleChangeConfirm = (e) => {
    setConfirmPass(e.target.value);
  };

  const ResetPassword = () => {
    if (newPass !== confirmPass) {
      SetFormClassName("warning");
      SetFormErrorMessage("new password and confirm password didnt Match !");
    } else {
      const obj = {
        password: currentPass,
        salt: isAuth().salt,
        idUser: isAuth()._id,
        newPassword: newPass,
      };

      console.log(obj);
      dispatch(ChangePassword(obj))
        .then((response) => {
          console.log(response);
          if (
            response.payload.msg ===
            "Password Successfully Changed! you can login with your new password"
          ) {
            SetFormClassName("success");
            SetFormSuccessMessage(response.payload.msg);
          } else {
            SetFormClassName("warning");
            SetFormErrorMessage(response.payload.msg);
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              SetFormClassName("warning");
              SetFormErrorMessage(err.response.msg);
            }
          } else {
            SetFormClassName("warning");
            SetFormErrorMessage("Something wen wrong " + err);
          }
        });
    }
  };

  return (
    <div>
      <Modal
        trigger={
          <Link>
            <Header as="h6" icon="lock" content="Change Password" />
          </Link>
        }
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header>Reset your password </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={ResetPassword}>
            <Form.Input
              label="CurrentPassword"
              type="password"
              placeholder={"Current Password here ..."}
              name="Titre"
              maxLength="40"
              required
              value={currentPass}
              onChange={handleChangeCurrent}
            />
            <Form.Input
              label="NewPassword"
              type="password"
              placeholder={" New Password here ..."}
              name="Titre"
              maxLength="40"
              required
              value={newPass}
              onChange={handleChangeNew}
            />
            <Form.Input
              label="ConfirmNewPassword"
              type="password"
              placeholder={"Confirm New Password here ..."}
              name="Titre"
              maxLength="40"
              required
              value={confirmPass}
              onChange={handleChangeConfirm}
            />
            <Message
              success
              color="green"
              header="Nice one! 😛 😝"
              content={formSuccessMessage}
            />
            <Message
              warning
              color="yellow"
              header="Woah! 😱 😨"
              content={formErrorMessage}
            />
            <br />
            <Button color="black" floated="right">
              Update
            </Button>
            <br />
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
export default ModalChangePassword;
