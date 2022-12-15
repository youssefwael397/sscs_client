import styles from "../styles/Stream.module.css";
import StreamVideo from "../components/StreamVideo";
import usePyramidWebCam from "pyramid-webcam";
import io from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import CamStyles from "../styles/RecordVideo.module.css";
import captureVideoFrame from "capture-video-frame";




const Stream = () => {
  const [socket, setSocket] = useState(null);
  const [src, setSrc] = useState(null);
  const [message, setMessage] = useState("message");

  useEffect(() => {
    try {
      const newSocket = io(`http://localhost:5000`);
      console.log(newSocket);
      console.log('connection established: ', newSocket.connected)
      setSocket(newSocket);
      // return () => newSocket.close();
      newSocket.on('rtc', (data) => {
        console.log(data)
        let blob = new Blob([data], { type: 'image/jpeg' })
        const blobUrl = URL.createObjectURL(blob) // blob is the Blob object
        // image.src =  // image is the image element from the DOM
        // const src = `data:image/jpg;base64, ${blob}`
        setSrc(blobUrl)
      })

    } catch (error) {
      console.log(error)
    }
  }, []);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (message) {
  //     // console.log(socket)
  //     console.log(message)
  //     socket.emit('face_recognition', { "message": message })
  //   }
  // };

  return (
    <div className={`${styles.stream} py-5`}>
      <div className="container">
        <div className={` ${styles.cont_video} bg-white rounded-4 p-5 mt-4`}>
          <div className="d-flex justify-content-center mx-auto">
            {
              socket ?
                <div className="text-center mx-auto w-100">
                  <div className="mx-auto d-flex justify-content-center mb-5">
                    <div className={`${CamStyles.videoContainer} ${CamStyles.StreamvideoContainer} position-relative`}>
                      {/* <div>Socket Connected</div> */}

                      <img
                        src={src}
                        width="600"
                        height="455.5"
                      />

                      {/* <video
                        ref={streamRef}
                        className=" border border-1 rounded mt-3 bg-dark"
                        id="preview"
                        width="600"
                        height="455.5"
                        autoPlay
                        muted
                      ></video> */}

                      {/* <p className="lead mx-4 mt-3 mb-2 fw-bold fs-4">Status: {webCamStatus}</p> */}

                      {/* {webCamStatus == "Closed" || webCamStatus == "Stopped" ? (
                        <button
                          className={`btn border-0 ${CamStyles.btn_open_cam}`}
                          type="button"
                          onClick={openCam}
                        >
                          <PlayCircleOutlined
                            style={{ fontSize: "50px", color: "#e0e0e0" }}
                          />
                        </button>
                      ) : null} */}
                    </div>
                  </div>
                </div> :
                <div>Socket Not Connected</div>
            }
          </div>
        </div>
      </div>

      {/* {socket ? (
        <div className="chat-container mt-3">
          <form>
            <input
              value={message}
              placeholder="Type your message"
              onChange={(e) => {
                setMessage(e.target.value)
              }}
            />
            <button type="submit" onClick={sendMessage}>Send</button>
          </form>
        </div>
      ) : (
        <div>Socket Not Connected</div>
      )} */}
    </div>
  );
};

export default Stream;
