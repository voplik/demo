import GiftImg from './gift-img'
import { useStore } from '../store/store'


export default () => {
    const { config } = useStore()
    const prices = config.prices

    return (
        <div>
            <h1>Цены на подарки</h1>
            {prices.map((gift) => {
                return (
                    <div>
                        <GiftImg gift={gift}/>
                        <p>Примерная цена: {gift.ton}</p>
                    </div>
                )
            })}
        </div>
    )    
}