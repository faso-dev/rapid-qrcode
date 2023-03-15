import {Html5Qrcode} from "html5-qrcode";
import {CameraDevice} from "html5-qrcode/camera/core";
import {Html5QrcodeError, Html5QrcodeResult} from "html5-qrcode/core";
import React, {useCallback, useEffect, useState} from 'react';
import QrCodeIcon from "./assets/icons/qr-code-scan.png";
import './assets/sass/app.scss';
import {BlackButton} from "./components/BlackButton";
import {Panel} from "./components/Panel";
import {Scanable} from "./components/Scanable";
import {TransparentButton} from "./components/TransparentButton";
import {Typography} from "./components/Typography";


interface IUser {
    id: string
    first_name: string
    last_name: string
    email: string
}


function App() {
    const [isScanning, setIsScanning] = useState(false);
    const [devices, setDevices] = useState<CameraDevice[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<CameraDevice>(devices[0]);
    const [scanResult, setScanResult] = useState<string>('');
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [isChecking, setIsChecking] = useState(false);
    
    useEffect(() => {
        if (devices.length > 0) {
            setSelectedDevice(devices[0])
        }
    }, [devices]);
    
    useEffect(() => {
        if (scanResult.length > 0) {
            setIsChecking(true);
            fetch(`http://localhost:5000/api/v1/qrcodes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    access_code: scanResult
                })
            }).then(res => res.json())
              .then(data => {
                  setUser(data.item)
                  setIsChecking(false);
              })
              .catch(console.error)
              .finally(() => {
                  setIsChecking(false);
              })
        }
    }, [scanResult])
    
    const onSuccessScan = useCallback((decodedText: string, decodedResult: Html5QrcodeResult) => {
        if (scanResult !== decodedText) {
            setScanResult(decodedText)
            setIsScanning(false);
        }
    }, [scanResult]);
    
    const onErrorScan = useCallback((errorMessage: string, error: Html5QrcodeError) => {
        console.error(error)
    }, []);
    
    const loadCameraDevices = useCallback(async () => {
        try {
            const camDevices = await Html5Qrcode.getCameras();
            setDevices(camDevices)
        } catch (e) {
            console.error(e)
        }
    }, []);
    
    return (
        <div className="scan-app">
            <div
                style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                }}
                className="scan-app__container"
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '18px',
                        lineHeight: '22px',
                        fontStyle: 'normal',
                        color: '#fff',
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                >
                    Scanner le code QR
                </Typography>
                <Typography
                    variant="p"
                    sx={{
                        fontSize: '14px',
                        lineHeight: '17px',
                        fontStyle: 'normal',
                        color: '#A4A2A2',
                        fontWeight: '500',
                        textAlign: 'center',
                        marginTop: '36px',
                    }}
                >
                    Le code QR sera automatiquement détecté lorsque vous le positionnez entre les lignes de guidage.
                </Typography>
                
                <div>
                    {devices.length > 0 && (
                        <select
                            onChange={(e) => {
                                const deviceId = e.target.value;
                                const device = devices.find(d => d.id === deviceId);
                                if (device) {
                                    setSelectedDevice(device)
                                }
                            }}
                        >
                            <option key={'undefined'} disabled={true} value={''}>Select Camera</option>
                            {devices.map((d, i) => (
                                <option
                                    key={i}
                                    value={d.id}
                                >
                                    {d.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                {selectedDevice && (
                    <Scanable
                        fps={2}
                        w={290}
                        h={280}
                        cameraId={selectedDevice.id}
                        onSuccessScan={onSuccessScan}
                        onErrorScan={onErrorScan}
                        sx={{
                            marginTop: '5rem',
                        }}
                    />
                )}
                {scanResult.length > 0 && (
                    <div
                        className={'scan-app__result'}
                        style={{
                            marginTop: '3rem',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: '18px',
                                lineHeight: '22px',
                                fontStyle: 'normal',
                                color: '#fff',
                                fontWeight: '600',
                                textAlign: 'center',
                            }}
                        >
                            Résultat du scan
                        </Typography>
                        <Typography
                            variant="p"
                            sx={{
                                fontSize: '14px',
                                lineHeight: '17px',
                                fontStyle: 'normal',
                                color: '#A4A2A2',
                                fontWeight: '500',
                                textAlign: 'center',
                                marginTop: '36px',
                            }}
                        >
                            Code d'accès : {scanResult} <br/>
                            {isChecking ? (
                                <div
                                    className={'scan-app__result'}
                                    style={{
                                        marginTop: '3rem',
                                        display: 'flex',
                                        flexFlow: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="span"
                                        sx={{
                                            fontSize: '14px',
                                            lineHeight: '17px',
                                            fontStyle: 'normal',
                                            color: '#A4A2A2',
                                            fontWeight: '500',
                                            textAlign: 'center',
                                            marginTop: '36px',
                                        }}
                                    >
                                        Verification en cours...
                                    </Typography>
                                </div>
                            ) : (
                                 <>
                                     Status :
                                     <Typography
                                         variant={'span'}
                                         sx={{
                                             fontSize: '20px',
                                             lineHeight: '24px',
                                             fontStyle: 'normal',
                                             fontWeight: '700',
                                             color: user ? '#00FF00' : '#FF0000',
                                             marginLeft: '.5rem',
                                         }}
                                     >
                                         {user ? 'OK' : 'Non OK'}
                                     </Typography><br/>
                                     {user && (
                                         <span>
                                             Nom complet : {user.first_name} {user.last_name} <br/>
                                         </span>
                                     )}
                                 </>
                             )}
                        </Typography>
                    </div>
                )}
                <Panel
                    sx={{
                        width: '100%',
                        background: '#282828',
                        borderRadius: '30px'
                    }}
                >
                    <BlackButton
                        sx={{
                            gap: '.5rem'
                        }}
                        onClick={async () => {
                            if (devices.length === 0) {
                                await loadCameraDevices();
                            }
                            setIsScanning(!isScanning);
                        }}
                    >
                        <img
                            width={40}
                            height={40}
                            src={QrCodeIcon}
                            alt="qr-code"
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                        {isScanning ? 'Arreter' : 'Scanner'}
                    </BlackButton>
                    {scanResult.length > 0 && (
                        <TransparentButton
                            onClick={() => {
                                setScanResult('');
                            }}
                        >
                            Effacer
                        </TransparentButton>
                    )}
                </Panel>
            </div>
        </div>
    );
}

export default App;
