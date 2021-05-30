import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import styled from "styled-components";
import socket from "../../socket";
import VideoCard from "../Video/VideoCard";
import BottomBar from "../BottomBar/BottomBar";
import Chat from "../Chat/Chat";
import ScreenRecord from "../coursesAndSeances/ScreenRecord";
import { Label } from "semantic-ui-react";
import { isAuth } from "../../helpers/auth";
import { ToastContainer, toast } from "react-toastify";

const Room = (props) => {
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const userImage = JSON.parse(sessionStorage.getItem("userImage"));
  console.log(currentUser);
  const FirstLoader= { info :{currentUser:currentUser,userImage:userImage}}
  const [peers, setPeers] = useState([]);
  const [userslist, setuserslist] = useState([{userId:socket.id,info:{userName:currentUser,Image:userImage,video:true,audio:true}}]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  const [videoDevices, setVideoDevices] = useState([]);
  const [displayChat, setDisplayChat] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [showVideoDevices, setShowVideoDevices] = useState(false);
  const peersRef = useRef([]);
  const userVideoRef = useRef();
  const screenTrackRef = useRef();
  const userStream = useRef();
  const roomId = props.match.params.roomId;

  useEffect(() => {
    // Get Video Devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === "videoinput");
      setVideoDevices(filtered);
    });

    // Set Back Button Event
    window.addEventListener("popstate", goToBack);

    // Connect Camera & Mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;
        
        socket.emit("BE-join-room", { roomId, userName: currentUser,Image: userImage });
        socket.on("FE-user-join", (users) => {
          toast.dark("Someone Has joined the meet");
           console.log("users from room : ");
           console.log(users);
           setuserslist(users);
          // all users
          const peers = [];

          users.forEach((us) => {
            if(us.info!==undefined){
            console.log(us.info.userName);
            //let { userName,Image, video, audio } = info;
            let userName = us.info.userName;
            let Image= us.info.Image;
            let video = us.info.video;
            let audio =us.info.audio;
            let userId =us.userId;
            if (userName !== currentUser) {
              const peer = createPeer(userId, socket.id, stream);

              peer.userName = userName;
              peer.Image = Image;
              peer.peerID = userId;

              peersRef.current.push({
                peerID: userId,
                peer,
                userName,
                Image,
              });
              peers.push(peer);

              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio },
                };
              });
            }
          }
          });

          setPeers(peers);
        });
        //
        socket.on("FE-receive-call", ({ signal, from, info }) => {
          //let { userName, video, audio } = info;
          const peerIdx = findPeer(from);
          let userName = info.userName;
          let Image= info.Image;
          let video = info.video;
          let audio =info.audio;
          if (!peerIdx) {
            const peer = addPeer(signal, from, stream);

            peer.userName = userName;
            peer.Image = Image;
            peer.peerID = peerIdx;

            peersRef.current.push({
              peerID: from,
              peer,
              userName: userName,
            });
            setPeers((users) => {
              return [...users, peer];
            });
            setUserVideoAudio((preList) => {
              return {
                ...preList,
                [peer.userName]: { video, audio },
              };
            });
          }
        });

        socket.on("FE-call-accepted", ({ signal, answerId }) => {
          const peerIdx = findPeer(answerId);
          peerIdx.peer.signal(signal);
        });

        socket.on("FE-user-leave", ({ userId, userName,Image }) => {
          const peerIdx = findPeer(userId);
          peerIdx.peer.destroy();
          toast.dark("Someone Has left the meet");
          setPeers((users) => {
            users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
            //setuserslist(users);
            //console.log(users);
            return [...users];
          });
          
          console.log(
            "ici users list AFTER LEAVE : " + JSON.stringify(userslist)
          );
          setuserslist(userslist);
        });
      });

    socket.on("FE-toggle-camera", ({ userId, switchTarget }) => {
      const peerIdx = findPeer(userId);

      setUserVideoAudio((preList) => {
        let video = preList[peerIdx.userName].video;
        let audio = preList[peerIdx.userName].audio;

        if (switchTarget === "video") video = !video;
        else audio = !audio;

        return {
          ...preList,
          [peerIdx.userName]: { video, audio },
        };
      });
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  function createPeer(userId, caller, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-call-user", {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on("disconnect", () => {
      peer.destroy();
    });

    return peer;
  }

  function addPeer(incomingSignal, callerId, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-accept-call", { signal, to: callerId });
    });

    peer.on("disconnect", () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function findPeer(id) {
    return peersRef.current.find((p) => p.peerID === id);
  }
  console.log("peeeeeeeeee");
  console.log(peers);

  function createUserVideo(peer, index, arr) {
    console.log("peeeeeeeer !");
    console.log(peer);
    return (
      <VideoBox
        className={`width-peer${peers.length > 8 ? "" : peers.length}`}
        onClick={expandScreen}
        key={index}
      >
        {writeUserName(peer.userName,peer.Image,index)}
        <FaIcon className="fas fa-expand" />
        <VideoCard key={index} peer={peer} number={arr.length} />
      </VideoBox>
    );
  }

  function writeUserName(userName,Image, index) {
    if (userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].video) {
        return (
          <>
          <Avatar key={index}>
            <img
              src={Image}
              style={{
                margin: "10px",
                width: "12%",
                height: "12%",
                borderRadius: "50%",
              }}
            />
          </Avatar>
          <UserName key={index}>{userName}</UserName>
          </>
        ); 
      }
    }
  }

  // Open Chat
  const clickChat = (e) => {
    e.stopPropagation();
    setDisplayChat(!displayChat);
  };

  // BackButton
  const goToBack = (e) => {
    e.preventDefault();
    socket.emit("BE-leave-room", { roomId, leaver: currentUser });
    sessionStorage.removeItem("user");
    window.location.href = "/stream";
  };

  const toggleCameraAudio = (e) => {
    const target = e.target.getAttribute("data-switch");

    setUserVideoAudio((preList) => {
      let videoSwitch = preList["localUser"].video;
      let audioSwitch = preList["localUser"].audio;

      if (target === "video") {
        const userVideoTrack =
          userVideoRef.current.srcObject.getVideoTracks()[0];
        videoSwitch = !videoSwitch;
        userVideoTrack.enabled = videoSwitch;
      } else {
        const userAudioTrack =
          userVideoRef.current.srcObject.getAudioTracks()[0];
        audioSwitch = !audioSwitch;

        if (userAudioTrack) {
          userAudioTrack.enabled = audioSwitch;
        } else {
          userStream.current.getAudioTracks()[0].enabled = audioSwitch;
        }
      }

      return {
        ...preList,
        localUser: { video: videoSwitch, audio: audioSwitch },
      };
    });

    socket.emit("BE-toggle-camera-audio", { roomId, switchTarget: target });
  };

  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((stream) => {
          const screenTrack = stream.getTracks()[0];

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              peer.streams[0]
                .getTracks()
                .find((track) => track.kind === "video"),
              screenTrack,
              userStream.current
            );
          });

          // Listen click end
          screenTrack.onended = () => {
            peersRef.current.forEach(({ peer }) => {
              peer.replaceTrack(
                screenTrack,
                peer.streams[0]
                  .getTracks()
                  .find((track) => track.kind === "video"),
                userStream.current
              );
            });
            userVideoRef.current.srcObject = userStream.current;
            setScreenShare(false);
          };

          userVideoRef.current.srcObject = stream;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        });
    } else {
      screenTrackRef.current.onended();
    }
  };

  const expandScreen = (e) => {
    const elem = e.target;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const clickBackground = () => {
    if (!showVideoDevices) return;

    setShowVideoDevices(false);
  };

  return (
    <>
    <ToastContainer position="bottom-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover />
    <AppContainer>
      <RoomContainer onClick={clickBackground}>
        <VideoAndBarContainer>
          <VideoContainer>
            {/* Current User Video */}
            <VideoBox
              className={`width-peer${peers.length > 8 ? "" : peers.length}`}
            >
              {userVideoAudio["localUser"].video ? null : (
                <>
                  <Avatar>
                    <img
                      src={userImage}
                      style={{
                        margin: "10px",

                        width: "14%",
                        height: "14%",
                        borderRadius: "50%",
                      }}
                    />
                  </Avatar>
                  <br />
                  <br />
                  <UserName>{currentUser}</UserName>
                </>
              )}
              <FaIcon className="fas fa-expand" />
              <MyVideo
                onClick={expandScreen}
                ref={userVideoRef}
                muted
                autoPlay
                playInline
              ></MyVideo>
            </VideoBox>
            {/* Joined User Vidoe */}
            {peers &&
              peers.map((peer, index, arr) =>
                createUserVideo(peer, index, arr)
              )}
          </VideoContainer>
          <BottomBar
            clickScreenSharing={clickScreenSharing}
            clickChat={clickChat}
            goToBack={goToBack}
            toggleCameraAudio={toggleCameraAudio}
            userVideoAudio={userVideoAudio["localUser"]}
            screenShare={screenShare}
            videoDevices={videoDevices}
            showVideoDevices={showVideoDevices}
            setShowVideoDevices={setShowVideoDevices}
            listuserRoom={userslist}
          />
        </VideoAndBarContainer>
        <Chat display={displayChat} roomId={roomId} listuserRoom={userslist} />
      </RoomContainer>
    </AppContainer>
    </>
  );
};
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: calc(8px + 2vmin);
  background-color: #454552;
  color: white;
  text-align: center;
`;
const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  flex-direction: row;
`;

const VideoContainer = styled.div`
  max-width: 100%;
  height: 92%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  gap: 10px;
`;

const VideoAndBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const MyVideo = styled.video``;

const VideoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > video {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :hover {
    > i {
      display: block;
    }
  }
`;

const UserName = styled.div`
  position: absolute;
  font-size: calc(10px + 3vmin);
  z-index: 1;
  margin-top: 35%;
`;

const FaIcon = styled.i`
  display: none;
  position: absolute;
  right: 15px;
  top: 15px;
`;

const Avatar = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  //font-size: calc(20px + 5vmin);

  z-index: 1;
`;

export default Room;
