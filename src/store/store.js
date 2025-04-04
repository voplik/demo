import { create } from 'zustand'
import Telegram from '../lib/Telegram'
import io from 'socket.io-client'



const socket = io('/', {
    path: `${location.pathname}/ws`,
    auth: {
        initData: Telegram.WebApp.initData,
    },
    transports: ['websocket']
})
socket.io.on('open', () => {
    console.log('open socket')
})
socket.io.on('error', (e) => {
    console.error(e)
})
const call = async (method, body = {}) => {
    const response = await fetch(`${location.pathname}/${method}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            ...body,
            initData: Telegram.WebApp.initData,
        })
    })

    let error = response.statusText
    let data = null
    try {
        const result = await response.json()
        error = result.error
        data = result.data
    } catch{}
    if (response.status !== 200) throw new Error(error)

    return data
}


export const useStore = create((set, get) => {
    call('getConfig')
    .then((config) => {
        set({ config })
    })
    .catch(console.error)

    socket.on('newDeposit', (data) => {
        const { balance, deposit } = data
        const { config } = get()
        alert(JSON.stringify(data))
        
        config.user.balance = balance
        config.user.historyDeposit.push(deposit)

        set({
            config: { ...config }
        })
    })
    socket.on('newTransaction', (data) => {
        const { balance, transaction } = data
        const { config } = get()
        alert(JSON.stringify(data))
        
        config.user.balance = balance
        config.user.historyTransaction.push(transaction)

        set({
            config: { ...config }
        })
    })

    return {
        config: null,
        winGift: null,
        async swapGiftToTon(id) {
            const result = await call('swapGiftToTon', { id })
            const { config } = get()

            set({
                config: { 
                    ...config,
                    ...result,
                }
            })
        },
        async pickUpGift(id) {
            const result = await call('pickUpGift', { id })
            const { config } = get()

            set({
                config: {
                    ...config,
                    ...result,
                }
            })
        },
        async randomGift() {
            set({ winGift: null })

            const result = await call('randomGift')
            const { config } = get()
            
            set({
                config: {
                    ...config,
                    ...result,
                },
                winGift: result.gift
            })
        }
    }
})