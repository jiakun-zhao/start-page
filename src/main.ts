import 'uno.css'

const jsdelivr = 'https://cdn.jsdelivr.net/gh'
const folder = '.start-page'
const root = location.pathname === '/'
    ? 'jiakun-zhao/start-page'
    : location.pathname.slice(1)

const config = await fetch(`${jsdelivr}/${root}/${folder}/config.json`).then(res => res.json())
const wallpaper = `${jsdelivr}/${root}/${folder}/${config.wallpaper}`

console.log(config, wallpaper)
