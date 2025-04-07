import './App.css'

import Home from './pages/home'
import Telegram from './lib/Telegram'
import { useStore } from './store/store'
import ConnectWallet from './pages/connect-wallet'

import { Switch, Route } from 'wouter'
import { TonConnectUIProvider, useTonWallet, THEME, useTonConnectUI } from '@tonconnect/ui-react'
import { useEffect } from 'react'


const Router = () => {
    const [_, setTonConnectUI] = useTonConnectUI()
    const wallet = useTonWallet()
    const { config } = useStore()
    
    useEffect(() => {
        const handlerThemeChanged = () => {
            setTonConnectUI({
                uiPreferences: {
                    theme: Telegram.WebApp.colorScheme === 'dark' ? THEME.DARK : THEME.LIGHT,
                }
            })
        }
        Telegram.WebApp.onEvent('themeChanged', handlerThemeChanged)

        return () => {
            Telegram.WebApp.offEvent('themeChanged', handlerThemeChanged)
        }
    }, [])

    if (!config) return null

    return (
        <Switch>
            <Route path="*" component={wallet ? Home : ConnectWallet} />
        </Switch>
    )
}


export default () => {
    
    return (
        <TonConnectUIProvider 
            language='ru'  
            manifestUrl={`${location.origin}${location.pathname}/tonconnect-manifest.json`}
            uiPreferences={{
                theme: Telegram.WebApp.colorScheme === 'dark' ? THEME.DARK : THEME.LIGHT,
            }}
        >
            <Router />
        </TonConnectUIProvider>
    )
}
