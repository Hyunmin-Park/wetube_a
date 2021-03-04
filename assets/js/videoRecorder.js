const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");
let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  // event에서 가져와서 data 파일을 가지고 있음
  const { data: videoFile } = event;
  // element 하나를 생성하고 > a:링크 / href는 아래것
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  // link는 파일을 다운로드 하게 될 것 / 파일명 "recored.webm"
  // webm은 open source
  link.download = "recored.webm";
  //document.body에 link를 child로 추가
  document.body.appendChild(link);
  // 조작 클릭
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "Cant recording";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
  //recordBtn.onclick = getVideo;
}

if (recorderContainer) {
  init();
}
