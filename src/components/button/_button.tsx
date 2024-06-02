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

  /***** RENDER *****/
  switch (true) {
    case "href" in props: {
      const { href, intrinsic } = props
      const className = classNames("GUI__Button", "GUI__Button--link", _className)
      return createElement(anchor, { href, className, ...baseProps, ...intrinsic }, children);
    }
    case "onClick" in props: {
      const { onClick, type, intrinsic } = props
      const className = classNames("GUI__Button", "GUI__Button--button", _className)
      return createElement(button, { onClick, type, disabled, className, ...baseProps, ...intrinsic }, children);
    }
    case "type" in props && props.type === 'submit': {
      const { type, intrinsic } = props;
      const className = classNames("GUI__Button", "GUI__Button--submit", _className)
      return createElement(submitButton, { type, disabled, className, ...baseProps, ...intrinsic }, children);
    }
    case "to" in props: {
      const { to, intrinsic } = props
      const className = classNames("GUI__Button", "GUI__Button--link", _className)

      if (link === 'a') {
        return createElement(anchor, { href: to, className, ...baseProps, ...intrinsic }, children);
      }

      return createElement(link, { to, className, ...baseProps, ...intrinsic }, children);
    }
    default: {
      return null
    }
  }
}
