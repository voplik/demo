import './App.css'

import Home from './pages/home'
import { useStore } from './store/store'
import ConnectWallet from './pages/connect-wallet'

import { Switch, Route } from 'wouter'
import { TonConnectUIProvider, useTonWallet } from '@tonconnect/ui-react'


const Router = () => {
    const wallet = useTonWallet()
    const { config } = useStore()

    if (!config) return null

    return (
        <Switch>
            <Route path="*" component={wallet ? Home : ConnectWallet} />
        </Switch>
    )
}


export default () => {
    console.log(`${location.origin}${location.pathname}/tonconnect-manifest.json`)
    return (
        <TonConnectUIProvider language='ru' manifestUrl={`${location.origin}${location.pathname}/tonconnect-manifest.json`}>
            <Router />
        </TonConnectUIProvider>
    )
}
