import { IonButton, IonCol, IonContent, IonHeader, IonItem, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react"
import { useContext, useEffect, useRef, useState } from "react"
import { MainContext } from "../MainContext"
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Api from "../api/api"
import { move } from "ionicons/icons"

const marks = {
    '-100': -100,
    '-50': -50,
    0: 0,
    50: 50,
    100: 100,
}

const getDirection = (value: number) => {
    if (value > 0)
        return 1

    if (value < 0)
        return 2

    return 0
}

export const Cam: React.FC = () => {
    const { ip, command, setCommand } = useContext(MainContext)
    const [random, setRandom] = useState<number>(0)
    const [mode, setMode] = useState<string>('image')
    const videoRef = useRef<HTMLCanvasElement>(null)
    const [motor1, setMotor1] = useState<number>(0)
    const [motor2, setMotor2] = useState<number>(0)
    const api = new Api()


    useEffect(() => {
        videoRef.current?.getContext('2d')
    })

    const move = async () => {
        const cmd = command
        cmd[0] = 125
        cmd[1] = getDirection(motor1)
        cmd[2] = Math.abs(motor1)
        cmd[3] = getDirection(motor2)
        cmd[4] = Math.abs(motor2)
        setCommand(cmd)
        await api.startMotor(cmd)
    }

    useEffect(() => {
        move()
    }, [motor1, motor2])
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
                        <div style={{ padding: 20 }}>
                            <IonRow>
                                <IonCol size='11'>
                                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                                        <img
                                            style={{
                                                transform: 'rotate(90deg)',
                                                marginTop: '50px'
                                            }}
                                            src={`http://${ip}/capture?${random}`}
                                        />
                                    </div>
                                </IonCol>
                                <IonCol>
                                    <Slider
                                        step={10}
                                        style={{ height: 200 }}
                                        vertical
                                        marks={marks}
                                        min={-100}
                                        max={100}
                                        value={motor2}
                                        onChange={e => setMotor2(parseInt(e.toString()))}
                                    />
                                </IonCol>
                            </IonRow>
                            <br />
                            <br />
                            <IonRow>
                                <IonCol>
                                    <Slider
                                        step={10}
                                        marks={marks}
                                        min={-100}
                                        max={100}
                                        value={motor1}
                                        onChange={e => setMotor1(parseInt(e.toString()))}
                                    />
                                </IonCol>
                            </IonRow>
                            <br />
                            <br />
                            <IonRow>
                                <IonCol>
                                    <IonButton
                                        color='danger'
                                        expand='block'
                                        onClick={() => {
                                            setMotor1(0)
                                            setMotor2(0)
                                        }}
                                    >
                                        STOP
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton
                                        color='danger'
                                        expand='block'
                                        onClick={() => setMotor1(0)}
                                    >
                                        STOP Rotation
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </div>
                    </>
                }
                {mode === 'stream' &&
                    <div>
                        <div style={{ textAlign: 'center', padding: 20 }}>
                            <IonRow>
                                <IonCol size='10'>
                                    <img
                                        style={{
                                            transform: 'rotate(90deg)',
                                            marginTop: '50px'
                                        }}
                                        src={`http://${ip}:81/stream`}
                                    />
                                </IonCol>
                                <IonCol>
                                    <Slider
                                        step={10}
                                        style={{ height: 200 }}
                                        vertical
                                        marks={marks}
                                        min={-100}
                                        max={100}
                                        value={motor2}
                                        onChange={e => setMotor2(parseInt(e.toString()))}
                                    />
                                </IonCol>
                            </IonRow>
                            <br />
                            <br />
                            <IonRow>
                                <IonCol>
                                    <Slider
                                        step={10}
                                        marks={marks}
                                        min={-100}
                                        max={100}
                                        value={motor1}
                                        onChange={e => setMotor1(parseInt(e.toString()))}
                                    />
                                </IonCol>
                            </IonRow>
                            <br />
                            <br />
                            <IonRow>
                                <IonCol>
                                    <IonButton
                                        color='danger'
                                        expand='block'
                                        onClick={() => {
                                            setMotor1(0)
                                            setMotor2(0)
                                        }}
                                    >
                                        STOP
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton
                                        color='danger'
                                        expand='block'
                                        onClick={() => setMotor1(0)}
                                    >
                                        STOP Rotation
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </div>
                    </div>
                }
            </IonContent>
        </IonPage>
    )
}