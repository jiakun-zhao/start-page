import defaultConfig from '../.start-page.json'

export const $: Document['querySelector'] = (selectors: any) => document.querySelector(selectors)
export const $new: Document['createElement'] = (tagName: any) => document.createElement(tagName)
export const $display = (el: HTMLElement, display: boolean) => el.style.display = display ? 'block' : 'none'

type Config = typeof defaultConfig

export async function getConfig(tag = 'latest') {
    let config: Config
    try {
        const repo = location.pathname.slice(1) || `jiakun-zhao/start-page@${tag}`
        const url = `https://cdn.jsdelivr.net/gh/${repo}/.start-page.json`
        config = await fetch(url).then(res => res.json())
    } catch {
        config = defaultConfig
    }
    const params = new URLSearchParams(location.search)
    config.wallpaper = params.get('wallpaper') || config.wallpaper
    const engines = config.engines
    const index = engines.findIndex(i => i.name === params.get('engine'))
    if (index > 0)
        config.engines = [engines[index], ...engines.slice(0, index), ...engines.slice(index + 1)]
    return config
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
