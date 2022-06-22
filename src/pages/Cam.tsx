import { IonContent, IonHeader, IonItem, IonList, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react"
import { useContext, useEffect, useRef, useState } from "react"
import { MainContext } from "../MainContext"

export const Cam: React.FC = () => {
    const { ip } = useContext(MainContext)
    const [random, setRandom] = useState<number>(0)
    const [mode, setMode] = useState<string>('image')
    const videoRef = useRef<HTMLCanvasElement>(null)



    useEffect(() => {
        videoRef.current?.getContext('2d')
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Cam</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSegment value={mode} onIonChange={e => setMode(e.detail.value || 'image')}>
                    <IonSegmentButton value='image'>Image</IonSegmentButton>
                    <IonSegmentButton value='stream'>Stream</IonSegmentButton>
                </IonSegment>
                {mode === 'image' &&
                    <>
                        <IonList>
                            <IonItem button onClick={() => setRandom((new Date()).getTime())}>
                                UPDATE IMAGE
                            </IonItem>
                        </IonList>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <img
                                style={{
                                    transform: 'rotate(90deg)',
                                    marginTop: '50px'
                                }}
                                src={`http://${ip}/capture?${random}`}
                            />
                        </div>
                    </>
                }
                {mode === 'stream' &&
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <img
                            style={{
                                transform: 'rotate(90deg)',
                                marginTop: '50px'
                            }}
                            src={`http://${ip}:81/stream`}
                        />
                    </div>
                }
            </IonContent>
        </IonPage>
    )
}