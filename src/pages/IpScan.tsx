import {
    IonButton,
    IonButtons,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonPage,
    IonProgressBar,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import { useContext, useEffect, useState } from "react"
import { refresh } from 'ionicons/icons'
import { ConnectionStatus, Network } from '@capacitor/network'
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2'
import { MainContext } from "../MainContext"
import { toast } from "react-toastify"
import Api from "../api/api"

interface INetworkData {
    localIp: string;
    gatewayIp: string;
    ssid: string;
}

const MAX_IP = 254

export const IpScan: React.FC = () => {
    const [isScan, setIsScan] = useState<Boolean>(false)
    const { ip, setIp } = useContext(MainContext)
    const [networkStatus, setNetworkStatus] = useState<ConnectionStatus>({} as ConnectionStatus)
    const [networkData, setNetworkData] = useState<INetworkData>({} as INetworkData)
    const [ips, setIps] = useState<string[]>([])
    const [startIp, setStartIp] = useState<string>('192.168.1.')
    const api = new Api()

    const scan = async () => {
        setIsScan(true)
        let count = 0

        for (let i = 0; i <= 255; i++) {
            (async () => {
                if (startIp)
                    networkData.localIp = startIp
                const newIp = networkData.localIp.slice(0, networkData.localIp.lastIndexOf('.') + 1) + i
                const res = await api.check(newIp)

                if (res.success && res.data === 'Ok_123\x00')
                    setIps([...ips, newIp])

                count++

                if (count >= MAX_IP)
                    setIsScan(false)
            })()
        }
    }

    useEffect(() => {
        const networkListener = Network.addListener('networkStatusChange', status => {
            setNetworkStatus(status)
        })

        updateNetworkStatus()

        return () => {
            networkListener.remove()
        }
    }, [])

    useEffect(() => {
        if (!networkStatus.connected || networkStatus.connectionType !== 'wifi')
            return;

        updateNetworkData()
    }, [networkStatus])

    const updateNetworkStatus = async () => setNetworkStatus(await Network.getStatus())

    const updateNetworkData = async () => {
        setNetworkData({
            ...networkData,
            localIp: await WifiWizard2.getWifiIP(),
            gatewayIp: await WifiWizard2.getWifiRouterIP(),
            ssid: await WifiWizard2.getConnectedSSID()
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>IP scanner</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={scan}>
                            <IonIcon icon={refresh} slot='start' />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {isScan &&
                <IonProgressBar
                    type='indeterminate'
                />
            }
            <IonContent>
                <IonList>
                    <IonItemDivider>Network</IonItemDivider>
                    <IonItem>
                        Connection:
                        {networkStatus.connected ?
                            <IonChip color='success'>
                                <IonLabel>OK</IonLabel>
                            </IonChip>
                            :
                            <IonChip color='danger'>
                                <IonLabel>No connection</IonLabel>
                            </IonChip>
                        }
                    </IonItem>
                    <IonItem>Selected IP: {ip}</IonItem>
                    <IonItem>Local IP: {networkData.localIp}</IonItem>
                    <IonItem>Gateway IP: {networkData.gatewayIp}</IonItem>
                    <IonItem>SSID: {networkData.ssid}</IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Start ip </IonLabel>
                        <IonInput
                            value={startIp}
                            onIonChange={e => setStartIp(e.detail.value || '')}
                        />
                    </IonItem>
                    <IonItemDivider>Devices</IonItemDivider>
                    {ips.map(e => (
                        <IonItem
                            key={e}
                            onClick={() => {
                                toast.info(`Selected: ${e}`)
                                setIp(e)
                            }}
                        >
                            {e}
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage >
    )
}