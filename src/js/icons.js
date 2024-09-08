import {
    FaTruck,
    FaHammer, // Заменяем FaTrowel на FaHammer
    FaMonument,
    FaBars,
    FaLeaf,
    FaBorderAll,
    FaThLarge,
    FaLayerGroup,
    FaWhatsapp,
} from 'react-icons/fa'

// Функция для преобразования React-компонента в строку SVG
function iconToSvg(Icon) {
    const { attr, children } = Icon({}).props
    const svgChildren = children.map((child) => child.props.d).join(' ')
    return `<svg xmlns="http://www.w3.org/2000/svg" 
                 viewBox="${attr.viewBox}" 
                 fill="currentColor" 
                 class="w-4 h-4 text-green-500">
        <path d="${svgChildren}"></path>
    </svg>`
}

export const icons = {
    truck: iconToSvg(FaTruck),
    trowel: iconToSvg(FaHammer), // Используем FaHammer вместо FaTrowel
    monument: iconToSvg(FaMonument),
    fence: iconToSvg(FaBars),
    grass: iconToSvg(FaLeaf), // Используем FaLeaf для газона
    'border-all': iconToSvg(FaBorderAll),
    grid: iconToSvg(FaThLarge), // Используем FaThLarge для брусчатки
    'layer-group': iconToSvg(FaLayerGroup),
    whatsapp: iconToSvg(FaWhatsapp),
}
