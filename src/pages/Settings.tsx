import {
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel, IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react'
import { useContext } from 'react'
import { MainContext } from '../MainContext'
import './Home.css'
import { wifi, bluetooth, refresh } from 'ionicons/icons'
import Api from '../api/api'

export const Settings: React.FC = () => {
    const { ip, setIp } = useContext(MainContext)
    const api = new Api()

    const reset = async () => {
        const cmd = new Array(5).fill(0)
        cmd[0] = 111;
        cmd[1] = 0;
        cmd[2] = 0;
        cmd[3] = 0
        cmd[4] = 0;
        await api.startMotor(cmd)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position='stacked'>IP</IonLabel>
                        <IonInput value={ip} onIonChange={e => setIp(e.detail.value || '')} />
                    </IonItem>
                    <IonItem href='/ipscan'>
                        <IonIcon icon={wifi} slot='start' />
                        <IonLabel>
                            IP scanner
                        </IonLabel>
                    </IonItem>
                    <IonItem href='/bluetooth'>
                        <IonIcon icon={bluetooth} slot='start' />
                        <IonLabel>
                            Bluetooth
                        </IonLabel>
                    </IonItem>
                    <IonItem button onClick={reset}>
                        <IonIcon icon={refresh} slot='start' />
                        <IonLabel>
                            Reset
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
