import React, {  useEffect, useRef, useState } from "react"

const Random = ({socket}:{socket: any}) => {
    // const [speak,setSpeak] = useState(false)
    const [hand,setHand] = useState(false)
    // const [stream,setStream] = useState<MediaStream | null>(null);
    // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    // const mediaRecorder = useRef<MediaRecorder | null>(null);
    // const chunks = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
      socket?.on("talking", (data: any) => {
        const receivedData = data;
        console.log(receivedData);

      // Assuming the received data is a Float32Array representing audio samples
      // You may need to adjust this based on how the audio data is sent by the sender
      const audioBuffer = new Float32Array(receivedData as ArrayBuffer);

      // Create an AudioBufferSourceNode
      audioContextRef.current = new AudioContext()
      const audioSource = audioContextRef.current.createBufferSource();
      const buffer = audioContextRef.current.createBuffer(1, audioBuffer.length, audioContextRef.current.sampleRate);

      // Copy the received audio data to the AudioBuffer
      buffer.copyToChannel(audioBuffer, 0);

      // Set the AudioBuffer as the audio source for playback
      audioSource.buffer = buffer;

      // Connect the audio source to the destination (e.g., speakers)
      audioSource.connect(audioContextRef.current.destination);

      // Start playback
      audioSource.start();
      })
    },[socket])
    
    const startListening = () => {
      let shouldCapture = true
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
          const audioContext = new AudioContext();
          const mediaStreamSource = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          
          // Connect the media stream source to the analyser node
          mediaStreamSource.connect(analyser);
          
          // Set up the analyser node
          analyser.fftSize = 2048;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          
          // Function to capture audio data and send it to the server
          function sendData() {
              if (!shouldCapture) return; // Check if capturing should stop
              
              // Get current audio data
              analyser.getByteTimeDomainData(dataArray);
              console.log(dataArray.buffer);
              socket.emit("talk",dataArray.buffer);
              // Call sendData() recursively to keep capturing and sending data
              requestAnimationFrame(sendData);
          }
          
          // Start capturing and sending audio data
          sendData();
          
          // Example: Stop capturing audio after 10 seconds
          setTimeout(() => {
              shouldCapture = false;
              console.log('Audio capture stopped');
          }, 2000);
      })
      .catch(function(err) {
          console.error('getUserMedia error: ', err);
      });
      
    }
    // const stopListening = () => {
    //   if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
    //         mediaRecorder.current.stop();
    //         console.log("stop");
            
    //       //   setIsRecording(false);
    //       }
    // }
    const raiseHand = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(hand){
        setHand(false);
        }else {
        setHand(true);
        
        }
   }

    return (
        // onClick={(e)=>viewDetails(e)}
        <>
        <button >Project Details</button>
        <button onClick={(e)=>raiseHand(e)}>{hand ? "hand up" : "hand down"}</button>
        <button type="button" onClick={startListening} >speak</button>
        {/* <button type="button" onClick={stopListening} >mute</button> */}
        </>
    )
}

export default Random
