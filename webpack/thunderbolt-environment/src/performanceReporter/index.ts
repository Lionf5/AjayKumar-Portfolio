import { IPerfReporter, IPerfReporterApi } from '@wix/thunderbolt-symbols'
import { Pulse } from '@wix/pulse'
// import { getClosestCompIdByHtmlElement } from "@wix/thunderbolt-commons";

export const createPerfReporter = ({
	logger,
	sessionId,
	msid,
	vsi,
}: Omit<IPerfReporter, 'getHtmlElementMetadata'>): IPerfReporterApi => {
	const pulse = new Pulse({
		platform: 'viewer',
		biLogger: logger,
		sessionId,
		msid,
		vsi,
		// TODO - pass this function (waiting for compId to be added to the schema)
		// getHtmlElementMetadata: () => {
		// 	 return { compId: getClosestCompIdByHtmlElement(htmlElement) }
		// 	return {}
		// },
	})

	return {
		update: ({ getHtmlElementMetadata }) => {
			pulse.update({
				getHtmlElementMetadata: (htmlElement) => {
					const elementMetadata = getHtmlElementMetadata(htmlElement)
					return {
						compType: elementMetadata.compType,
						widgetId: elementMetadata.widgetId,
						applicationId: elementMetadata.appDefinitionId,
					}
				},
			})
		},
	}
}
