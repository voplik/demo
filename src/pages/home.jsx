import { useState } from 'react'
import Game from '../components/game'
import MyNft from '../components/my-nft'
import Header from '../components/header'
import GameHistory from '../components/game-history'
import TransactionHistory from '../components/transaction-history'
import Prices from '../components/prices'


export default () => {
    const [view, setView] = useState()

    let viewComponent = <Game />
    if (view === 'GameHistory') {
        viewComponent = <GameHistory/>
    }
    if (view === 'MyNft') {
        viewComponent = <MyNft />
    }
    if (view === 'TransactionHistory') {
        viewComponent = <TransactionHistory/>
    }
    if (view === 'Prices') {
        viewComponent = <Prices/>
    }
    return (
        <div>
            <Header />
            <div>
                <button onClick={() => setView('Game')}>Game</button>
                <button onClick={() => setView('GameHistory')}>GameHistory</button>
                <button onClick={() => setView('MyNft')}>MyNft</button>
                <button onClick={() => setView('TransactionHistory')}>TransactionHistory</button>
                <button onClick={() => setView('Prices')}>Prices</button>
            </div>
            {viewComponent}
        </div>
    )
}