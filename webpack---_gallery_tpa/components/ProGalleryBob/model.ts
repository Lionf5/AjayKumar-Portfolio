import {
  createBlocksModel,
  WidgetPropertyType,
} from '@wix/yoshi-flow-editor/blocks';

/*
  Place where blocks model is initialized.
  Blocks model allows you to define your Widget Public APIs in a single place.
  It will automatically provide `getExports` for Editor Script and provide typings based on the model for Viewer Script (via model.createController).
*/
export default createBlocksModel({
  widgetName: 'ProGalleryBob',
  props: {
    // Here you can define your widget props
    myProp: {
      type: WidgetPropertyType.STRING,
    },
  },
  methods: {
    // Here you can define your widget public props
  },
  events: {
    // Here you can define events your widget will subscribe to
    widgetLoaded: {
      description: 'Fired when Widget loaded',
    },
  },
});
