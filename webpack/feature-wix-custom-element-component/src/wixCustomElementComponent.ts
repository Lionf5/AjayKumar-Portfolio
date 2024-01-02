import _ from 'lodash'
import { withDependencies, named, optional } from '@wix/thunderbolt-ioc'
import {
	PageFeatureConfigSymbol,
	IPageWillMountHandler,
	BrowserWindowSymbol,
	BrowserWindow,
	IPropsStore,
	Props,
} from '@wix/thunderbolt-symbols'
import { isSSR } from '@wix/thunderbolt-commons'
import type { WixCustomElementComponentPageConfig, IWixCustomElementComponent } from './types'
import { name, WixCustomElementComponentAPISymbol } from './symbols'

export const WixCustomElementComponent = withDependencies(
	[named(PageFeatureConfigSymbol, name), BrowserWindowSymbol, Props, optional(WixCustomElementComponentAPISymbol)],
	(
		pageFeatureConfig: WixCustomElementComponentPageConfig,
		window: BrowserWindow,
		propsStore: IPropsStore,
		customElementComponentAPI?: IWixCustomElementComponent
	): IPageWillMountHandler => {
		return {
			name: 'wixCustomElementComponent',
			async pageWillMount() {
				const isInSeoAndSsrFlow = isSSR(window) && pageFeatureConfig.isInSeo

				if (!customElementComponentAPI) {
					return // site feature was not loaded, see it's predicate
				}

				const updateObj: Record<string, any> = _.chain(pageFeatureConfig.customElements)
					.keyBy('compId')
					.mapValues((customElement) => ({
						isInSeo: isInSeoAndSsrFlow,
						isEnabled: customElementComponentAPI.isCustomElementEnabled(customElement.widgetId),
					}))
					.value()

				propsStore.update(updateObj)

				if (isSSR(window)) {
					return
				}

				await customElementComponentAPI.loadCustomElementsScripts(pageFeatureConfig.customElements)
			},
		}
	}
)
