import {
    createControllersWithDescriptors,
    initAppForPageWrapper
} from '@wix/yoshi-flow-editor/runtime/esm/viewerScript/wrapper.js';



import wrapController0 from '@wix/yoshi-flow-editor-runtime/internal/viewerScript/blocks';

import controller0 from '/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/components/ProGalleryBob/viewer.controller.ts';
import * as _controllerExport0 from '/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/components/ProGalleryBob/model.ts';
var controllerExport0 = _controllerExport0;




import * as viewerApp from '/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/viewer.app.ts';
var importedApp = viewerApp;




var velocycleMobx = null;





import {
    blocksControllerService
} from '@wix/yoshi-flow-editor/runtime/esm/blocks/controllerService'



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

var defaultTranslations = {
    "app.widget.welcome": "Welcome",
    "app.settings.label": "Configure Widget",
    "app.settings.tabs.main": "Main",
    "app.settings.tabs.design": "Design",
    "app.settings.defaults.greetingsPretext": "to"
};

var fedopsConfig = null;

import {
    createVisitorBILogger as biLogger
} from '/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/target/generated/bi/createBILogger.ts';

export const exports = importedApp.exports;

export const initAppForPage = initAppForPageWrapper({
    initAppForPage: importedApp.initAppForPage,
    sentryConfig: sentryConfig,
    experimentsConfig: experimentsConfig,
    inEditor: false,
    biLogger: biLogger,
    multilingualDisabled,
    projectName: "pro-gallery-tpa",
    biConfig: null,
    appName: "Wix Pro Gallery",
    appDefinitionId: "14271d6f-ba62-d045-549b-ab972ae1f70e",
    fedopsConfig: fedopsConfig,
    translationsConfig: translationsConfig,
    defaultTranslations: defaultTranslations,
    shouldUseEssentials: true,
    optionalDeps: {
        initI18n,
        createHttpClient,
        createExperiments,
    },
    localeDistPath: "assets/locales",
});

const _createControllers = createControllersWithDescriptors({
        initI18n,
        blocksControllerService,
        createHttpClient,
        createExperiments,
        velocycleMobx,
    }, [{
        method: controller0,
        wrap: wrapController0,
        exports: controllerExport0,
        widgetType: "BLOCKS_WIDGET",
        translationsConfig,
        multilingualDisabled,
        experimentsConfig: {
            "scopes": ["pro-gallery"],
            "centralized": true
        },
        fedopsConfig: fedopsConfig,
        sentryConfig: sentryConfig,
        persistentAcrossPages: false,
        biLogger: biLogger,
        shouldUseEssentials: true,
        withErrorBoundary: false,
        biConfig: null,
        controllerFileName: "/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/components/ProGalleryBob/viewer.controller.ts",
        appName: "Wix Pro Gallery",
        appDefinitionId: "14271d6f-ba62-d045-549b-ab972ae1f70e",
        projectName: "pro-gallery-tpa",
        componentName: "ProGalleryBob",
        localeDistPath: "assets/locales",
        defaultTranslations: defaultTranslations,
        id: "14271d6f-ba62-d045-549b-ab972ae1f70e-myzur"
    }, {
        method: null,
        wrap: null,
        exports: null,
        widgetType: "WIDGET_OUT_OF_IFRAME",
        translationsConfig,
        multilingualDisabled,
        experimentsConfig: {
            "scopes": ["pro-gallery"],
            "centralized": true
        },
        fedopsConfig: fedopsConfig,
        sentryConfig: sentryConfig,
        persistentAcrossPages: false,
        biLogger: biLogger,
        shouldUseEssentials: true,
        withErrorBoundary: false,
        biConfig: null,
        controllerFileName: "/home/builduser/work/acf1b19a5d9e1adb/packages/pro-gallery-tpa/src/components/WixProGallery/controller.ts",
        appName: "Wix Pro Gallery",
        appDefinitionId: "14271d6f-ba62-d045-549b-ab972ae1f70e",
        projectName: "pro-gallery-tpa",
        componentName: "WixProGallery",
        localeDistPath: "components/WixProGallery/locales/widget",
        defaultTranslations: {
            "Accessibility_Tooltip": "Use the keyboard arrows to navigate through the gallery.",
            "Accessibility_Left_Gallery": "Out of gallery",
            "Acessibility_Gallery_Navigate": "Press the Enter key and then use the arrow keys to navigate through the gallery. ",
            "Gallery_Empty_Title": "Add your images,",
            "Gallery_Empty_Title2": "video and text.",
            "Gallery_Empty_Description": "Start adding media to this gallery.",
            "Gallery_Empty_Description2": "Click Manage Media to get started"
        },
        id: "142bb34d-3439-576a-7118-683e690a1e0d"
    }],
    false);

export const createControllers = _createControllers