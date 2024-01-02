export function getCompClassType(componentType: string, uiType?: string) {
	return uiType ? `${componentType}_${uiType}` : componentType
}

export function getClosestCompIdByHtmlElement(htmlElement: HTMLElement): string {
	const viewer_components_id_prefixes = [
		'MENU_AS_CONTAINER_TOGGLE',
		'MENU_AS_CONTAINER_EXPANDABLE_MENU',
		'BACK_TO_TOP_BUTTON',
		'SCROLL_TO_',
		'TPAMultiSection_',
		'TPASection_',
		'comp-',
		'TINY_MENU',
		'MENU_AS_CONTAINER',
	]
	let closestElement
	for (const prefix of viewer_components_id_prefixes) {
		closestElement = htmlElement.closest(`[id^="${prefix}"]`)
		if (closestElement) {
			break
		}
	}
	return closestElement?.id || ''
}
