import { useEditor } from '@craftjs/core';
import { Layers } from '@craftjs/layers';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Allotment } from "allotment";
import { SidebarItem } from './SidebarItem';

import CustomizeIcon from '../../../../public/icons/customize.svg';
import LayerIcon from '../../../../public/icons/layers.svg';
import { Toolbar } from '../../Toolbar';

export const SidebarDiv = styled.div<{ enabled: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.enabled ? 1 : 0)};
  background: #fff;
`;

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
   
      <SidebarDiv enabled={enabled} className="sidebar transition bg-white w-2">
      <div className="flex flex-col h-full">
        <Allotment vertical={true}>
          <div style={{overflow:'auto',height:'100%'}}>
            <SidebarItem
            icon={CustomizeIcon}
            title="Properties"
            visible={true}
            >
            </SidebarItem>
            <div className={'pt-11'}>
              <Toolbar />
            </div>
          </div>
          <div style={{overflow:'auto',height:'100%'}}>
            <SidebarItem
            icon={LayerIcon}
            title="Layers"
            visible={true}
            >
            </SidebarItem>
            <div className={'pt-11'} style={{overflow:'auto',height:'100%'}}>
              <Layers expandRootOnLoad={true} />
            </div>
          </div>
        </Allotment>
      </div>
    </SidebarDiv>

  );
};
