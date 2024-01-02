import VersionManagerCore from './versionManager.js';
var minDate = -8640000000000000;
export default {
    fullscreen: [{
            version: VersionManagerCore.Versions.min,
            dateFrom: minDate,
        },
        {
            version: 'V2',
            dateFrom: Date.parse('2017-09-25T12:00:00.000Z'),
            description: 'Editor_Settings_Upgrade_Panel_Upgrade_Expand_Mode',
            affectsProGallery: true,
            affectsArtStore: false,
        },
    ],
    spacing: [{
            version: VersionManagerCore.Versions.min,
            dateFrom: minDate,
        },
        {
            version: 2,
            dateFrom: Date.parse('2017-08-29T11:27:29.000Z'),
            ignoreUserManuaUpdate: true,
        },
    ],
    layouts: [{
            version: VersionManagerCore.Versions.min,
            dateFrom: minDate,
        },
        {
            version: 2,
            dateFrom: Date.parse('2018-05-24T18:00:00.000Z'),
        },
    ],
    settings: [{
            version: VersionManagerCore.Versions.min,
            dateFrom: minDate,
        },
        {
            version: 2,
            dateFrom: Date.parse('2018-12-18T12:00:50.054Z'),
        },
    ],
};
//# sourceMappingURL=featuresList.js.map