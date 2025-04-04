import GiftImg from './gift-img'
import Telegram from '../lib/Telegram'
import { useEffect } from 'react'
import { useStore } from '../store/store'


export default () => {
    const { MainButton, showAlert } = Telegram.WebApp
    const { config, randomGift, winGift } = useStore()
    
    useEffect(() => {
        MainButton.setText(`Крутить за ${config.play} TON`)
    }, [])

    useEffect(() => {
        const handleMainButton = async () => {
            try {
                MainButton.disable()
                MainButton.showProgress()
                await randomGift()
            } catch(e) {
                console.error(e)
                let text = 'Что-то пошло не так.'
                if (e.message === 'NOT_FOUND_GIFT') {
                    text = 'Подарки закончились'
                }
                
                showAlert(text)
            } finally {
                MainButton.enable()
                MainButton.hideProgress()
            }
        }
        
        MainButton.show()
        MainButton.onClick(handleMainButton)
        return () => {
            MainButton.hide()
            MainButton.offClick(handleMainButton)
        }
    }, [])

    return (
        <div>
            <h1>Game</h1>
            {winGift && (
                <div>
                    <p>Вы выиграли {winGift.title}</p>
                    <GiftImg gift={winGift}/>
                </div>
            )}
        </div>
    )
}