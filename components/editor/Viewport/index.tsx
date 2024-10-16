import { useEditor } from '@craftjs/core';
import cx from 'classnames';
import React, { useEffect } from 'react';
import { Allotment } from "allotment";

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toolbox } from './Toolbox';

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children, selector
}) => {
  const {
    enabled,
    connectors,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        '*'
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <div className="viewport">
      <div
        className={cx(['flex h-full overflow-hidden flex-row w-full fixed'])}
      >
        <Allotment>
          <Allotment.Pane maxSize={160}>
            <Toolbox />
          </Allotment.Pane>
          <Allotment.Pane preferredSize="60%">
            <div className={`page-container ${selector} flex flex-1 h-full flex-col`}>
              <Header/>
              <div
                className={cx([
                  'craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto',
                  {
                    'bg-renderer-gray': enabled,
                  },
                ])}
                ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
              >
                <div className="relative flex-col flex items-center pt-8">
                  {children}
                </div>
              </div>
            </div>
          </Allotment.Pane>
          <Allotment.Pane minSize={280} preferredSize="280px">
            <Sidebar />
          </Allotment.Pane>
        </Allotment>
       
      </div>
    </div>
  );
};
