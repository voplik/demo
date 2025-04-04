import GiftImg from './gift-img'
import Telegram from '../lib/Telegram'
import { useStore } from '../store/store'


export default () => {
    const { openTelegramLink } = Telegram.WebApp
    const { config } = useStore()
    const nfts = config.nfts 

    const openPopUpNFT = (slug) => {
        openTelegramLink(`https://t.me/nft/${slug}&quot`)
    }

    return (
        <div>
            <h1>Мои NFT</h1>
            {nfts.length <= 0 && <p>Нет подарков</p>}
            {nfts.map((gift, index) => {
                const { id, title, slug } = gift
                return (
                    <div>
                        <GiftImg gift={gift} />
                        <div id={id}>{`${index + 1}. ${title} [${id}]`}</div>
                        <div>
                            <button onClick={() => {
                                openPopUpNFT(slug)
                            }}>Предосмотр</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}