import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react'
import { arrowForward, arrowBack, stop, speedometer, play } from 'ionicons/icons'
import { useContext, useState } from 'react'
import Api from '../api/api'
import { MainContext } from '../MainContext'
import './Home.css'

type MotorType = 1 | 2
enum Direction {
    'forward' = 1,
    'stop' = 0,
    'back' = 2
}

export const Home: React.FC = () => {
    const { command, setCommand } = useContext(MainContext)
    const [speed1, setSpeed1] = useState<number>(50)
    const [speed2, setSpeed2] = useState<number>(50)
    const [rotateSpeed, setRotateSpeed] = useState<number>(50)
    const [rotateAngle, setRotateAngle] = useState<number>(10)
    const api = new Api()

    const move = async (motorType: MotorType, direction: Direction) => {
        const cmd = command
        cmd[0] = 125
        cmd[1] = motorType === 1 ? direction.valueOf() : command[1]
        cmd[2] = motorType === 1 ? speed1 : command[2]
        cmd[3] = motorType === 2 ? direction.valueOf() : command[3]
        cmd[4] = motorType === 2 ? speed2 : command[4]
        setCommand(cmd)
        await api.startMotor(cmd)
    }

    const rotate = async () => {
        const cmd = command
        cmd[0] = 160;
        cmd[1] = 0;
        cmd[2] = 0;
        cmd[3] = rotateAngle
        cmd[4] = rotateSpeed;
        await api.startMotor(cmd)
        setCommand(new Array(5).fill(0))
    }

    const disableStabilization = async () => {
        const cmd = command
        cmd[0] = 180
        cmd[1] = 0
        cmd[2] = 0
        cmd[3] = 0
        cmd[4] = 0
        await api.startMotor(cmd)
        setCommand(new Array(5).fill(0))
    }

    const enableStabilization = async () => {
        const cmd = command
        cmd[0] = 181
        cmd[1] = 0
        cmd[2] = 0
        cmd[3] = 0
        cmd[4] = 0
        await api.startMotor(cmd)
        setCommand(new Array(5).fill(0))
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Control</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>Motor 1</IonCardHeader>
                    <IonGrid>
                        <IonRow>
                            <IonCol
                                size='4'
                            >
                                <IonButton
                                    expand='block'
                                    size='large'
                                    onClick={() => move(1, Direction.back)}
                                >
                                    Back
                                </IonButton>
                            </IonCol>
                            <IonCol
                                size='4'
                            >
                                <IonButton
                                    expand='block'
                                    size='large'
                                    color='warning'
                                    onClick={() => move(1, Direction.stop)}
                                >
                                    STOP
                                </IonButton>
                            </IonCol>
                            <IonCol
                                size='4'
                            >
                                <IonButton
                                    expand='block'
                                    size='large'
                                    color='success'
                                    onClick={() => move(1, Direction.forward)}
                                >
                                    Forward
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='6'>
                                <IonItem>
                                    <IonIcon icon={speedometer} slot='start' />
                                    <IonInput
                                        type='number'
                                        value={speed1.toString()}
                                        onIonChange={e => setSpeed1(parseInt(e.detail.value || ''))}
                                        min={0}
                                        max={100}
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size='3'>
                                <IonButton
                                    expand='block'
                                    onClick={() => setSpeed1(speed1 + (speed1 - 10 < 0 ? 0 : -10))}
                                >
                                    -10
                                </IonButton>
                            </IonCol>
                            <IonCol size='3'>

                                <IonButton
                                    expand='block'
                                    onClick={() => setSpeed1(speed1 + (speed1 + 10 > 100 ? 0 : 10))}
                                >
                                    +10
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
                <IonCard>
                    <IonCardHeader>Motor 2</IonCardHeader>
                    <IonGrid>
                        <IonRow>
                            <IonCol
                                size='4'
                            >
                                <IonButton
                                    expand='block'
                                    size='large'
                                    onClick={() => move(2, Direction.back)}
                                >
                                    Back
                                </IonButton>
                            </IonCol>
                            <IonCol
                                size='4'
                            >
                                <IonButton
                                    expand='block'
                                    size='large'
                                    color='warning'
                                    onClick={() => move(2, Direction.stop)}
                                >
                                    STOP
                                </IonButton>
                            </IonCol>
                            <IonCol
                                size='4'
                            >
                                <IonButton
                                    expand='block'
                                    size='large'
                                    color='success'
                                    onClick={() => move(2, Direction.forward)}
                                >
                                    Forward
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='6'>
                                <IonItem>
                                    <IonIcon icon={speedometer} slot='start' />
                                    <IonInput
                                        type='number'
                                        value={speed2.toString()}
                                        onIonChange={e => setSpeed2(parseInt(e.detail.value || ''))}
                                        min={0}
                                        max={100}
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size='3'>
                                <IonButton
                                    expand='block'
                                    onClick={() => setSpeed2(speed2 + (speed2 - 10 < 0 ? 0 : -10))}
                                >
                                    -10
                                </IonButton>
                            </IonCol>
                            <IonCol size='3'>

                                <IonButton
                                    expand='block'
                                    onClick={() => setSpeed2(speed2 + (speed2 + 10 > 100 ? 0 : 10))}
                                >
                                    +10
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
                <IonCard>
                    <IonCardHeader>Stabilization</IonCardHeader>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonButton
                                    expand='block'
                                    color=''
                                    onClick={() => disableStabilization()}
                                >
                                    Off
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton
                                    expand='block'
                                    color='success'
                                    onClick={() => enableStabilization()}
                                >
                                    On
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
                <IonCard>
                    <IonCardHeader>Rotate</IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            <IonItem>
                                <IonLabel position='stacked'>Angle</IonLabel>
                                <IonInput
                                    type='number'
                                    value={rotateAngle.toString()}
                                    onIonChange={e => setRotateAngle(parseInt(e.detail.value || ''))}
                                    min={0}
                                    max={100}
                                />
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={speedometer} slot='start' />
                                <IonInput
                                    type='number'
                                    value={rotateSpeed.toString()}
                                    onIonChange={e => setRotateSpeed(parseInt(e.detail.value || ''))}
                                    min={0}
                                    max={100}
                                />
                            </IonItem>
                            <IonItem button onClick={rotate}>
                                <IonIcon icon={play} slot='start' />
                                Rotate
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}
