import userController from '/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/components/WixProGallery/controller.ts';
import createControllerWrapper from '@wix/yoshi-flow-editor/runtime/esm/pureControllerWrapper.js';


import wrapController from '@wix/yoshi-flow-editor-runtime/internal/viewerScript/ooi';



var createHttpClient = null;



import {
    initI18n as initI18n
} from '@wix/yoshi-flow-editor/runtime/esm/i18next/init';



const multilingualDisabled = false;



var createExperiments = null;
var createWidgetExperiments = null;



var sentryConfig = {
    DSN: 'https://d2da005893e64a638a4aa6cb7f0dd60c@sentry.wixpress.com/3939',
    id: 'd2da005893e64a638a4aa6cb7f0dd60c',
    projectName: 'pro-gallery-tpa',
    teamName: 'photography',
    errorMonitor: true,
};

var experimentsConfig = {
    "scopes": ["pro-gallery"],
    "centralized": true
};

var translationsConfig = {
    "icuEnabled": true,
    "defaultTranslationsPath": "/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/assets/locales/messages_en.json",
    "availableLanguages": ["en", "uk"]
};

var biConfig = null;

var defaultTranslations = {
    "Accessibility_Tooltip": "Use the keyboard arrows to navigate through the gallery.",
    "Accessibility_Left_Gallery": "Out of gallery",
    "Acessibility_Gallery_Navigate": "Press the Enter key and then use the arrow keys to navigate through the gallery. ",
    "Gallery_Empty_Title": "Add your images,",
    "Gallery_Empty_Title2": "video and text.",
    "Gallery_Empty_Description": "Start adding media to this gallery.",
    "Gallery_Empty_Description2": "Click Manage Media to get started"
};

var fedopsConfig = null;

import {
    createVisitorBILogger as biLogger
} from '/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/target/generated/bi/createBILogger.ts';

const controllerOptions = {
    sentryConfig,
    biConfig,
    fedopsConfig,
    experimentsConfig,
    biLogger,
    translationsConfig,
    persistentAcrossPages: false,
    appName: "Wix Pro Gallery",
    componentName: "WixProGallery",
    appDefinitionId: "14271d6f-ba62-d045-549b-ab972ae1f70e",
    componentId: "142bb34d-3439-576a-7118-683e690a1e0d",
    projectName: "pro-gallery-tpa",
    defaultTranslations,
    multilingualDisabled,
    shouldUseEssentials: true,
    withErrorBoundary: false,
    localeDistPath: "components/WixProGallery/locales/widget"
};

const _controller = createControllerWrapper(userController, controllerOptions, {
    initI18n,
    createHttpClient,
    createExperiments,
});

export const wrap = wrapController;
export const descriptor = {
    ...controllerOptions,
    id: controllerOptions.componentId,
    widgetType: "WIDGET_OUT_OF_IFRAME",
    controllerFileName: "/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/components/WixProGallery/controller.ts",
};

export const controller = _controller
export default controller;