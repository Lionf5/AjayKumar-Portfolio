import React from 'react';
import {
    getWidgetWrapper
} from '@wix/yoshi-flow-editor/runtime/esm/WidgetWrapper.js';
import Widget from '/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/components/WixProGallery/Widget/index.tsx';

import {
    withStyles
} from '@wix/native-components-infra';



import {
    initI18n as initI18n
} from '@wix/yoshi-flow-editor/runtime/esm/i18next/init';



const multilingualDisabled = false;


import {
    createExperiments,
    createWidgetExperiments
} from '@wix/yoshi-flow-editor/runtime/esm/experiments';



import {
    I18nextProvider
} from '@wix/yoshi-flow-editor/i18n';


import {
    PureExperimentsProvider
} from '@wix/yoshi-flow-editor';
var ExperimentsProvider = React.Fragment;


import {
    BILoggerProvider
} from '@wix/yoshi-flow-editor/runtime/esm/react/BILogger/BILoggerProvider';

import {
    PanoramaProvider
} from '@wix/yoshi-flow-editor/runtime/esm/react/PanoramaProvider';

import {
    FedopsLoggerProvider
} from '@wix/yoshi-flow-editor/runtime/esm/react/FedopsLoggerProvider';

import {
    HttpProvider
} from '@wix/yoshi-flow-editor';

import {
    TPAComponentsProvider
} from 'wix-ui-tpa';

import {
    BaseUiEnvironmentProviderWrapper
} from '@wix/yoshi-flow-editor/runtime/esm/react/BaseUiEnvironmentProviderWrapper';

var providers = {
    I18nextProvider,
    ExperimentsProvider,
    PureExperimentsProvider,
    BILoggerProvider,
    FedopsLoggerProvider,
    PanoramaProvider,
    HttpProvider,
    TPAComponentsProvider,
    BaseUiEnvironmentProviderWrapper,
}




import * as usersStyleParamsEntry from '/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/components/WixProGallery/stylesParams.ts';
var stylesParamsEntry = usersStyleParamsEntry;
var stylesParams = stylesParamsEntry.default;
var customCssVars = stylesParamsEntry.customCssVars || function() {
    return {}
};



var styleHocConfig = {
    "enabled": true
};

var sentryConfig = {
    DSN: 'https://d2da005893e64a638a4aa6cb7f0dd60c@sentry.wixpress.com/3939',
    id: 'd2da005893e64a638a4aa6cb7f0dd60c',
    projectName: 'pro-gallery-tpa',
    teamName: 'photography',
    errorMonitor: true,
};

var translationsConfig = {
    "icuEnabled": true,
    "defaultTranslationsPath": "/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/assets/locales/messages_en.json",
    "availableLanguages": ["en", "uk"]
};

var UserComponent = getWidgetWrapper({
    initI18n,
    withStylesHoc: withStyles,
    createExperiments,
    createWidgetExperiments,
    providers,
}, Widget, {
    multilingualDisabled,
    sentryConfig,
    styleHocConfig,
    translationsConfig,
    stylesParams,
    customCssVars,
    componentId: '142bb34d-3439-576a-7118-683e690a1e0d',
    name: 'WixProGallery',
    withErrorBoundary: false,
    localeDistPath: 'components/WixProGallery/locales/widget',
});


import {
    hot
} from '@wix/component-hot-loader';
UserComponent = hot(module, UserComponent);


const loadChunks = Widget.loadChunks;

export default {

    loadableReady: process.env.browser ? require("@wix/yoshi-flow-editor/loadable").loadableReady : null,
    chunkLoadingGlobal: process.env.chunkLoadingGlobal,

    component: UserComponent,
    loadChunks
};