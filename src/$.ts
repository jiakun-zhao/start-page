import defaultConfig from '../.start-page/config.json'

export const $: Document['querySelector'] = (selectors: any) => document.querySelector(selectors)
export const $new: Document['createElement'] = (tagName: any) => document.createElement(tagName)
export const $display = (el: HTMLElement, display: boolean) => el.style.display = display ? 'block' : 'none'

type Config = typeof defaultConfig

export async function getConfig(tag = 'latest') {
    try {
        const repo = location.pathname.slice(1) || `jiakun-zhao/start-page@${tag}`
        const root = `https://cdn.jsdelivr.net/gh/${repo}/.start-page`
        const config: Config = await fetch(`${root}/config.json`).then(res => res.json())
        if (!config.wallpaper.startsWith('http'))
            config.wallpaper = `${root}/${config.wallpaper}`
        return config
    } catch {
        return defaultConfig
    }
}

export async function getSugUl(engine: Config['engines'][0], word: string): Promise<string> {
    return new Promise((resolve) => {
        if (!word) {
            resolve('')
        } else {
            const script = $new('script')
            script.src = `https://www.baidu.com/sugrec?prod=pc&wd=${word}&cb=baiduCallback`
            window.baiduCallback = (e: any) => {
                script.remove()
                const i1 = { name: `${engine.name}: ${word}`, url: encodeURI(word) }
                const i2: typeof i1[] = (e?.g?.map((i: any) => i?.q).filter(Boolean) ?? [])
                    .map((i: any) => ({ name: i, url: encodeURI(i) }))
                const buildLi = (i: typeof i1) => `<li><a href="${engine.url.replace('{query}', i.url)}">${i.name}</a></li>`
                resolve([i1, ...i2].slice(0, 8).map(buildLi).join(''))
            }
            document.head.appendChild(script)
        }
    })
}
