import { optional, withDependencies } from '@wix/thunderbolt-ioc'
import {
	IAppDidMountHandler,
	ILogger,
	IPerfReporterApi,
	IStructureAPI,
	LoggerSymbol,
	PerfReporterSymbol,
	Structure,
	ViewerModel,
	ViewerModelSym,
} from '@wix/thunderbolt-symbols'
import { FeaturesLoaderSymbol, ILoadFeatures } from '@wix/thunderbolt-features'
import { OOICompDataSymbol, IOOICompData } from 'feature-ooi-tpa-shared-config'
import { getClosestCompIdByHtmlElement } from '@wix/thunderbolt-commons'

export default withDependencies<IAppDidMountHandler>(
	[
		FeaturesLoaderSymbol,
		ViewerModelSym,
		LoggerSymbol,
		Structure,
		optional(PerfReporterSymbol),
		optional(OOICompDataSymbol),
	],
	(
		featuresLoader: ILoadFeatures,
		viewerModel: ViewerModel,
		logger: ILogger,
		structureApi: IStructureAPI,
		perfReporter?: IPerfReporterApi,
		ooiCompData?: IOOICompData
	) => ({
		appDidMount: async () => {
			try {
				if (perfReporter) {
					const getCompDataByHtmlElement = (element: HTMLElement) => {
						const compId = getClosestCompIdByHtmlElement(element)
						if (!compId) {
							return { compType: 'not_found' }
						}
						const compData = structureApi.get(compId)
						const basicData = { compType: compData.componentType }
						if (compData.componentType === 'tpaWidgetNative') {
							const ooiData = ooiCompData?.getCompDataByCompId(compId)
							return {
								widgetId: ooiData?.widgetId,
								appDefinitionId: ooiData?.appDefinitionId,
								...basicData,
							}
						}
						return basicData
					}

					perfReporter.update({ getHtmlElementMetadata: getCompDataByHtmlElement })
				}

				const features = [...featuresLoader.getLoadedPageFeatures(), ...viewerModel.siteFeatures]
				const components = Object.values(structureApi.getEntireStore()).map((item) => item.componentType)
				logger.meter(`page_features_loaded`, {
					customParams: {
						features,
						components,
					},
				})
			} catch {}
		},
	})
)
