import { AnchorHTMLAttributes } from "react";

export type _AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export type _ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type _SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type _LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

/*********************************************************************************************
 * FINISHED BUTTON TYPES
 *********************************************************************************************/
export type BaseProps<
  TLinkProps = _LinkProps,
  TAnchorProps = _AnchorProps,
  TButtonProps = _ButtonProps,
  TSubmitButtonProps = _SubmitButtonProps
> = {
  /**
   * The content of the button.
   */
  children: React.ReactNode;

  /**
   * Optional classname to add to the button.
   */
  className?: string;

  /**
   * If true, the button will be disabled, preventing any interaction and applying conditional styling.
   */
  disabled?: boolean;

  /**
   * Optional props to pass to the underlying element.
   */
  intrinsic?: 
    | NoInfer<TLinkProps> 
    | NoInfer<TAnchorProps> 
    | NoInfer<TButtonProps> 
    | NoInfer<TSubmitButtonProps>;

  /**
   * To maintain a router agnostic implementation, underlying components such as router specific "Link" tag can be provided a new, override element,
   * such as "a" or "button".
   * 
   * This allows the button to be customized in any abstraction to render an alternative underlying component when necessary.
   */
  components?: {

    /**
     * The component to use for the link tag. If this is not provided, an Anchor tag will be used instead.
     */
    link?: React.ComponentType<TLinkProps>;

    /**
     * The component to use for the anchor tag. If this is not provided, an Anchor tag will be used instead.
     */
    anchor?: React.ComponentType<TAnchorProps>;

    /**
     * The component to use for the button tag. If this is not provided, a Button tag will be used instead.
     */
    button?: React.ComponentType<TButtonProps>;

    /**
     * The component to use for the submit button tag. If this is not provided, a Button tag will be used instead.
     */
    submitButton?: React.ComponentType<TSubmitButtonProps>;

  }
}

export type OnClickProps<
  TLinkProps = _LinkProps,
  TAnchorProps = _AnchorProps,
  TButtonProps = _ButtonProps,
  TSubmitButtonProps = _SubmitButtonProps
> = {
  onClick: () => void;
  type?: 'button' | 'reset'; 
  intrinsic?: NoInfer<TButtonProps>
} & Omit<
  BaseProps<
    TLinkProps, 
    TAnchorProps, 
    TButtonProps, 
    TSubmitButtonProps
  >, 'intrinsic'
>

export type SubmitProps<
  TLinkProps = _LinkProps,
  TAnchorProps = _AnchorProps,
  TButtonProps = _ButtonProps,
  TSubmitButtonProps = _SubmitButtonProps
> = {
  type?: 'submit';
  intrinsic?: NoInfer<TSubmitButtonProps>
} & Omit<
  BaseProps<
    TLinkProps, 
    TAnchorProps, 
    TButtonProps, 
    TSubmitButtonProps
  >, 'intrinsic'
>

export type HrefProps<
  TLinkProps = _LinkProps,
  TAnchorProps = _AnchorProps,
  TButtonProps = _ButtonProps,
  TSubmitButtonProps = _SubmitButtonProps
> = {
  href: string;
  intrinsic?: NoInfer<TAnchorProps>;
} & Omit<
  BaseProps<
    TLinkProps, 
    TAnchorProps, 
    TButtonProps, 
    TSubmitButtonProps
  >, 'intrinsic'
>

export type ToProps<
  TLinkProps = _LinkProps,
  TAnchorProps = _AnchorProps,
  TButtonProps = _ButtonProps,
  TSubmitButtonProps = _SubmitButtonProps
> = {
  to: string;
  intrinsic?: NoInfer<TLinkProps>;
} & Omit<
  BaseProps<
    TLinkProps, 
    TAnchorProps, 
    TButtonProps, 
    TSubmitButtonProps
  >, 'intrinsic'
>

export type GUI_ButtonProps<
  TLinkProps = _LinkProps,
  TAnchorProps = _AnchorProps,
  TButtonProps = _ButtonProps,
  TSubmitButtonProps = _SubmitButtonProps
> =
  | OnClickProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>
  | HrefProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>
  | ToProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>
  | SubmitProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>

/*********************************************************************************************
 * CREATE BUTTON PROPS
 *********************************************************************************************/
export type ReturnedButton<
  TLinkProps,
  TAnchorProps,
  TButtonProps,
  TSubmitButtonProps
> = {
  Link: (props: TLinkProps) => JSX.Element;
  Anchor: (props: TAnchorProps) => JSX.Element;
  Submit: (props: TSubmitButtonProps) => JSX.Element;
  Button: (props: TButtonProps) => JSX.Element;
}

export type Orient<
  TReturnType,
  TLinkProps,
  TAnchorProps,
  TButtonProps,
  TSubmitButtonProps
> = (props: {
  Button: (props: TButtonProps & OnClickProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>) => JSX.Element;
  Link: (props: TLinkProps & ToProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>) => JSX.Element;
  Anchor: (props: TAnchorProps & HrefProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>) => JSX.Element;
  Submit: (props: TSubmitButtonProps & SubmitProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>) => JSX.Element;
}) => TReturnType;