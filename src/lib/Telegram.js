// import 'telegram-web-app'


if (!Telegram.WebApp.isFullscreen) {
    Telegram.WebApp.requestFullscreen()
}
Telegram.WebApp.expand()
Telegram.WebApp.ready()
window.open = Telegram.WebApp.openLink

export default Telegram