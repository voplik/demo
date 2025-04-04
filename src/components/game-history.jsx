import GiftImg from './gift-img'
import { useStore } from '../store/store'
import Telegram from '../lib/Telegram'


export default () => {
    const { showPopup } = Telegram.WebApp
    const { config, pickUpGift, swapGiftToTon } = useStore()
    const userGifts = config.user.gifts
    const awaitingGifts = userGifts.filter((gift) => gift.status === 'awaiting').reverse()
    const swapOrSentGifts = config.user.gifts.filter((gift) => gift.status === 'swap' || gift.status === 'sent').reverse()
    const pickUp = (id) => {
        pickUpGift(id)
        .catch((e) => {
            console.error(e)
        })
    }

    const swapGift = (giftId) => {
        showPopup({
            buttons: [
                {
                    id: '1',
                    text: 'Продать',
                    type: 'ok'
                },
                {
                    id: '0',
                    text: 'Отменить',
                    type: 'cancel',
                },
            ],
            message: 'Многновенная продажа',
            title: 'Вы точно хотите продать?'
        }, (id) => {
            if (id === '1') {
                swapGiftToTon(giftId)
                .catch(console.error)
            }
        })
    }

    return (
        <div>
            <h1>История игр {`(Корзина)`}</h1>
            {userGifts.length <= 0 && <p>История пуста</p>}
            {awaitingGifts.map((gift, index) => {
                const { id, title } = gift
                return (
                    <div>
                        <GiftImg gift={gift}/>
                        <div id={id}>{`${index + 1}. ${title} [${id}]`}</div>
                        <div>
                            <button onClick={() => {
                                swapGift(id)
                            }}>Продать</button>
                            <button onClick={() => {
                                pickUp(id)
                            }}>Забрать</button>
                        </div>
                    </div>
                )
            })} 
            {swapOrSentGifts.map((gift, index) => {
                const { id, title, status } = gift
                const text = status === 'sent' 
                ? 'Передано'
                : 'Продано'
                return (
                    <div>
                        <GiftImg gift={gift}/>
                        <div id={id}>{`${index + 1}. ${title} [${id}] (${text})`}</div>
                    </div>
                )
            })}
        </div>
    )    
}