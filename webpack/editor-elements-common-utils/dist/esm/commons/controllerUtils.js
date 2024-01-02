export const getValidationControllerProps = (updateProps) => {
    return {
        onValueChange: value => {
            updateProps({
                value
            });
        },
        setValidityIndication: shouldShowValidityIndication => {
            updateProps({
                shouldShowValidityIndication
            });
        },
    };
};
export const getSocialUrl = ({
    urlFormat,
    isMasterPage,
    pageId,
    relativeUrl,
    externalBaseUrl,
    isHttpsEnabled,
    currentUrl,
}) => {
    if (urlFormat === 'hashBang') {
        const [, pageUriSeo, ...additionalUrlParts] = relativeUrl.split('/');
        const additionalUrl = additionalUrlParts.length ?
            `/${additionalUrlParts.join('/')}` :
            '';
        // Replace domain to the old wix.com domain
        const oldBaseUrls = externalBaseUrl.replace('wixsite.com', 'wix.com');
        const url = new URL(`${oldBaseUrls}`);
        url.protocol = isHttpsEnabled ? 'https:' : 'http:';
        if ((!isMasterPage && pageUriSeo) || !pageId) {
            url.hash = `!${pageUriSeo}/${pageId}${additionalUrl}`;
        }
        return url.toString();
    }
    const url = new URL(currentUrl);
    url.protocol = isHttpsEnabled ? 'https:' : 'http:';
    url.search = '';
    url.hash = '';
    return url.toString().replace(/\/$/, '');
};
//# sourceMappingURL=controllerUtils.js.map