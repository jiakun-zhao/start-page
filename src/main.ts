import './style.scss'
import { $, $display, $new, getConfig, getSugUl } from './utils'

(async function () {
    const { bookmarks, wallpaper, engines } = await getConfig('v1.0.5')

    const header = $('header')!
    const form = $('form')!
    const input = $('input')!
    const hr = $('hr')!
    const ul = $('ul')!

    $('img')!.src = wallpaper

    bookmarks.slice(0, 8).forEach((i) => {
        const a = $new('a')
        a.href = i.url
        a.title = i.name
        a.setAttribute('style', `--icon: url(${i.icon})`)
        header.appendChild(a)
    })

    input.focus()
    input.addEventListener('input', async () => {
        const val = input.value
        const idx = val.indexOf(' ')
        const hit = engines.find(i => i.alias === val.slice(0, idx))
        const word = hit ? val.slice(idx) : val

        ul.innerHTML = await getSugUl(hit ?? engines[0], word)
        ul.firstElementChild?.setAttribute('data-current', 'true')
        $display(hr, !!ul.innerHTML)
    })

    const liCurrentSwitch: Record<string, ((nowCurrent: Element | null) => Element | null)> = {
        ArrowDown: nowCurrent => nowCurrent?.nextElementSibling ?? ul.firstElementChild,
        ArrowUp: nowCurrent => nowCurrent?.previousElementSibling ?? ul.lastElementChild,
    }

    input.addEventListener('keydown', (e) => {
        if (Object.hasOwn(liCurrentSwitch, e.key)) {
            const nowCurrent = ul.querySelector('[data-current]')
            const nextCurrent = liCurrentSwitch[e.key](nowCurrent)
            nowCurrent?.removeAttribute('data-current')
            nextCurrent?.setAttribute('data-current', 'true')
            e.preventDefault()
        }
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (!input.value)
            return
        const nowCurrent = ul.querySelector('[data-current]')
        location.href = nowCurrent?.firstElementChild?.getAttribute('href')
            ?? engines[0].url.replace('{query}', encodeURI(input.value))
    })
})().catch(console.error)
