import Script from "../Script"

export interface YandexMetrikaProps {
    id: string
    clickmap?: boolean
    trackLinks?: boolean
    accurateTrackBounce?: boolean
    webvisor?: boolean
}

const YandexMetrika = ({ id, ...props }: YandexMetrikaProps) => {
    const yandexMetrikaScript = `
    (function (m, e, t, r, i) {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
    ym(${id}, "init", ${JSON.stringify(props)});
    `
    return <Script async keep content={{id: "yandex-metrika", body: yandexMetrikaScript}} />
}

export default YandexMetrika
