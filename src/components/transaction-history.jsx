import { useStore } from '../store/store'


export default () => {
    const { config } = useStore()

    const history = config.user.historyTransaction
    
    return (
        <div>
            <h1>История пополнений</h1>
            {history.length <= 0 && <p>История пуста</p>}
            {history.map(({ value, type }) => {
                const text = `${value} ${type}`

                return (
                    <div>
                        <p>{text}</p>
                    </div>
                )
            })}
        </div>
    )
}