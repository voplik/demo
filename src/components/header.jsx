import { beginCell, toNano } from '@ton/ton'
import { useStore } from '../store/store'
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react'


export default () => {
    const { config } = useStore()
    const [tonConnectUI] = useTonConnectUI()

    const deposit = () => {
        const value = parseInt(prompt('Пополнение'))
        if (isNaN(value)) return

        const payload = beginCell()
        .storeUint(0, 32)
        .storeStringTail(config.user.id)
        .endCell()
        .toBoc()
        .toString('base64')

        tonConnectUI.sendTransaction({
            validUntil: Date.now() + 5 * 60 * 1000,
            messages: [
                {
                    address: config.address,
                    amount: toNano(value).toString(),
                    payload,
                },
            ],
        })
        .catch((e) => {
            console.error(e)
        })
    }

    return (
        <div>
            <TonConnectButton />
            <p>Баланс: {config.user.balance}</p>
            <button onClick={deposit}>Пополнить</button>
            <div style={{ margin: 10 }}></div>
        </div>
    )
}
