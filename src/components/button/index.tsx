import { AnchorHTMLAttributes } from "react";
import { AnchorProps, BaseProps, ButtonProps, HrefProps, LinkProps, OnClickProps, Orient, ReturnedButton, SubmitButtonProps, SubmitProps, ToProps } from "./types";
import classNames from "classnames";



export const createButton = <
  TLinkProps = LinkProps,
  TAnchorProps = AnchorProps,
  TButtonProps = ButtonProps,
  TSubmitButtonProps = SubmitButtonProps,
  TReturnType = ReturnedButton<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>
>({
  components,
  className,
  orient,
}: {
  /**
   * Callback function to orient the returned components into a customly defined object. For example, in the context of an anchor component,
   * The Button, Link and Submit components may be attached to the single "Anchor" component as compound components for easy use.
   * 
   * Alternatively, further functionality, hooks or components may be attached here as a central source of export for the object.
   * 
   * @example
   * ```tsx
   * orient: ({ Button, Anchor, Link, Submit }) => Object.assign(Anchor, {
   *   Button,
   *   Link,
   *   Submit
   * });
   * ```
   */
  orient?: Orient<TReturnType, TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>;

  /**
   * The components to use for the button, link, anchor and submit button tags. If these are not provided, the default components will be used * instead.
   * 
   * This can also act as one possible option for styling, where the passed components can simply have a className and/or styles attached
   * to them allowing for a more flexible styling approach.
   */
  components?: BaseProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>['components'];

  /**
   * The className to attach to the internal components. This can be used to have multiple instances of this button but with differing
   * styles. IE. SolidButton, OutlineButton, Anchor, etc.
   */
  className?: string;
}): TReturnType => {
  type _OnClickProps = OnClickProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>
  type _HrefProps = HrefProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>
  type _ToProps = ToProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>
  type _SubmitProps = SubmitProps<TLinkProps, TAnchorProps, TButtonProps, TSubmitButtonProps>

  const Button = (props: _OnClickProps) => (
    <Button 
      {...props as any} 
      className={classNames(className, props.className)} 
      components={components} 
    />
  );
  const Link = (props: _ToProps) => (
    <Button 
      {...props as any} 
      className={classNames(className, props.className)} 
      components={components} 
    />
  );
  const Anchor = (props: _HrefProps) => (
    <Button 
      {...props as any} 
      className={classNames(className, props.className)} 
      components={components} 
    />
  );
  const Submit = (props: _SubmitProps) => (
    <Button 
      {...props as any} 
      className={classNames(className, props.className)} 
      components={components} 
    />
  );

  if (orient) {
    return orient({ Button, Link, Anchor, Submit });
  }
  
  // @ts-ignore
  return {
    Button,
    Link,
    Anchor,
    Submit
  };

}

const BestAnchor = createButton({
  className: "MyButton",
  components: {
    link: (props: { gay: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
  },
  orient: ({ Button, Anchor, Link, Submit }) => Object.assign(Anchor, {
    Button,
    Link,
    Submit
  }),
});
