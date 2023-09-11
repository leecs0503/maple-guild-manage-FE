import React, { useCallback } from 'react';

function ScreenCapture() {
    const captureScreen = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            const track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);

            const intervalId = setInterval(async () => {
                const imageBitmap = await imageCapture.grabFrame();
                const canvas = document.createElement('canvas');
                canvas.width = imageBitmap.width;
                canvas.height = imageBitmap.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);
                const base64Data = canvas.toDataURL('image/jpeg').split(',')[1];

                // 여기서 base64Data를 원하는 대상에게 전송하면 됩니다.
                console.log(base64Data);
            }, 1000);

            // 버튼을 다시 클릭하여 캡처를 중지하려면 이러한 메커니즘을 추가해야 합니다.
            // 예를 들면, interval을 멈추게 하는 로직 등이 필요합니다.

        } catch (error) {
            console.error("Error capturing the screen:", error);
        }
    }, []);

    return <div><button onClick={captureScreen}>Start Capture</button></div>;
}

export default ScreenCapture;
