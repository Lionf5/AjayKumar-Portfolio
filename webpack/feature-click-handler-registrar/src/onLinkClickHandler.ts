import { multi, withDependencies } from '@wix/thunderbolt-ioc'
import { IOnLinkClickHandler } from './types'
import {
	Experiments,
	ExperimentsSymbol,
	ILinkClickHandler,
	ILogger,
	LoggerSymbol,
	NavigationClickHandlerSymbol,
	SiteLinkClickHandlerSymbol,
} from '@wix/thunderbolt-symbols'
import { yieldToMain } from '@wix/thunderbolt-commons'

type HTMLElementTarget = HTMLElement | null
const getAnchorTarget = (event: MouseEvent) => {
	let eTarget = event.target as HTMLElementTarget

	while (eTarget && (!eTarget.tagName || eTarget.tagName.toLowerCase() !== 'a')) {
		eTarget = eTarget.parentNode as HTMLElementTarget
	}
	return eTarget
}

const onLinkClickHandler = (
	experiments: Experiments,
	logger: ILogger,
	navigationHandler: ILinkClickHandler,
	siteLinkClickHandlers: Array<ILinkClickHandler>
): IOnLinkClickHandler => {
	const masterPageClickHandlers: Array<ILinkClickHandler> = []
	const pageClickHandlers: Array<ILinkClickHandler> = []
	return {
		onLinkClick: async (e: MouseEvent) => {
			const isOnLinkClickHandlerReport = experiments['specs.thunderbolt.OnLinkClickHandlerReport']
			const isOnLinkClickHandlerAsync = experiments['specs.thunderbolt.onLinkClickHandlerAsync']
			if (isOnLinkClickHandlerAsync) {
				e.preventDefault()
				await yieldToMain()
			}
			if (e.metaKey || e.ctrlKey) {
				return
			}
			const anchorTarget = isOnLinkClickHandlerReport
				? logger.runAndReport(() => getAnchorTarget(e), 'click-handler-registrar', 'getAnchorTarget')
				: getAnchorTarget(e)

			if (anchorTarget && experiments['specs.thunderbolt.fullPageNavigation']) {
				return
			}

			if (!anchorTarget) {
				return
			}
			if (anchorTarget.getAttribute('data-cancel-link')) {
				return
			}

			let shouldResumeDefault = true
			const fireHandlers = (handlers: Array<ILinkClickHandler>) => {
				for (const handler of handlers) {
					const didHandle = isOnLinkClickHandlerReport
						? logger.runAndReport(
								() => handler.handleClick(anchorTarget),
								'click-handler-registrar',
								`onClickHandler-${handler.handlerId}`
						  )
						: handler.handleClick(anchorTarget)
					if (didHandle) {
						shouldResumeDefault = false
						if (!isOnLinkClickHandlerAsync) {
							e.preventDefault()
						}
						e.stopPropagation()
						return
					}
				}
			}

			fireHandlers([...siteLinkClickHandlers, ...masterPageClickHandlers])
			fireHandlers([...pageClickHandlers, navigationHandler])

			if (isOnLinkClickHandlerAsync && shouldResumeDefault) {
				const href = anchorTarget.getAttribute('href')
				href && window.open(href, anchorTarget.getAttribute('target') || '_self')
			}
		},
		registerPageClickHandler: (handler: ILinkClickHandler, pageId: string) => {
			pageId === 'masterPage' ? masterPageClickHandlers.push(handler) : pageClickHandlers.push(handler)
		},
	}
}

export const OnLinkClickHandler = withDependencies(
	[ExperimentsSymbol, LoggerSymbol, NavigationClickHandlerSymbol, multi(SiteLinkClickHandlerSymbol)],
	onLinkClickHandler
)
