import {
  State,
  Item,
  ImageType,
} from '@wix/ambassador-pro-gallery-v2-gallery/types';

export const commonImagesToWixCode = (items: Item[]) => {
  const wixCodeItems = items?.map((item?: Item) => {
    if (item?.image) {
      const imageInfo = item?.image?.imageInfo;
      return {
        type: 'image',
        title: item?.title || imageInfo?.altText,
        description: item?.description || '',
        alt: item?.title,
        // @ts-expect-error
        projectSlug: item.projectSlug,
        // @ts-expect-error
        collectionSlug: item.collectionSlug,
        link: item?.link?.url,
        imageToken: item?.image?.token,
        src:
          item?.image?.type === ImageType.EXTERNAL
            ? `${imageInfo?.url}#originWidth=${imageInfo?.width}&originHeight=${imageInfo?.height}`
            : `wix:image://v1/${imageInfo?.filename}/${imageInfo?.filename}#originWidth=${imageInfo?.width}&originHeight=${imageInfo?.height}`,
        settings: item.image.focalPoint
          ? { focalPoint: [item.image.focalPoint.x, item.image.focalPoint.y] }
          : {},
      };
    } else if (item?.text) {
      return {
        type: 'text',
        title: item?.title,
        description: item?.description,
        imageToken: '',
        html: item?.text?.html,
        editorHtml: item?.text?.editorHtml,
        style: {
          fillColor: item?.text?.css?.backgroundColor,
          ...item?.text?.css,
        },
        width: item?.text?.css?.width,
        height: item?.text?.css?.height,
        // @ts-expect-error
        projectSlug: item.projectSlug,
        // @ts-expect-error1
        collectionSlug: item.collectionSlug,
        src: '',
        link: item?.link?.url,
      };
    } else {
      const videoInfo = item?.video?.videoInfo;
      const videoPoster = videoInfo?.posters && videoInfo?.posters[0];
      return {
        type: 'video',
        title: item?.title || videoInfo?.filename,
        description: item?.description || '',
        imageToken: '',
        link: item?.link?.url,
        // @ts-expect-error
        projectSlug: item.projectSlug,
        // @ts-expect-error1
        collectionSlug: item.collectionSlug,
        src: `wix:video://v1/${videoInfo?.filename}/_#posterUri=${videoPoster?.id}&posterWidth=${videoPoster?.width}&posterHeight=${videoPoster?.height}`,
      };
    }
  });
  return wixCodeItems;
};
