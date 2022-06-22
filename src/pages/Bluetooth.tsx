import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemDivider,
    IonItemOption,
    IonLabel,
    IonList,
    IonPage,
    IonProgressBar,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import { useContext, useEffect, useState } from "react"
import { refresh, send } from 'ionicons/icons'
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial'
import Api from "../api/api"

interface INetworkData {
    localIp: string;
    gatewayIp: string;
    ssid: string;
}

const MAX_IP = 254

export const Bluetooth: React.FC = () => {
    const api = new Api()
    const [mode, setMode] = useState<string>('devices')
    const [data, setData] = useState<string>('')
    const [req, setReq] = useState<string>(`check`)
    const [devices, setDevices] = useState<any[]>([{
        "class": 276,
        "id": "10:BF:48:CB:00:00",
        "address": "10:BF:48:CB:00:00",
        "name": "Nexus 7"
    }, {
        "class": 7936,
        "id": "00:06:66:4D:00:00",
        "address": "00:06:66:4D:00:00",
        "name": "RN42"
    }])

    const updateDevices = async () => {
        setDevices(await BluetoothSerial.list())
    }

    useEffect(() => {
        updateDevices()

        BluetoothSerial.subscribe('\n').subscribe((d: string) => {
            setData(data)
        })

    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bluetooth</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={updateDevices}>
                            <IonIcon icon={refresh} slot='start' />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSegment value={mode} onIonChange={e => setMode(e.detail.value || 'devices')}>
                    <IonSegmentButton value='devices'>Devices</IonSegmentButton>
                    <IonSegmentButton value='send'>Send data</IonSegmentButton>
                </IonSegment>
                {mode === 'devices' &&
                    <>
                        <IonCard>
                            <IonCardHeader>Devices</IonCardHeader>
                            <IonList>
                                {devices.map(e =>
                                    <IonItem key={e.id} button onClick={() => {
                                        BluetoothSerial.connect(e.address)
                                    }}>
                                        <IonLabel>{e.name}</IonLabel>
                                        {e.address}
                                    </IonItem>
                                )}
                            </IonList>
                        </IonCard>
                    </>
                }
                {mode === 'send' &&
                    <>
                        <IonCard>
                            <IonCardHeader>Request</IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    <IonLabel position='stacked'>Input the command:</IonLabel>
                                    <IonInput
                                        onIonChange={e => setReq(e.detail.value || '')}
                                        value={req}
                                    />
                                </IonItem>
                                <IonItem button onClick={() => BluetoothSerial.write(req)}>
                                    <IonLabel>Send</IonLabel>
                                    <IonIcon
                                        icon={send}
                                    />
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>Response</IonCardHeader>
                            <IonCardContent>
                                {data ? data : <IonChip color='tertiary'>No Data</IonChip>}
                            </IonCardContent>
                        </IonCard>
                    </>
                }
            </IonContent>
        </IonPage >
    )
}