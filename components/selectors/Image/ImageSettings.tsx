import React from 'react';

import { ToolbarSection, ToolbarItem } from '../../editor';

export const ImageSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection title="Image">
        <ToolbarItem
          full={true}
          propKey="imageSrc"
          type="text"
          label="Image Url"
        />
      </ToolbarSection>
      <ToolbarSection
        title="Dimensions"
        props={['width', 'height']}
        summary={({ width, height }: any) => {
          return `${width || 0} x ${height || 0}`;
        }}
      >
        <ToolbarItem propKey="width" type="text" label="Width" />
        <ToolbarItem propKey="height" type="text" label="Height" />
      </ToolbarSection>
    </React.Fragment>
  );
};
