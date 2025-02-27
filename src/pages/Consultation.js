// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaRobot, FaPause, FaPlay } from 'react-icons/fa';

// const Consultation = () => {
//     const [stream, setStream] = useState(null);
//     const myVideo = useRef(null);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isPaused, setIsPaused] = useState(false);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [isCallActive, setIsCallActive] = useState(false);
//     const [showMenu, setShowMenu] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [pausedFrame, setPausedFrame] = useState(null);
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         return () => stopMediaStream(); // Cleanup on unmount
//     }, []);

//     useEffect(() => {
//         if (stream && myVideo.current) {
//             myVideo.current.srcObject = stream;
//         }
//     }, [stream]);

//     const requestMediaPermissions = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const mediaStream = await navigator.mediaDevices.getUserMedia({
//                 video: {
//                     facingMode: 'user',
//                     width: { ideal: 1920 },
//                     height: { ideal: 1080 },
//                     frameRate: { ideal: 60, max: 60 }
//                 },
//                 audio: {
//                     echoCancellation: true,
//                     noiseSuppression: true,
//                     autoGainControl: true
//                 }
//             });
//             setStream(mediaStream);
//             setIsCallActive(true);
//             setShowMenu(false);
//         } catch (err) {
//             console.error('Permission denied:', err);
//             setError('Please allow camera and microphone access to use this feature.');
//         }
//         setLoading(false);
//     };

//     const stopMediaStream = () => {
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//         }
//         setStream(null);
//         setIsCallActive(false);
//         setShowMenu(true);
//     };

//     const toggleMute = () => {
//         if (stream) {
//             stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
//             setIsMuted(prev => !prev);
//         }
//     };

//     const captureLastFrame = () => {
//         if (!myVideo.current || !canvasRef.current) return;
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         canvas.width = myVideo.current.videoWidth;
//         canvas.height = myVideo.current.videoHeight;

//         // Flip horizontally (mirror effect)
//         ctx.translate(canvas.width, 0);
//         ctx.scale(-1, 1);
//         ctx.drawImage(myVideo.current, 0, 0, canvas.width, canvas.height);

//         setPausedFrame(canvas.toDataURL('image/png'));
//     };

//     const togglePause = () => {
//         if (stream) {
//             if (isPaused) {
//                 setPausedFrame(null);
//                 stream.getVideoTracks().forEach(track => (track.enabled = isCameraOn));
//             } else {
//                 captureLastFrame();
//                 stream.getVideoTracks().forEach(track => (track.enabled = false));
//             }
//             setIsPaused(prev => !prev);
//         }
//     };

//     const toggleCamera = () => {
//         if (stream) {
//             setIsCameraOn(prev => !prev);
//             stream.getVideoTracks().forEach(track => (track.enabled = !isCameraOn));
//         }
//     };

//     return (
//         <Box sx={{ width: '95.7vw', height: '91vh', display: 'flex', flexDirection: 'column', backgroundColor: 'black', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
//             {showMenu ? (
//                 <Box sx={{ textAlign: 'center', color: 'white' }}>
//                     <Typography variant="h4" gutterBottom>Welcome to AI Consultation</Typography>
//                     <Typography variant="body1" sx={{ marginBottom: 3 }}>Start a video call with our AI assistant.</Typography>

//                     {error && <Typography color="error">{error}</Typography>}

//                     {loading ? (
//                         <CircularProgress color="secondary" />
//                     ) : (
//                         <Button variant="contained" color="secondary" onClick={requestMediaPermissions} startIcon={<FaRobot />}>
//                             Start AI Consultation
//                         </Button>
//                     )}
//                 </Box>
//             ) : isCallActive ? (
//                 <>
//                     <video 
//                         ref={myVideo} 
//                         autoPlay 
//                         playsInline 
//                         muted={!isPaused} 
//                         style={{ 
//                             display: pausedFrame ? 'none' : 'block', 
//                             width: '100%', 
//                             height: '100%', 
//                             objectFit: 'cover', 
//                             transform: 'scaleX(-1)' 
//                         }} 
//                     />

//                     {pausedFrame && (
//                         <img 
//                             src={pausedFrame} 
//                             alt="Paused Frame" 
//                             style={{ 
//                                 width: '100%', 
//                                 height: '100%', 
//                                 objectFit: 'cover', 
//                                 position: 'absolute', 
//                                 top: 0, 
//                                 left: 0 
//                             }} 
//                         />
//                     )}

//                     <canvas ref={canvasRef} style={{ display: 'none' }} />

//                     <Box sx={{ position: 'absolute', bottom: '10%', display: 'flex', gap: '20px', justifyContent: 'center', width: '100%' }}>
//                         <IconButton onClick={toggleMute} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isMuted ? 2 : '50%' }}>
//                             {isMuted ? <FaMicrophoneSlash color="red" /> : <FaMicrophone color="black" />}
//                         </IconButton>

//                         <IconButton onClick={toggleCamera} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isCameraOn ? '50%' : 2 }}>
//                             {isCameraOn ? <FaVideo color="black" /> : <FaVideoSlash color="red" />}
//                         </IconButton>

//                         <IconButton onClick={togglePause} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isPaused ? 2 : '50%' }}>
//                             {isPaused ? <FaPlay color="black" /> : <FaPause color="black" />}
//                         </IconButton>

//                         <IconButton onClick={stopMediaStream} sx={{ bgcolor: 'red', color: 'white', padding: 2, borderRadius: '50%', border: '3px solid red' }}>
//                             <FaPhone />
//                         </IconButton>
//                     </Box>
//                 </>
//             ) : (
//                 <Typography variant="h5" sx={{ color: 'white' }}>📞 Call Ended</Typography>
//             )}
//         </Box>
//     );
// };

// export default Consultation;



// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaRobot } from 'react-icons/fa';

// const Consultation = () => {
//     const [stream, setStream] = useState(null);
//     const myVideo = useRef(null);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [isCallActive, setIsCallActive] = useState(false);
//     const [showMenu, setShowMenu] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [speechText, setSpeechText] = useState('');
//     const [isListening, setIsListening] = useState(false); // Track listening state
//     let recognition;

//     useEffect(() => {
//         if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//             recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//             recognition.continuous = true;
//             recognition.interimResults = true;
//             recognition.lang = 'en-US';

//             recognition.onstart = () => {
//                 setIsListening(true);
//             };

//             recognition.onresult = (event) => {
//                 let transcript = '';
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     transcript += event.results[i][0].transcript;
//                 }
//                 setSpeechText(transcript);
//             };

//             recognition.onend = () => {
//                 setIsListening(false);
//                 setSpeechText(''); // Clear transcription when speech stops
//             };

//             recognition.onerror = (event) => {
//                 console.error('Speech recognition error:', event.error);
//             };
//         } else {
//             setError('Speech recognition is not supported in this browser.');
//         }
//         return () => stopMediaStream(); // Cleanup on unmount
//     }, []);

//     useEffect(() => {
//         if (stream && myVideo.current) {
//             myVideo.current.srcObject = stream;
//         }
//     }, [stream]);

//     const startSpeechRecognition = () => {
//         if (recognition) {
//             recognition.start();
//         }
//     };

//     const stopSpeechRecognition = () => {
//         if (recognition) {
//             recognition.stop();
//         }
//     };

//     const requestMediaPermissions = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const mediaStream = await navigator.mediaDevices.getUserMedia({
//                 video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 60, max: 60 } },
//                 audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
//             });
//             setStream(mediaStream);
//             setIsCallActive(true);
//             setShowMenu(false);
//             startSpeechRecognition();
//         } catch (err) {
//             console.error('Permission denied:', err);
//             setError('Please allow camera and microphone access to use this feature.');
//         }
//         setLoading(false);
//     };

//     const stopMediaStream = () => {
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//         }
//         setStream(null);
//         setIsCallActive(false);
//         setShowMenu(true);
//         stopSpeechRecognition();
//     };

//     return (
//         <Box sx={{ width: '95.7vw', height: '91vh', display: 'flex', flexDirection: 'column', backgroundColor: 'black', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
//             {showMenu ? (
//                 <Box sx={{ textAlign: 'center', color: 'white' }}>
//                     <Typography variant="h4" gutterBottom>Welcome to AI Consultation</Typography>
//                     <Typography variant="body1" sx={{ marginBottom: 3 }}>Start a video call with our AI assistant.</Typography>
//                     {error && <Typography color="error">{error}</Typography>}
//                     {loading ? <CircularProgress color="secondary" /> : (
//                         <Button variant="contained" color="secondary" onClick={requestMediaPermissions} startIcon={<FaRobot />}>
//                             Start AI Consultation
//                         </Button>
//                     )}
//                 </Box>
//             ) : isCallActive ? (
//                 <>
//                     <video 
//                         ref={myVideo} 
//                         autoPlay 
//                         playsInline 
//                         muted={!isListening} 
//                         style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
//                     />

//                     {/* Speech-to-Text Display */}
//                     {isListening && (
//                         <Box sx={{ position: 'absolute', top: '5%', width: '80%', padding: 2, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
//                             <Typography variant="h6">{speechText || 'Listening...'}</Typography>
//                         </Box>
//                     )}

//                     <Box sx={{ position: 'absolute', bottom: '10%', display: 'flex', gap: '20px', justifyContent: 'center', width: '100%' }}>
//                         <IconButton onClick={() => setIsMuted(prev => !prev)} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isMuted ? 2 : '50%' }}>
//                             {isMuted ? <FaMicrophoneSlash color="red" /> : <FaMicrophone color="black" />}
//                         </IconButton>

//                         <IconButton onClick={() => setIsCameraOn(prev => !prev)} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isCameraOn ? '50%' : 2 }}>
//                             {isCameraOn ? <FaVideo color="black" /> : <FaVideoSlash color="red" />}
//                         </IconButton>

//                         <IconButton onClick={stopMediaStream} sx={{ bgcolor: 'red', color: 'white', padding: 2, borderRadius: '50%', border: '3px solid red' }}>
//                             <FaPhone />
//                         </IconButton>
//                     </Box>
//                 </>
//             ) : (
//                 <Typography variant="h5" sx={{ color: 'white' }}>📞 Call Ended</Typography>
//             )}
//         </Box>
//     );
// };

// export default Consultation;

// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaRobot, FaPause, FaPlay } from 'react-icons/fa';

// const Consultation = () => {
//     const [stream, setStream] = useState(null);
//     const myVideo = useRef(null);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [isCallActive, setIsCallActive] = useState(false);
//     const [showMenu, setShowMenu] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [speechText, setSpeechText] = useState('');
//     const [isListening, setIsListening] = useState(false);
//     const [isPaused, setIsPaused] = useState(false); // Track pause state
//     let recognition;

//     useEffect(() => {
//         if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//             recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//             recognition.continuous = true;
//             recognition.interimResults = true;
//             recognition.lang = 'en-US';

//             recognition.onstart = () => setIsListening(true);
//             recognition.onresult = (event) => {
//                 let transcript = '';
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     transcript += event.results[i][0].transcript;
//                 }
//                 setSpeechText(transcript);
//             };
//             recognition.onend = () => setIsListening(false);
//             recognition.onerror = (event) => console.error('Speech recognition error:', event.error);
//         } else {
//             setError('Speech recognition is not supported in this browser.');
//         }
//         return () => stopMediaStream();
//     }, []);

//     useEffect(() => {
//         if (stream && myVideo.current) {
//             myVideo.current.srcObject = stream;
//         }
//     }, [stream]);

//     const startSpeechRecognition = () => recognition?.start();
//     const stopSpeechRecognition = () => recognition?.stop();

//     const togglePauseResume = () => {
//         if (isPaused) {
//             stream.getTracks().forEach(track => track.enabled = true);
//             startSpeechRecognition();
//         } else {
//             stream.getTracks().forEach(track => track.enabled = false);
//             stopSpeechRecognition();
//         }
//         setIsPaused(!isPaused);
//     };

//     const requestMediaPermissions = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const mediaStream = await navigator.mediaDevices.getUserMedia({
//                 video: true,
//                 audio: true
//             });
//             setStream(mediaStream);
//             setIsCallActive(true);
//             setShowMenu(false);
//             startSpeechRecognition();
//         } catch (err) {
//             setError('Please allow camera and microphone access.');
//         }
//         setLoading(false);
//     };

//     const stopMediaStream = () => {
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//         }
//         setStream(null);
//         setIsCallActive(false);
//         setShowMenu(true);
//         stopSpeechRecognition();
//     };

//     return (
//         <Box sx={{ width: '95.7vw', height: '91vh', display: 'flex', flexDirection: 'column', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
//             {showMenu ? (
//                 <Box sx={{ textAlign: 'center', color: 'white' }}>
//                     <Typography variant="h4">Welcome to AI Consultation</Typography>
//                     <Typography variant="body1">Start a video call with our AI assistant.</Typography>
//                     {error && <Typography color="error">{error}</Typography>}
//                     {loading ? <CircularProgress color="secondary" /> : (
//                         <Button variant="contained" color="secondary" onClick={requestMediaPermissions} startIcon={<FaRobot />}>Start AI Consultation</Button>
//                     )}
//                 </Box>
//             ) : isCallActive ? (
//                 <>
//                     <video ref={myVideo} autoPlay playsInline muted={!isListening} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
//                     {isListening && (
//                         <Box sx={{ position: 'absolute', top: '5%', width: '80%', padding: 2, backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
//                             <Typography variant="h6">{speechText || 'Listening...'}</Typography>
//                         </Box>
//                     )}
//                     <Box sx={{ position: 'absolute', bottom: '10%', display: 'flex', gap: '20px', justifyContent: 'center', width: '100%' }}>
//                         <IconButton onClick={() => setIsMuted(prev => !prev)} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isMuted ? 2 : '50%' }}>
//                             {isMuted ? <FaMicrophoneSlash color="red" /> : <FaMicrophone color="black" />}
//                         </IconButton>
//                         <IconButton onClick={() => setIsCameraOn(prev => !prev)} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isCameraOn ? '50%' : 2 }}>
//                             {isCameraOn ? <FaVideo color="black" /> : <FaVideoSlash color="red" />}
//                         </IconButton>
//                         <IconButton onClick={togglePauseResume} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: '50%' }}>
//                             {isPaused ? <FaPlay color="black" /> : <FaPause color="black" />}
//                         </IconButton>
//                         <IconButton onClick={stopMediaStream} sx={{ bgcolor: 'red', color: 'white', padding: 2, borderRadius: '50%', border: '3px solid red' }}>
//                             <FaPhone />
//                         </IconButton>
//                     </Box>
//                 </>
//             ) : (
//                 <Typography variant="h5" sx={{ color: 'white' }}>📞 Call Ended</Typography>
//             )}
//         </Box>
//     );
// };

// export default Consultation;


// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaRobot, FaPause, FaPlay } from 'react-icons/fa';

// const Consultation = () => {
//     const [stream, setStream] = useState(null);
//     const myVideo = useRef(null);
//     const canvasRef = useRef(null);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [isCallActive, setIsCallActive] = useState(false);
//     const [showMenu, setShowMenu] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [pausedFrame, setPausedFrame] = useState(null);
//     const [isPaused, setIsPaused] = useState(false);
//     const [isListening, setIsListening] = useState(false);
//     const [speechText, setSpeechText] = useState('');
//     let recognition = null;

//     useEffect(() => {
//         return () => stopMediaStream();
//     }, []);

//     useEffect(() => {
//         if (stream && myVideo.current) {
//             myVideo.current.srcObject = stream;
//         }
//     }, [stream]);

//     const requestMediaPermissions = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const mediaStream = await navigator.mediaDevices.getUserMedia({
//                 video: {
//                     facingMode: 'user',
//                     width: { ideal: 1920 },
//                     height: { ideal: 1080 },
//                     frameRate: { ideal: 60, max: 60 }
//                 },
//                 audio: {
//                     echoCancellation: true,
//                     noiseSuppression: true,
//                     autoGainControl: true
//                 }
//             });
//             setStream(mediaStream);
//             setIsCallActive(true);
//             setShowMenu(false);
//             startSpeechRecognition();
//         } catch (err) {
//             setError('Please allow camera and microphone access to use this feature.');
//         }
//         setLoading(false);
//     };

//     const stopMediaStream = () => {
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//         }
//         setStream(null);
//         setIsCallActive(false);
//         setShowMenu(true);
//         stopSpeechRecognition();
//     };

//     const toggleMute = () => {
//         if (stream) {
//             stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
//             setIsMuted(prev => !prev);
//         }
//     };

//     const captureLastFrame = () => {
//         if (!myVideo.current || !canvasRef.current) return;
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         canvas.width = myVideo.current.videoWidth;
//         canvas.height = myVideo.current.videoHeight;
//         ctx.translate(canvas.width, 0);
//         ctx.scale(-1, 1);
//         ctx.drawImage(myVideo.current, 0, 0, canvas.width, canvas.height);
//         setPausedFrame(canvas.toDataURL('image/png'));
//     };

//     const togglePause = () => {
//         if (isPaused) {
//             setPausedFrame(null);
//             stream.getVideoTracks().forEach(track => (track.enabled = isCameraOn));
//             startSpeechRecognition();
//         } else {
//             captureLastFrame();
//             stream.getVideoTracks().forEach(track => (track.enabled = false));
//             stopSpeechRecognition();
//         }
//         setIsPaused(prev => !prev);
//     };

//     const toggleCamera = () => {
//         if (stream) {
//             setIsCameraOn(prev => !prev);
//             stream.getVideoTracks().forEach(track => (track.enabled = !isCameraOn));
//         }
//     };

//     const startSpeechRecognition = () => {
//         if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//             recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//             recognition.continuous = true;
//             recognition.interimResults = true;
//             recognition.lang = 'en-US';

//             recognition.onstart = () => setIsListening(true);
//             recognition.onresult = event => {
//                 const transcript = Array.from(event.results)
//                     .map(result => result[0].transcript)
//                     .join('');
//                 setSpeechText(transcript);
//             };
//             recognition.onend = () => setIsListening(false);

//             recognition.start();
//         }
//     };

//     const stopSpeechRecognition = () => {
//         if (recognition) {
//             recognition.stop();
//             setIsListening(false);
//         }
//     };

//     return (
//         <Box sx={{ width: '95.7vw', height: '91vh', display: 'flex', flexDirection: 'column', backgroundColor: 'black', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
//             {showMenu ? (
//                 <Box sx={{ textAlign: 'center', color: 'white' }}>
//                     <Typography variant="h4" gutterBottom>Welcome to AI Consultation</Typography>
//                     <Typography variant="body1" sx={{ marginBottom: 3 }}>Start a video call with our AI assistant.</Typography>
//                     {error && <Typography color="error">{error}</Typography>}
//                     {loading ? <CircularProgress color="secondary" /> : (
//                         <Button variant="contained" color="secondary" onClick={requestMediaPermissions} startIcon={<FaRobot />}>
//                             Start AI Consultation
//                         </Button>
//                     )}
//                 </Box>
//             ) : isCallActive ? (
//                 <>
//                     <video
//                         ref={myVideo}
//                         autoPlay
//                         playsInline
//                         muted={!isPaused}
//                         style={{
//                             display: pausedFrame ? 'none' : 'block',
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                             transform: 'scaleX(-1)'
//                         }}
//                     />
//                     {pausedFrame && (
//                         <img
//                             src={pausedFrame}
//                             alt="Paused Frame"
//                             style={{
//                                 width: '100%',
//                                 height: '100%',
//                                 objectFit: 'cover',
//                                 position: 'absolute',
//                                 top: 0,
//                                 left: 0
//                             }}
//                         />
//                     )}
//                     <canvas ref={canvasRef} style={{ display: 'none' }} />
//                     <Typography sx={{ color: 'white', position: 'absolute', bottom: '20%', textAlign: 'center', width: '100%' }}>
//                         {isListening ? "Listening..." : speechText}
//                     </Typography>
//                     <Box sx={{ position: 'absolute', bottom: '10%', display: 'flex', gap: '20px', justifyContent: 'center', width: '100%' }}>
//                         <IconButton onClick={toggleMute} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isMuted ? 2 : '50%' }}>
//                             {isMuted ? <FaMicrophoneSlash color="red" /> : <FaMicrophone color="black" />}
//                         </IconButton>
//                         <IconButton onClick={toggleCamera} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isCameraOn ? '50%' : 2 }}>
//                             {isCameraOn ? <FaVideo color="black" /> : <FaVideoSlash color="red" />}
//                         </IconButton>
//                         <IconButton onClick={togglePause} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isPaused ? 2 : '50%' }}>
//                             {isPaused ? <FaPlay color="black" /> : <FaPause color="black" />}
//                         </IconButton>
//                         <IconButton onClick={stopMediaStream} sx={{ bgcolor: 'red', color: 'white', padding: 2, borderRadius: '50%', border: '3px solid red' }}>
//                             <FaPhone />
//                         </IconButton>
//                     </Box>
//                 </>
//             ) : (
//                 <Typography variant="h5" sx={{ color: 'white' }}>📞 Call Ended</Typography>
//             )}
//         </Box>
//     );
// };

// export default Consultation;


// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaRobot, FaPause, FaPlay } from 'react-icons/fa';

// const Consultation = () => {
//     const [stream, setStream] = useState(null);
//     const myVideo = useRef(null);
//     const canvasRef = useRef(null);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [isCallActive, setIsCallActive] = useState(false);
//     const [showMenu, setShowMenu] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [pausedFrame, setPausedFrame] = useState(null);
//     const [isPaused, setIsPaused] = useState(false);
//     const [isListening, setIsListening] = useState(false);
//     const [speechText, setSpeechText] = useState('');
//     let recognition = null;

//     useEffect(() => {
//         return () => stopMediaStream();
//     }, []);

//     useEffect(() => {
//         if (stream && myVideo.current) {
//             myVideo.current.srcObject = stream;
//         }
//     }, [stream]);

//     const requestMediaPermissions = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const mediaStream = await navigator.mediaDevices.getUserMedia({
//                 video: {
//                     facingMode: 'user',
//                     width: { ideal: 1920 },
//                     height: { ideal: 1080 },
//                     frameRate: { ideal: 60, max: 60 }
//                 },
//                 audio: {
//                     echoCancellation: true,
//                     noiseSuppression: true,
//                     autoGainControl: true
//                 }
//             });
//             setStream(mediaStream);
//             setIsCallActive(true);
//             setShowMenu(false);
//             startSpeechRecognition();
//         } catch (err) {
//             setError('Please allow camera and microphone access to use this feature.');
//         }
//         setLoading(false);
//     };

//     const stopMediaStream = () => {
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//         }
//         setStream(null);
//         setIsCallActive(false);
//         setShowMenu(true);
//         setIsMuted(false);
//         setIsCameraOn(true);
//         setIsPaused(false);
//         setPausedFrame(null);
//         setSpeechText('');
//         stopSpeechRecognition();
//     };

//     const toggleMute = () => {
//         if (stream) {
//             stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
//             setIsMuted(prev => !prev);
//         }
//     };

//     const captureLastFrame = () => {
//         if (!myVideo.current || !canvasRef.current) return;
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         canvas.width = myVideo.current.videoWidth;
//         canvas.height = myVideo.current.videoHeight;
//         ctx.translate(canvas.width, 0);
//         ctx.scale(-1, 1);
//         ctx.drawImage(myVideo.current, 0, 0, canvas.width, canvas.height);
//         setPausedFrame(canvas.toDataURL('image/png'));
//     };

//     const togglePause = () => {
//         if (isPaused) {
//             setPausedFrame(null);
//             stream.getVideoTracks().forEach(track => (track.enabled = isCameraOn));
//             startSpeechRecognition();
//         } else {
//             captureLastFrame();
//             stream.getVideoTracks().forEach(track => (track.enabled = false));
//             stopSpeechRecognition();
//         }
//         setIsPaused(prev => !prev);
//     };

//     const toggleCamera = () => {
//         if (stream) {
//             setIsCameraOn(prev => !prev);
//             stream.getVideoTracks().forEach(track => (track.enabled = !isCameraOn));
//         }
//     };

//     const startSpeechRecognition = () => {
//         if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//             recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//             recognition.continuous = true;
//             recognition.interimResults = true;
//             recognition.lang = 'en-US';

//             recognition.onstart = () => setIsListening(true);
//             recognition.onresult = event => {
//                 const transcript = Array.from(event.results)
//                     .map(result => result[0].transcript)
//                     .join('');
//                 setSpeechText(transcript);
//             };
//             recognition.onend = () => setIsListening(false);

//             recognition.start();
//         }
//     };

//     const stopSpeechRecognition = () => {
//         if (recognition) {
//             recognition.stop();
//             setIsListening(false);
//         }
//     };

//     return (
//         <Box sx={{ width: '95.7vw', height: '91vh', display: 'flex', flexDirection: 'column', backgroundColor: 'black', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
//             {showMenu ? (
//                 <Box sx={{ textAlign: 'center', color: 'white' }}>
//                     <Typography variant="h4" gutterBottom>Welcome to AI Consultation</Typography>
//                     <Typography variant="body1" sx={{ marginBottom: 3 }}>Start a video call with our AI assistant.</Typography>
//                     {error && <Typography color="error">{error}</Typography>}
//                     {loading ? <CircularProgress color="secondary" /> : (
//                         <Button variant="contained" color="secondary" onClick={requestMediaPermissions} startIcon={<FaRobot />}>
//                             Start AI Consultation
//                         </Button>
//                     )}
//                 </Box>
//             ) : isCallActive ? (
//                 <>
//                     <video
//                         ref={myVideo}
//                         autoPlay
//                         playsInline
//                         muted={!isPaused}
//                         style={{
//                             display: pausedFrame ? 'none' : 'block',
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                             transform: 'scaleX(-1)'
//                         }}
//                     />
//                     {pausedFrame && (
//                         <img
//                             src={pausedFrame}
//                             alt="Paused Frame"
//                             style={{
//                                 width: '100%',
//                                 height: '100%',
//                                 objectFit: 'cover',
//                                 position: 'absolute',
//                                 top: 0,
//                                 left: 0
//                             }}
//                         />
//                     )}
//                     <canvas ref={canvasRef} style={{ display: 'none' }} />
//                     <Typography 
//                         sx={{
//                             color: 'white', 
//                             position: 'absolute', 
//                             bottom: '20%', 
//                             right: '10px', // Align text to the right
//                             textAlign: 'right', 
//                             maxWidth: '30%', // Adjust width to prevent overflow
//                             backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional for better visibility
//                             padding: '10px', 
//                             borderRadius: '5px'
//                         }}
//                     >
//                         {isListening ? "Listening..." : speechText}
//                     </Typography>

//                     <Box sx={{ position: 'absolute', bottom: '10%', display: 'flex', gap: '20px', justifyContent: 'center', width: '100%' }}>
//                         <IconButton onClick={toggleMute} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isMuted ? 2 : '50%' }}>
//                             {isMuted ? <FaMicrophoneSlash color="red" /> : <FaMicrophone color="black" />}
//                         </IconButton>
//                         <IconButton onClick={toggleCamera} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isCameraOn ? '50%' : 2 }}>
//                             {isCameraOn ? <FaVideo color="black" /> : <FaVideoSlash color="red" />}
//                         </IconButton>
//                         <IconButton onClick={togglePause} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isPaused ? 2 : '50%' }}>
//                             {isPaused ? <FaPlay color="black" /> : <FaPause color="black" />}
//                         </IconButton>
//                         <IconButton onClick={stopMediaStream} sx={{ bgcolor: 'red', color: 'white', padding: 2, borderRadius: '50%', border: '3px solid red' }}>
//                             <FaPhone />
//                         </IconButton>
//                     </Box>
//                 </>
//             ) : (
//                 <Typography variant="h5" sx={{ color: 'white' }}>📞 Call Ended</Typography>
//             )}
//         </Box>
//     );
// };

// export default Consultation;




// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaRobot, FaPause, FaPlay } from 'react-icons/fa';

// const Consultation = () => {
//     const [stream, setStream] = useState(null);
//     const myVideo = useRef(null);
//     const canvasRef = useRef(null);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [isCallActive, setIsCallActive] = useState(false);
//     const [showMenu, setShowMenu] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [pausedFrame, setPausedFrame] = useState(null);
//     const [isPaused, setIsPaused] = useState(false);
//     const [isListening, setIsListening] = useState(false);
//     const [speechText, setSpeechText] = useState('');
//     let recognition = null;

//     useEffect(() => {
//         return () => stopMediaStream();
//     }, []);

//     useEffect(() => {
//         if (stream && myVideo.current) {
//             myVideo.current.srcObject = stream;
//         }
//     }, [stream]);

//     const requestMediaPermissions = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const mediaStream = await navigator.mediaDevices.getUserMedia({
//                 video: {
//                     facingMode: 'user',
//                     width: { ideal: 1920 },
//                     height: { ideal: 1080 },
//                     frameRate: { ideal: 60, max: 60 }
//                 },
//                 audio: {
//                     echoCancellation: true,
//                     noiseSuppression: true,
//                     autoGainControl: true
//                 }
//             });
//             setStream(mediaStream);
//             setIsCallActive(true);
//             setShowMenu(false);
//             startSpeechRecognition();
//         } catch (err) {
//             setError('Please allow camera and microphone access to use this feature.');
//         }
//         setLoading(false);
//     };

//     const stopMediaStream = () => {
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//         }
//         setStream(null);
//         setIsCallActive(false);
//         setShowMenu(true);
//         setIsMuted(false);
//         setIsCameraOn(true);
//         setIsPaused(false);
//         setPausedFrame(null);
//         setSpeechText('');
//         stopSpeechRecognition();
//     };

//     const toggleMute = () => {
//         if (stream) {
//             stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
//             setIsMuted(prev => !prev);
//         }
//     };

//     const captureLastFrame = () => {
//         if (!myVideo.current || !canvasRef.current) return;
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         canvas.width = myVideo.current.videoWidth;
//         canvas.height = myVideo.current.videoHeight;
//         ctx.translate(canvas.width, 0);
//         ctx.scale(-1, 1);
//         ctx.drawImage(myVideo.current, 0, 0, canvas.width, canvas.height);
//         setPausedFrame(canvas.toDataURL('image/png'));
//     };

//     const togglePause = () => {
//         if (isPaused) {
//             setPausedFrame(null);
//             stream.getVideoTracks().forEach(track => (track.enabled = isCameraOn));
//             startSpeechRecognition();
//         } else {
//             captureLastFrame();
//             stream.getVideoTracks().forEach(track => (track.enabled = false));
//             stopSpeechRecognition();
//         }
//         setIsPaused(prev => !prev);
//     };

//     const toggleCamera = () => {
//         if (stream) {
//             setIsCameraOn(prev => !prev);
//             stream.getVideoTracks().forEach(track => (track.enabled = !isCameraOn));
//         }
//     };

//     const startSpeechRecognition = () => {
//         if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//             recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//             recognition.continuous = true;
//             recognition.interimResults = true;
//             recognition.lang = 'en-US';

//             recognition.onstart = () => setIsListening(true);
//             recognition.onresult = event => {
//                 const transcript = Array.from(event.results)
//                     .map(result => result[0].transcript)
//                     .join('');
//                 setSpeechText(transcript);
//             };
//             recognition.onend = () => setIsListening(false);

//             recognition.start();
//         }
//     };

//     const stopSpeechRecognition = () => {
//         if (recognition) {
//             recognition.stop();
//             setIsListening(false);
//         }
//     };

//     return (
//         <Box sx={{ width: '95.7vw', height: '91vh', display: 'flex', flexDirection: 'column', backgroundColor: 'black', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
//             {showMenu ? (
//                 <Box sx={{ textAlign: 'center', color: 'white' }}>
//                     <Typography variant="h4" gutterBottom>Welcome to AI Consultation</Typography>
//                     <Typography variant="body1" sx={{ marginBottom: 3 }}>Start a video call with our AI assistant.</Typography>
//                     {error && <Typography color="error">{error}</Typography>}
//                     {loading ? <CircularProgress color="secondary" /> : (
//                         <Button variant="contained" color="secondary" onClick={requestMediaPermissions} startIcon={<FaRobot />}>
//                             Start AI Consultation
//                         </Button>
//                     )}
//                 </Box>
//             ) : isCallActive ? (
//                 <>
//                     <video
//                         ref={myVideo}
//                         autoPlay
//                         playsInline
//                         muted={!isPaused}
//                         style={{
//                             display: pausedFrame ? 'none' : 'block',
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                             transform: 'scaleX(-1)'
//                         }}
//                     />
//                     {pausedFrame && (
//                         <img
//                             src={pausedFrame}
//                             alt="Paused Frame"
//                             style={{
//                                 width: '100%',
//                                 height: '100%',
//                                 objectFit: 'cover',
//                                 position: 'absolute',
//                                 top: 0,
//                                 left: 0
//                             }}
//                         />
//                     )}
//                     <canvas ref={canvasRef} style={{ display: 'none' }} />
//                     <Typography 
//                         sx={{
//                             color: 'white', 
//                             position: 'absolute', 
//                             bottom: '20%', 
//                             right: '10px',
//                             textAlign: 'right', 
//                             maxWidth: '30%',
//                             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                             padding: '10px', 
//                             borderRadius: '5px'
//                         }}
//                     >
//                         {isListening ? "Listening..." : speechText}
//                     </Typography>

//                     <Box sx={{ position: 'absolute', bottom: '10%', display: 'flex', gap: '20px', justifyContent: 'center', width: '100%' }}>
//                         <IconButton onClick={toggleMute} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isMuted ? 2 : '50%' }}>
//                             {isMuted ? <FaMicrophoneSlash color="red" /> : <FaMicrophone color="black" />}
//                         </IconButton>
//                         <IconButton onClick={toggleCamera} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isCameraOn ? '50%' : 2 }}>
//                             {isCameraOn ? <FaVideo color="black" /> : <FaVideoSlash color="red" />}
//                         </IconButton>
//                         <IconButton onClick={togglePause} sx={{ bgcolor: 'white', border: '3px solid white', padding: 2, borderRadius: isPaused ? 2 : '50%' }}>
//                             {isPaused ? <FaPlay color="black" /> : <FaPause color="black" />}
//                         </IconButton>
//                         <IconButton onClick={stopMediaStream} sx={{ bgcolor: 'red', border: '3px solid white', padding: 2, borderRadius: '50%' }}>
//                             <FaPhone color="white" />
//                         </IconButton>
//                     </Box>
//                 </>
//             ) : null}
//         </Box>
//     );
// };

// export default Consultation;



import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaRobot, FaPause, FaPlay } from 'react-icons/fa';

const Consultation = () => {
    const [stream, setStream] = useState(null);
    const myVideo = useRef(null);
    const canvasRef = useRef(null);
    const recognitionRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isCallActive, setIsCallActive] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pausedFrame, setPausedFrame] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [speechText, setSpeechText] = useState('');

    useEffect(() => {
        return () => stopMediaStream();
    }, []);

    useEffect(() => {
        if (stream && myVideo.current) {
            myVideo.current.srcObject = stream;
        }
    }, [stream]);

    const requestMediaPermissions = async () => {
        setLoading(true);
        setError(null);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 60, max: 60 } },
                audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
            });
            setStream(mediaStream);
            setIsCallActive(true);
            setShowMenu(false);
            startSpeechRecognition();
        } catch (err) {
            setError('Please allow camera and microphone access to use this feature.');
        }
        setLoading(false);
    };

    const stopMediaStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        setIsCallActive(false);
        setShowMenu(true);
        setIsMuted(false);
        setIsCameraOn(true);
        setIsPaused(false);
        setPausedFrame(null);
        setSpeechText('');
        stopSpeechRecognition();
    };

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
            setIsMuted(prev => !prev);
        }
    };

    const captureLastFrame = () => {
        if (!myVideo.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = myVideo.current.videoWidth;
        canvas.height = myVideo.current.videoHeight;
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(myVideo.current, 0, 0, canvas.width, canvas.height);
        setPausedFrame(canvas.toDataURL('image/png'));
    };

    const togglePause = () => {
        if (isPaused) {
            setPausedFrame(null);
            stream.getVideoTracks().forEach(track => (track.enabled = isCameraOn));
            startSpeechRecognition();
        } else {
            captureLastFrame();
            stream.getVideoTracks().forEach(track => (track.enabled = false));
            stopSpeechRecognition();
        }
        setIsPaused(prev => !prev);
    };

    const toggleCamera = () => {
        if (stream) {
            setIsCameraOn(prev => !prev);
            stream.getVideoTracks().forEach(track => (track.enabled = !isCameraOn));
        }
    };

    const startSpeechRecognition = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;

        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        const recognition = recognitionRef.current;

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = event => {
            let newText = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                newText += event.results[i][0].transcript + ' ';
            }
            setSpeechText(prevText => prevText + newText);
        };
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    const stopSpeechRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return (
        <Box sx={{ width: '95.7vw', height: '91vh', display: 'flex', flexDirection: 'column', backgroundColor: 'black', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            {showMenu ? (
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="h4" gutterBottom>Welcome to AI Consultation</Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>Start a video call with our AI assistant.</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {loading ? <CircularProgress color="secondary" /> : (
                        <Button variant="contained" color="secondary" onClick={requestMediaPermissions} startIcon={<FaRobot />}>
                            Start AI Consultation
                        </Button>
                    )}
                </Box>
            ) : isCallActive ? (
                <>
                    <video
                        ref={myVideo}
                        autoPlay
                        playsInline
                        muted={!isPaused}
                        style={{
                            display: pausedFrame ? 'none' : 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: 'scaleX(-1)'
                        }}
                    />
                    {pausedFrame && (
                        <img
                            src={pausedFrame}
                            alt="Paused Frame"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                        />
                    )}
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <Typography 
                        sx={{ color: 'white', position: 'absolute', bottom: '20%', right: '10px', textAlign: 'right', maxWidth: '30%', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px' }}
                    >
                        {isListening ? "Listening..." : speechText}
                    </Typography>

                    <Box sx={{ position: 'absolute', bottom: '10%', display: 'flex', gap: '20px', justifyContent: 'center', width: '100%' }}>
                        <IconButton onClick={toggleMute} sx={{ bgcolor: 'white', padding: 2 }}>
                            {isMuted ? <FaMicrophoneSlash color="red" /> : <FaMicrophone color="black" />}
                        </IconButton>
                        <IconButton onClick={toggleCamera} sx={{ bgcolor: 'white', padding: 2 }}>
                            {isCameraOn ? <FaVideo color="black" /> : <FaVideoSlash color="red" />}
                        </IconButton>
                        <IconButton onClick={togglePause} sx={{ bgcolor: 'white', padding: 2 }}>
                            {isPaused ? <FaPlay color="black" /> : <FaPause color="black" />}
                        </IconButton>
                        <IconButton onClick={stopMediaStream} sx={{ bgcolor: 'red', padding: 2 }}>
                            <FaPhone color="white" />
                        </IconButton>
                    </Box>
                </>
            ) : null}
        </Box>
    );
};

export default Consultation;
