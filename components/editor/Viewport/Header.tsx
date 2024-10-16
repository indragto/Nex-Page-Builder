import { useEditor } from '@craftjs/core';
import { Tooltip } from '@material-ui/core';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import { saveAs } from 'file-saver';
import { Editor, Frame, Element } from '@craftjs/core';


import { Container, Text } from '../../../components/selectors';
import { Button } from '../../../components/selectors/Button';
import { Custom1, OnlyButtons } from '../../../components/selectors/Custom1';
import { Custom2, Custom2VideoDrop } from '../../../components/selectors/Custom2';
import { Custom3, Custom3BtnDrop } from '../../../components/selectors/Custom3';
import { Video } from '../../../components/selectors/Video';
import { Image } from '../../../components/selectors/Image';


import Checkmark from '../../../public/icons/check.svg';
import Customize from '../../../public/icons/customize.svg';
import RedoSvg from '../../../public/icons/toolbox/redo.svg';
import UndoSvg from '../../../public/icons/toolbox/undo.svg';

import { downloadAsJson } from 'utils/exporter';

const HeaderDiv = styled.div`
  width: 100%;
  height: 45px;
  z-index: 99999;
  position: relative;
  padding: 0px 10px;
  background: #323639;
  display: flex;
`;

const Btn = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  svg {
    margin-right: 6px;
    width: 12px;
    height: 12px;
    fill: #fff;
    opacity: 0.9;
  }
`;

const Item = styled.a<{ disabled?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: #707070;
  }
  ${(props) =>
    props.disabled &&
    `
    opacity:0.5;
    cursor: not-allowed;
  `}
`;

export const Header = () => {

  const { enabled, canUndo, canRedo, actions, query } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const handleExportHTML = () => {
    const editorState = query.getSerializedNodes(); // Get editor state
    const htmlContent = ReactDOMServer.renderToStaticMarkup(<Editor enabled={false} resolver={{
      Container,
      Text,
      Custom1,
      Custom2,
      Custom2VideoDrop,
      Custom3,
      Custom3BtnDrop,
      OnlyButtons,
      Button,
      Video,
      Image
    }}>
      <Frame json={JSON.stringify(editorState)} />
    </Editor>);
    
    const htmlPage = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Page</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body style="background: #363636;">
        <div class="h-full h-screen">
        ${htmlContent}
        </div>
      </body>
      </html>
    `;

    // Save the HTML as a file
    const blob = new Blob([htmlPage], { type: 'text/html' });
    saveAs(blob, 'template.html');
  };

  return (
    <HeaderDiv className="header text-white transition w-full">
      <div className="items-center flex w-full px-4 justify-end">
        {enabled && (
          <div className="flex-1 flex">
            <Tooltip title="Undo" placement="bottom">
              <Item disabled={!canUndo} onClick={() => actions.history.undo()}>
                <UndoSvg />
              </Item>
            </Tooltip>
            <Tooltip title="Redo" placement="bottom">
              <Item disabled={!canRedo} onClick={() => actions.history.redo()}>
                <RedoSvg />
              </Item>
            </Tooltip>
          </div>
        )}
        <div className="flex">
          <Btn
            className={cx([
              'transition cursor-pointer',
              {
                'bg-green-400': enabled,
                'bg-primary': !enabled,
              },
            ])}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
          >
            {enabled ? <Checkmark /> : <Customize />}
            {enabled ? 'Finish Editing' : 'Edit'}
          </Btn>

          {!enabled && (
         
            <Btn
              className={'transition cursor-pointer bg-green-400 ml-2'}
              onClick={() => {
                downloadAsJson(query.serialize(),'template.json');
              }}
            >
            Save As Json
            </Btn>
          
          )}
          {!enabled && (
         
            <Btn
              className={'transition cursor-pointer bg-green-400 ml-2'}
              onClick={() => {
                handleExportHTML();
              }}
            >
            Save As Html
            </Btn>
          
          )}
        </div>
        
      </div>
    </HeaderDiv>
  );
};
