import Telegram from '../lib/Telegram'
import { useTonConnectModal } from '@tonconnect/ui-react'
import { useEffect } from 'react'


export default () => {
    const { state, open: openModal, close: closeModal } = useTonConnectModal()
    const { MainButton } = Telegram.WebApp

    useEffect(() => {
        if (state.status === 'opened') {
            MainButton.hide()
        } else {
            MainButton.show()
        }
    }, [state])

    useEffect(() => {
        const handleMainButton = () => {
            openModal()
        }

        MainButton.setParams({
            text: 'Подключить кошелек',
            is_visible: true,
        })
        
        MainButton.onClick(handleMainButton)
        return () => {
            MainButton.offClick(handleMainButton)
            closeModal()
        }
    }, [])

    return <h1>GiftsGames</h1>
}