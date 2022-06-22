import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Home } from './pages/Home'
import { ToastContainer } from 'react-toastify'
import { settings, gameController, camera, construct } from 'ionicons/icons'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import 'react-toastify/dist/ReactToastify.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import { Settings } from './pages/Settings'
import { useEffect, useState } from 'react'
import { MainContext } from './MainContext'
import { IpScan } from './pages/IpScan'
import { Cam } from './pages/Cam'
import { TestRequest } from './pages/TestRequest'
import { Bluetooth } from './pages/Bluetooth'

setupIonicReact()

const App: React.FC = () => {
    const [loading, setLoading] = useState<Boolean>(false)
    const [ip, setIp] = useState<string>('')
    const [command, setCommand] = useState<number[]>(new Array(5).fill(0))

    document.body.classList.toggle('light')

    useEffect(() => {
        let lIp = localStorage.getItem('spherebotIp')
        if (!lIp)
            lIp = '192.168.1.2'

        setIp(lIp)
    }, [])

    return (
        <IonApp>
            <MainContext.Provider value={{
                command,
                setCommand,
                loading,
                setLoading,
                ip,
                setIp: (i: string) => {
                    localStorage.setItem('spherebotIp', i)
                    setIp(i)
                }
            }}>
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route exact path='/home'><Home /></Route>
                            <Route exact path='/settings'><Settings /></Route>
                            <Route exact path='/ipscan'><IpScan /></Route>
                            <Route exact path='/cam'><Cam /></Route>
                            <Route exact path='/testRequest'><TestRequest /></Route>
                            <Route exact path='/ipscan'><IpScan /></Route>
                            <Route exact path='/bluetooth'><Bluetooth /></Route>
                            <Route exact path='/'><Redirect to='/home' /></Route>
                        </IonRouterOutlet>
                        <IonTabBar slot='bottom'>
                            <IonTabButton tab='home' href='/home'>
                                <IonIcon icon={gameController} />
                                <IonLabel>Control</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab='Сam' href='/cam'>
                                <IonIcon icon={camera} />
                                <IonLabel>Cam</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab='Test request' href='/testRequest'>
                                <IonIcon icon={construct} />
                                <IonLabel>Test request</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab='settings' href='/settings'>
                                <IonIcon icon={settings} />
                                <IonLabel>Settings</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </MainContext.Provider>

            <ToastContainer
                position="top-right"
                autoClose={700}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                theme='light'
                rtl={false}
                draggable
                pauseOnHover
            />
        </IonApp>
    )
}

export default App
