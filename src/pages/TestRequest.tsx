import { IonCard, IonCardContent, IonCardHeader, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import { useContext, useState } from "react"
import { MainContext } from "../MainContext"
import { send } from 'ionicons/icons'
import Api from "../api/api"

export const TestRequest: React.FC = () => {
    const { ip } = useContext(MainContext)
    const [req, setReq] = useState<string>(`http://${ip}/motor`)
    const [res, setRes] = useState<string>()
    const api = new Api()

    const sendRequest = async () => {
        const r = await api.request('', true, '', req)
        setRes(r.data)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Test request</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>Request</IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel position='stacked'>Input the command:</IonLabel>
                            <IonInput
                                onIonChange={e => setReq(e.detail.value || '')}
                                // value={`http://${ip}/motor`}
                                value={req}
                            />
                        </IonItem>
                        <IonItem button onClick={sendRequest}>
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
                        {res ? res : <IonChip color='tertiary'>No Data</IonChip>}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}