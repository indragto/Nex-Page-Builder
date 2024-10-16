import { useNode, useEditor } from '@craftjs/core';
import React from 'react';

import { ImageSettings } from './ImageSettings';
import { Height } from '@material-ui/icons';


export const Image = (props: any) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { imageSrc, width, height } = props;

  return (
    <div ref={connect} style={{ textAlign: 'center' }}>
      <img src={imageSrc} style={{ width: width, height: height }} />
    </div>
  );
};

Image.craft = {
  displayName: 'Image',
  props: {
    imageSrc: 'https://via.placeholder.com/100',
    width: '100%',
    height: '100%',
  },
  related: {
    toolbar: ImageSettings,
  },
};
