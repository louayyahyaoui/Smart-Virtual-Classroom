import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import useMediaRecorder from "@wmik/use-media-recorder";
import { useDispatch } from "react-redux";

import { isAuth } from "../../helpers/auth";
import { AddCourses } from "../../redux/slices/Courses";

import { Button, Dropdown, Header, Icon, Modal } from "semantic-ui-react";

const BottomBar = ({
  clickChat,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices,
  listuserRoom,
}) => {
  console.log(listuserRoom);
  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );

  function Player({ srcBlob, audio }) {
    if (!srcBlob) {
      return null;
    }

    if (audio) {
      return <audio src={URL.createObjectURL(srcBlob)} controls />;
    }

    return (
      <video
        src={URL.createObjectURL(srcBlob)}
        width={520}
        height={480}
        controls
      />
    );
  }

  let {
    status,
    mediaBlob,
    stopRecording,

    startRecording,
  } = useMediaRecorder({
    recordScreen: true,
    blobOptions: { type: "video/mp4" },
    mediaStreamConstraints: { audio: true, video: true },
    mediaRecorderOptions: {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
    },
  });
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
  useEffect(() => {
    if (!mediaBlob) {
      return;
    }

    
    const idSeance = "";
    const today = Date.now();
    const titre =
      "Recorded Session of : " +
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(today);
    const description =
      "this is a recorded session was added as a course automaticly beacause your teacher has recorded the lesson so you can access to this video .";
    const multiple_resources = [];
    multiple_resources.push(mediaBlob);
    const idOwner = isAuth()._id;
    const idClass = CurrentClass._id;
    dispatch(
      AddCourses(
        idSeance,
        titre,
        description,
        multiple_resources,
        idOwner,
        idClass
      )
    ).then((res) => {
      
    });
  }, [mediaBlob]);

  return (
    <Bar>
      <Left>
        <ChatButton onClick={clickChat}>
          <div>
            <FaIcon className="fas fa-comments"></FaIcon>
          </div>
          Chat
        </ChatButton>
      </Left>
      <Center>
        <CameraButton onClick={toggleCameraAudio} data-switch="video">
          <div>
            {userVideoAudio.video ? (
              <FaIcon className="fas fa-video"></FaIcon>
            ) : (
              <FaIcon className="fas fa-video-slash"></FaIcon>
            )}
          </div>
          Camera
        </CameraButton>
        {showVideoDevices && (
          <SwitchList>
            {videoDevices.length > 0 &&
              videoDevices.map((device) => {
                console.log(device);
                return <div>{device.label}</div>;
              })}
            <div>Switch Camera</div>
          </SwitchList>
        )}
        <SwitchMenu onClick={handleToggle}>
          <i className="fas fa-angle-up"></i>
        </SwitchMenu>

        <StopButton onClick={goToBack}>
          <div>
            <FaIcon className={"fas fa-phone-slash"}></FaIcon>
          </div>
          Quit
        </StopButton>
        <CameraButton onClick={toggleCameraAudio} data-switch="audio">
          <div>
            {userVideoAudio.audio ? (
              <FaIcon className="fas fa-microphone"></FaIcon>
            ) : (
              <FaIcon className="fas fa-microphone-slash"></FaIcon>
            )}
          </div>
          Audio
        </CameraButton>
      </Center>

      <Right>
        <Dropdown
          fluid
          pointing
          direction="left"
          className="icon"
          icon="ellipsis vertical"
        >
          <Dropdown.Menu>
            <a
              href="https://closer-classroom.herokuapp.com/WhiteBoard"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhiteBoard>
                <FaIcon className={"fas fa-chalkboard-teacher"}></FaIcon>
                WhiteBoard
              </WhiteBoard>
            </a>
            <ScreenButton onClick={clickScreenSharing}>
              <FaIcon
                className={`fas fa-desktop ${screenShare ? "sharing" : ""}`}
              ></FaIcon>
              Share Screen
            </ScreenButton>
            <StartButton
              onClick={startRecording}
              disabled={status === "recording"}
            >
              <FaIcon className="fas fa-play-circle"></FaIcon>
              Record
            </StartButton>
            {/* Modal of info when record has been stoped */}

            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <StopRecordButton
                  onClick={stopRecording}
                  disabled={status !== "recording"}
                >
                  <FaIcon className="fas fa-stop-circle"></FaIcon>
                  Stop
                </StopRecordButton>
              }
            >
              <Header
                icon="record"
                content="Information about Record Session"
              />
              <Modal.Content>
                <p>
                  After this session got recorded it will be added automatically
                  as a new courses in your class timeline and it will take as a
                  title "Recorded Session of today"
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="remove" /> ok
                </Button>
              </Modal.Actions>
            </Modal>

            {/* Modal of info when record has been stoped */}
          </Dropdown.Menu>
        </Dropdown>
      </Right>
    </Bar>
  );
};

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  background-color: red;
`;
const Left = styled.div`
  display: flex;
  align-items: center;

  margin-left: 10px;
`;
const WhiteBoard = styled.div`
  width: 75px;
  border: none;
  color: black;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: grey;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Right = styled.div``;

const ChatButton = styled.div`
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: grey;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;
const StartButton = styled.div`
  width: 75px;
  border: none;
  color: black;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: grey;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;

const StopRecordButton = styled.div`
  width: 75px;
  border: none;
  color: black;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: grey;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;

const ScreenButton = styled.div`
  width: auto;
  border: none;
  color: black;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: grey;
    cursor: pointer;
    border-radius: 15px;
  }

  .sharing {
    color: black;
  }
`;

const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

const StopButton = styled.div`
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: grey;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;

const CameraButton = styled.div`
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: grey;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: black;
  }

  .fa-video-slash {
    color: black;
  }
`;

const SwitchMenu = styled.div`
  display: flex;
  position: absolute;
  width: 20px;
  top: 7px;
  left: 720px;
  z-index: 1;

  :hover {
    background-color: grey;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  > i {
    width: 90%;
    font-size: calc(10px + 1vmin);
  }
`;

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -115px;
  left: 80px;
  background-color: grey;
  color: white;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;

  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;

    :not(:last-child):hover {
      background-color: grey;
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
`;

export default BottomBar;
