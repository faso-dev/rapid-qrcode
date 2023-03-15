import {Html5Qrcode} from "html5-qrcode";
import {QrcodeErrorCallback, QrcodeSuccessCallback} from "html5-qrcode/core";
import {CSSProperties, useEffect} from "react";


interface IScanableProps {
    onSuccessScan: QrcodeSuccessCallback
    onErrorScan: QrcodeErrorCallback
    fps?: number
    w?: number
    h?: number
    aspectRatio?: number
    disableFlip?: boolean
    cameraId: string
    sx?: CSSProperties
}


const qrcodeRegionId = "qr-reader";
export const Scanable = ({
    fps,
    w, h,
    disableFlip,
    aspectRatio,
    onErrorScan,
    onSuccessScan,
    cameraId,
    sx,
}: IScanableProps) => {
    
    let html5QrCode: Html5Qrcode;
    
    useEffect(() => {
        
        // @ts-ignore
        if (!html5QrCode?.getState()) {
            html5QrCode = new Html5Qrcode(qrcodeRegionId);
            html5QrCode.start(
                cameraId,
                {
                    fps,
                    qrbox: {width: w || 250, height: h || 250},
                    disableFlip,
                    aspectRatio,
                },
                onSuccessScan,
                onErrorScan
            )
                       .catch((err) => {
                           console.error(err);
                       });
        }
        
        return () => {
           if (html5QrCode.isScanning) {
               html5QrCode.stop().then(() => {
                   html5QrCode.clear();
               }).catch(console.error);
           }
        }
    }, [aspectRatio, cameraId, disableFlip, fps, h, onErrorScan, onSuccessScan, w]);
    
    return <div
        style={sx}
        id={qrcodeRegionId}/>;
}
