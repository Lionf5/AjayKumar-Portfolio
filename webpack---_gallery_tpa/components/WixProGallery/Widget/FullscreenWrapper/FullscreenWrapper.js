import React from 'react';
import {
    CommonFullscreenWrapper
} from '@wix/common-pro-gallery-component-wrapper';
import loadable from '@wix/yoshi-flow-editor/loadable';
import '../../../../assets/dynamic/commonDynamicCss.global.scss';
import {
    experiments,
    GALLERY_v4_CONSTS
} from '@wix/photography-client-lib';

const FullscreenElementLoadable = loadable(
    () =>
    import (
        /* webpackChunkName: "pro-fullscreen-renderer" */
        '@wix/pro-fullscreen-renderer'
    ), {
        resolveComponent: (components) => components.ProFullscreen,
    },
);

export default class ProFullscreenWrapper extends CommonFullscreenWrapper {
    getFullscreenElement() {
        return FullscreenElementLoadable;
    }

    loadFullscreenModuleIfNeeded() {}

    getRenderElement() {
        const ProFullscreenElement = this.getFullscreenElement();
        const props = this.props;
        const pageUrl =
            experiments && experiments('specs.pro-gallery.itemDeeplinks') === 'true' ?
            props.pageUrl :
            null;

        const bgColorExpand =
            (props.options.bgColorExpand && props.options.bgColorExpand.value) || '';

        return ( <
            ProFullscreenElement { ...this.additionalProFullscreenProps()
            }
            id = {
                props.id
            }
            items = {
                props.items
            }
            initialIdx = {
                props.fullscreenIdx
            }
            totalItemsCount = {
                props.totalItemsCount
            }
            container = {
                this.state.container
            }
            locale = {
                props.locale
            }
            homeGalleryPageUrl = {
                pageUrl
            }
            styles = {
                props.options
            }
            isAccessible = {
                props.isAccessible
            }
            galleryId = {
                props.galleryId
            }
            viewMode = {
                props.viewMode
            }
            noFollowForSEO = {
                props.noFollowForSEO
            }
            eventsListener = {
                props.eventsListener
            }
            itemsLoveData = {
                props.itemsLoveData
            }
            deviceType = {
                props.deviceType
            }
            isPreview = {
                props.viewMode === GALLERY_v4_CONSTS.viewMode.PREVIEW
            }
            animationDuration = {
                props.animationDuration
            }
            shouldUseNewSocialSharePopup = {
                this.shouldUseNewSocialSharePopup
            }
            createMediaUrl = {
                props.createMediaUrl
            }
            staticMediaUrls = {
                props.staticMediaUrls
            }
            backgroundFilterElementSelector = {
                props.backgroundFilterElementSelector
            }
            fullscreenAnimating = {
                props.fullscreenAnimating
            }
            customComponents = {
                props.customComponents
            }
            isPrerenderMode = {
                props.isPrerenderMode
            }
            fallback = { <
                div
                className = "pro-fullscreen-wrapper-loading"
                style = {
                    {
                        backgroundColor: bgColorExpand,
                    }
                } >
                < /div>
            }
            />
        );
    }
}