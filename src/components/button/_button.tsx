/***** BASE IMPORTS *****/
import React, { createElement, CSSProperties } from "react"
import classNames from "classnames";

/***** CONSTS *****/
import "./_Button.scss";
import { GUI_ButtonProps } from "./types";

/***** TYPE DEFINTIONS *****/
export namespace NButton {
  type BaseProps = {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;

    /**
     * The size of the button
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * If true, the button will take up the full width of the parent container
     */
    full?: boolean;

    /**
     * If true, the button will be disabled. Note that this does not have an alternative appearance as per discords theming
     */
    disabled?: boolean;
  }

  export type OnClickProps = BaseProps & {
    onClick: () => void;
    type?: 'button' | 'reset'; 
  }

  export type SubmitProps = BaseProps & {
    type?: 'submit';
  }

  export type HrefProps = BaseProps & {
    href: string;
  }

  export type ToProps = BaseProps & {
    to: string;
  }

  export type Props = OnClickProps | HrefProps | ToProps | SubmitProps
}

const defaultComponents = {
  link: "a",
  anchor: "a",
  button: "button",
  submitButton: "button"
}

/***** COMPONENT START *****/
/**
 * Button component providing the base functionality for a button, link, or anchor tag.
 * The styling for the Anchor and Link tag are provided as compound components to the Button
 */
export const _Button: React.FC<GUI_ButtonProps> = ({ 
  children, 
  className: _className,
  disabled,
  components = defaultComponents,
  ...props 
}) => {
  const {
    anchor = defaultComponents.anchor,
    button = defaultComponents.button,
    link = defaultComponents.anchor,
    submitButton = defaultComponents.button
  } = components;

  const baseProps = {
    tabIndex: 0,
    "aria-disabled": disabled 
  }

  const createClassName = (className: string): string => {
    return classNames("GUI__Button", className, _className)
  }

  const createProps = <P,>(props: any, className: string): P => {
    return {
      ...props,
      ...baseProps,
      className: createClassName(className)
    }
  }

  /***** RENDER *****/
  switch (true) {
    case "href" in props: {
      return createElement(anchor, createProps<NButton.HrefProps>(props, "GUI__Button--link"), children);
    }
    case "onClick" in props: {
      return createElement(button, createProps<NButton.OnClickProps>(props, "GUI__Button--button"), children);
    }
    case "type" in props && props.type === 'submit': {
      return createElement(submitButton, createProps<NButton.SubmitProps>(props, "GUI__Button--submit"), children);
    }
    case "to" in props: {
      if (link === 'a') {
        return createElement(anchor, createProps<NButton.HrefProps>({ ...props, href: props.to }, "GUI__Button--link"), children);
      }

      return createElement(link, createProps<NButton.ToProps>(props, "GUI__Button--link"), children);
    }
    default: {
      return null
    }
  }
}
