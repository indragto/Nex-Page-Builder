import { UserComponent, useNode } from '@craftjs/core';
import cx from 'classnames';
import React from 'react';

import { ButtonSettings } from './ButtonSettings';
import { generateRandomString } from 'utils/text';
import { Text } from '../Text';

type ButtonProps = {
  tailwindCss: string;
  background?: Record<'r' | 'g' | 'b' | 'a', number>;
  backgroundHover?: Record<'r' | 'g' | 'b' | 'a', number>;
  color?: Record<'r' | 'g' | 'b' | 'a', number>;
  colorHover?: Record<'r' | 'g' | 'b' | 'a', number>;
  buttonStyle?: string;
  margin?: any[];
  text?: string;
  textComponent?: any;
  radius?: number;
  overrideStyle?: string;
};


export const Button: UserComponent<ButtonProps> = (props: any) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { text, textComponent } = props;
  const borderColor = props.buttonStyle === 'outline' ? `rgba(${Object.values(props.background)})`: 'transparent';
  const bgColor = props.buttonStyle === 'full' ? `rgba(${Object.values(props.background)})` : 'transparent';
  const classControl = generateRandomString(5);
  return (
    <div className='w-full'>
        <button
        ref={connect}
        className={cx([
          `${props.tailwindCss}`,
          {
            'shadow-lg': props.buttonStyle === 'full',
          },
          `${classControl}`
        ])}
        style={props.overrideStyle === 'no' ? { 
          backgroundColor: `${bgColor}`,
          margin: `${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`,
          border: `2px solid transparent`,
          borderColor: `${borderColor}`,
          borderRadius: `${props.radius}px`,
        } : null}
      >
        <Text {...textComponent} text={text} color={props.color} />
      </button>
      {props.overrideStyle === 'no' && (
        <style jsx>{`
          .${classControl}:hover {
            background-color:red !important;
          }
        `}</style>
      )}
    </div>
    
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    tailwindCss: 'rounded w-full px-4 py-2',
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    backgroundHover: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    colorHover: { r: 92, g: 90, b: 90, a: 1 },
    buttonStyle: 'full',
    text: 'Button',
    margin: ['5', '0', '5', '0'],
    radius: 0,
    textComponent: {
      ...Text.craft.props,
      textAlign: 'center',
    },
    overrideStyle: 'no'
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ButtonSettings,
  },
};
