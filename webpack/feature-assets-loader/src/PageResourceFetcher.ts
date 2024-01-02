import { withDependencies } from '@wix/thunderbolt-ioc'
import {
	BrowserWindowSymbol,
	CurrentRouteInfoSymbol,
	IPageResourceFetcher,
	SiteAssetsClientSym,
	ViewerModel,
	ViewerModelSym,
} from '@wix/thunderbolt-symbols'
import { SiteAssetsClientAdapter } from 'thunderbolt-site-assets-client'
import { errorPagesIds } from '@wix/thunderbolt-commons'
import { ICurrentRouteInfo } from 'feature-router'

export const resourceFetcher: (
	viewerModel: ViewerModel,
	siteAssetsClient: SiteAssetsClientAdapter,
	currentRouteInfo: ICurrentRouteInfo
) => IPageResourceFetcher = (viewerModel, siteAssetsClient, currentRouteInfo) => ({
	fetchResource(pageCompId, resourceType) {
		const {
			siteAssets: { modulesParams, siteScopeParams },
			mode: { siteAssetsFallback },
		} = viewerModel

		const moduleParams = modulesParams[resourceType]
		const isErrorPage = !!errorPagesIds[pageCompId]

		const pageJsonFileNames = siteScopeParams.pageJsonFileNames
		const pageJsonFileName =
			pageJsonFileNames[pageCompId] || currentRouteInfo.getCurrentRouteInfo()?.pageJsonFileName
		const customRouting = viewerModel.experiments['specs.thunderbolt.siteAssetsCustomRouting'] as string
		const bypassSsrInternalCache = viewerModel.experiments.bypassSsrInternalCache === true

		return siteAssetsClient.execute(
			{
				moduleParams,
				pageCompId,
				...(pageJsonFileName ? { pageJsonFileName } : {}),
				...(isErrorPage
					? {
							pageCompId: isErrorPage ? 'masterPage' : pageCompId,
							errorPageId: pageCompId,
							pageJsonFileName: pageJsonFileNames.masterPage,
					  }
					: {}),
				customRouting,
				bypassSsrInternalCache,
			},
			siteAssetsFallback
		)
	},
	getResourceUrl(pageCompId, resourceType): string {
		const {
			siteAssets: { modulesParams, siteScopeParams },
		} = viewerModel

		const moduleParams = modulesParams[resourceType]
		const isErrorPage = !!errorPagesIds[pageCompId]

		const pageJsonFileNames = siteScopeParams.pageJsonFileNames
		const pageJsonFileName =
			pageJsonFileNames[pageCompId] || currentRouteInfo.getCurrentRouteInfo()?.pageJsonFileName

		return siteAssetsClient.calcPublicModuleUrl({
			moduleParams,
			pageCompId,
			...(pageJsonFileName ? { pageJsonFileName } : {}),
			...(isErrorPage
				? {
						pageCompId: isErrorPage ? 'masterPage' : pageCompId,
						errorPageId: pageCompId,
						pageJsonFileName: pageJsonFileNames.masterPage,
				  }
				: {}),
		})
	},
})

export const PageResourceFetcher = withDependencies<IPageResourceFetcher>(
	[ViewerModelSym, SiteAssetsClientSym, CurrentRouteInfoSymbol, BrowserWindowSymbol],
	resourceFetcher
)
