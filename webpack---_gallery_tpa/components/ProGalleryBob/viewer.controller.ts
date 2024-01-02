import model from './model';
import { getGallery } from '@wix/ambassador-pro-gallery-v2-gallery/http';
import { State, Item } from '@wix/ambassador-pro-gallery-v2-gallery/types';

import { commonImagesToWixCode } from './converters';

export default model.createController(({ $w, $widget, flowAPI }) => {
  console.log('dd1d');
  return {
    pageReady: async () => {
      //  @ts-expect-error
      const { galleryId } = flowAPI.controllerConfig.config;
      const result = await flowAPI.httpClient.request(
        getGallery({
          galleryId,
          state: State.SAVED,
        }),
      );
      // convert to correct format //
      // set items
      $widget.fireEvent('widgetLoaded', {});
      $w('#proGallery1').items = commonImagesToWixCode(
        result.data.gallery?.items || [],
      );
    },
    exports: {},
  };
});
