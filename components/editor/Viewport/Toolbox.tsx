import { Element, useEditor } from '@craftjs/core';
import { Tooltip } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import ButtonSvg from '../../../public/icons/toolbox/button-cmp.svg';
import SquareSvg from '../../../public/icons/toolbox/container-cmp-black.svg';
import TypeSvg from '../../../public/icons/toolbox/text-cmp.svg';
import YoutubeSvg from '../../../public/icons/toolbox/youtube-cmp.svg';
import ImageSvg from '../../../public/icons/toolbox/image-cmp.svg';
import LinkSvg from '../../../public/icons/toolbox/link-cmp.svg';
import MapSvg from '../../../public/icons/toolbox/map-cmp.svg';
import { Button } from '../../selectors/Button';
import { Container } from '../../selectors/Container';
import { Text } from '../../selectors/Text';
import { Video } from '../../selectors/Video';
import { Image } from '../../selectors/Image';

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
`;

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 60px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition w-40 h-full bg-dark overflow-y-auto pb-60" 
    >
      <div className="items-center pt-3 pl-3 pr-3">
        <div className="text-white text-center pb-3 bg-dark w-full"><h3>Components</h3></div>
        <div className="toolbox-item-container"
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Tooltip title="Container" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <SquareSvg />
            </Item>
          </Tooltip>
        </div>
        <div className="toolbox-item-container"
          ref={(ref) =>
            create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <Tooltip title="Text" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <TypeSvg />
            </Item>
          </Tooltip>
        </div>
        <div className="toolbox-item-container" ref={(ref) => create(ref, <Button />)}>
          <Tooltip title="Button" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <ButtonSvg />
            </Item>
          </Tooltip>
        </div>
        <div className="toolbox-item-container" ref={(ref) => create(ref, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <YoutubeSvg />
            </Item>
          </Tooltip>
        </div>
        <div className="toolbox-item-container" ref={(ref) => create(ref, <Image />)}>
          <Tooltip title="Image" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <ImageSvg />
            </Item>
          </Tooltip>
        </div>
        <div className="toolbox-item-container" ref={(ref) => create(ref, <Image />)}>
          <Tooltip title="Image" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <LinkSvg />
            </Item>
          </Tooltip>
        </div>
        <div className="toolbox-item-container" ref={(ref) => create(ref, <Image />)}>
          <Tooltip title="Image" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <MapSvg />
            </Item>
          </Tooltip>
        </div>
        <div className="toolbox-item-container" ref={(ref) => create(ref, <Image />)}>
          <Tooltip title="Image" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <MapSvg />
            </Item>
          </Tooltip>
        </div>
        <div className="toolbox-item-container" ref={(ref) => create(ref, <Image />)}>
          <Tooltip title="Image" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <MapSvg />
            </Item>
          </Tooltip>
        </div>
      </div>
    </ToolboxDiv>
  );
};
