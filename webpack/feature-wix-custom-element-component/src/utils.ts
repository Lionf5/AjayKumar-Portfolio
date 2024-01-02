import { WixCustomElementComponentSiteConfig } from './types'

export const generateWixCodeUrl = ({
	wixCodeBundlersUrlData,
	url: fileUrl,
	cacheKillerCounter,
	appDefId = '',
}: {
	wixCodeBundlersUrlData: WixCustomElementComponentSiteConfig['wixCodeBundlersUrlData']
	url: string
	cacheKillerCounter?: number
	appDefId?: string
}) => {
	const { url, queryParams } =
		wixCodeBundlersUrlData.appDefIdToWixCodeBundlerUrlData[appDefId] ?? wixCodeBundlersUrlData

	const head = url + fileUrl.replace('public/', '')
	const tail = [
		'no-umd=true',
		queryParams,
		typeof cacheKillerCounter === 'undefined' ? '' : `cacheKiller=${cacheKillerCounter}`,
	]
		.filter((v) => v !== '')
		.join('&')
	return `${head}?${tail}`
}
