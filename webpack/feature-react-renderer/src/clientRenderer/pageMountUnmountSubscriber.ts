import { yieldToMain } from '@wix/thunderbolt-commons'
import {
	BrowserWindow,
	BrowserWindowSymbol,
	IAppDidLoadPageHandler,
	IAppWillLoadPageHandler,
	IPageDidMountHandler,
	IPageDidUnmountHandler,
	IPropsStore,
	IStructureAPI,
	LifeCycle,
	Props,
	StructureAPI,
	RegisterToUnmount,
} from '@wix/thunderbolt-symbols'
import { optional, withDependencies } from '@wix/thunderbolt-ioc'
import { PageProviderSymbol, IPageProvider } from 'feature-pages'
import { ComponentCssSym, PageTransitionsHandlerSymbol } from '../symbols'
import { IPageTransitionsHandler, IThunderboltCssComponentRenderer } from '../types'

export const PageMountUnmountSubscriber = withDependencies(
	[
		Props,
		StructureAPI,
		PageProviderSymbol,
		BrowserWindowSymbol,
		PageTransitionsHandlerSymbol,
		optional(ComponentCssSym),
	],
	(
		props: IPropsStore,
		structureApi: IStructureAPI,
		pageReflectorProvider: IPageProvider,
		window: BrowserWindow,
		pageTransitionHandler: IPageTransitionsHandler,
		ComponentCss?: IThunderboltCssComponentRenderer
	): IAppWillLoadPageHandler & RegisterToUnmount => {
		let dynamicllyRegisteredUnmountHandlers: Array<IPageDidUnmountHandler['pageDidUnmount']> = []
		return {
			name: 'pageMountUnmountSubscriber',
			registerToPageDidUnmount: (pageDidUnmount: IPageDidUnmountHandler['pageDidUnmount']) => {
				dynamicllyRegisteredUnmountHandlers.push(pageDidUnmount)
			},
			appWillLoadPage: async ({ pageId, contextId }) => {
				const pageReflector = await pageReflectorProvider(contextId, pageId)
				const pageDidMountHandlers = pageReflector.getAllImplementersOf<IPageDidMountHandler>(
					LifeCycle.PageDidMountHandler
				)
				const pageDidUnmountHandlers = pageReflector
					.getAllImplementersOf<IPageDidUnmountHandler>(LifeCycle.PageDidUnmountHandler)
					.map((m) => m.pageDidUnmount)

				const appDidLoadPageHandlers = pageReflector.getAllImplementersOf<IAppDidLoadPageHandler>(
					LifeCycle.AppDidLoadPageHandler
				)

				const triggerAppDidLoadPageHandlers = () =>
					appDidLoadPageHandlers.map((handler) => handler.appDidLoadPage({ pageId, contextId: contextId! }))

				const wrapperId = structureApi.getPageWrapperComponentId(pageId, contextId)
				props.update({
					[wrapperId]: {
						ComponentCss: ComponentCss?.render(pageId),
						pageDidMount: async (isMounted: boolean) => {
							await yieldToMain()
							if (isMounted) {
								if (!pageTransitionHandler.hasPageTransitions()) {
									triggerAppDidLoadPageHandlers()
								}

								const funcs = await Promise.all(
									pageDidMountHandlers.map((pageDidMountHandler) =>
										pageDidMountHandler.pageDidMount(pageId)
									)
								)

								const unsubscribeFuncs = funcs.filter((x) => x) as Array<
									Exclude<typeof funcs[number], void>
								>
								pageDidUnmountHandlers.push(...unsubscribeFuncs)
							} else if (window) {
								// Make sure all the descendants are unmounted (window is always defined on unmount flow)
								window.requestAnimationFrame(async () => {
									await Promise.all(
										[
											...dynamicllyRegisteredUnmountHandlers,
											...pageDidUnmountHandlers,
										].map((pageDidUnmount) => pageDidUnmount(pageId))
									)
									// TODO: verify if needed
									dynamicllyRegisteredUnmountHandlers = []
								})
							}
						},
					},
				})
			},
		}
	}
)
