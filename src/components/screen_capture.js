import React, { useState, useCallback } from 'react';
import axios from 'axios'

function ImageSection({props}) {
    console.log(props)
    const {num ,names ,jobs ,levels ,authorities ,week_mission_points ,suro_points ,flag_points} = props
    console.log(num)
    return (
        <div>
            <div>
                num: {num}
            </div>
            <div>
                names: 
                {names.map((imgBase64, index) => (
                    // <div> {imgBase64}, {index} </div>
                    <img key={index} src={`data:image/jpeg;base64,${imgBase64}`} alt={`Captured ${index}`} />
                ))}
            </div>
            <div>
                jobs: 
                {jobs.map((imgBase64, index) => (
                    <img key={index} src={`data:image/jpeg;base64,${imgBase64}`} alt={`Captured ${index}`} />
                ))}
            </div>
            <div>
                levels: 
                {levels.map((imgBase64, index) => (
                    <img key={index} src={`data:image/jpeg;base64,${imgBase64}`} alt={`Captured ${index}`} />
                ))}
            </div>
            <div>
                flag_points: 
                {flag_points.map((imgBase64, index) => (
                    <img key={index} src={`data:image/jpeg;base64,${imgBase64}`} alt={`Captured ${index}`} />
                ))}
            </div>
            <div>
                suro_points: 
                {suro_points.map((imgBase64, index) => (
                    <img key={index} src={`data:image/jpeg;base64,${imgBase64}`} alt={`Captured ${index}`} />
                ))}
            </div>
        </div>
    );
}

function ScreenCapture() {
    const [images, setImages] = useState({
        num: 0,
        names: [],
        jobs: [],
        levels: [],
        authorities: [],
        week_mission_points: [],
        suro_points: [],
        flag_points: [],
    }); // base64 문자열 리스트를 저장하기 위한 state

    const captureScreen = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            const track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);

            const sendImageToServer = async (base64Data) => {
                try {
                    const response = await axios.post('/api/page_info', { b64: base64Data });
                    const responseData = await response.data;
                    setImages(responseData)
                } catch (err) {
                    console.error('Error sending data to the server:', err);
                }
            };
            const processImage = async () => {
                const imageBitmap = await imageCapture.grabFrame();
                const canvas = document.createElement('canvas');
                canvas.width = imageBitmap.width;
                canvas.height = imageBitmap.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);
                const base64Data = canvas.toDataURL('image/jpeg').split(',')[1];

                // 서버로 이미지 데이터 전송
                sendImageToServer(base64Data);
            }
            processImage()
            // const intervalId = setInterval(processImage, 10000);

        } catch (error) {
            console.error("Error capturing the screen:", error);
        }
    }, []);

    return (
        <div>
            <button onClick={captureScreen}>Start Capture</button>
            <div>
                <ImageSection props={images} />
            </div>
        </div>
    );
}

export default ScreenCapture;
