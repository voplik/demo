export default ({ gift }) => {
    const model = gift.model
    return <img src={model.photoUrl} alt="" width={50} height={50} />
}