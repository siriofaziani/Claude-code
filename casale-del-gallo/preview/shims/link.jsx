// next/link for the preview: routes live in the URL hash (#/it/casale-san-carlo).
import { navigate } from "../router";

export default function Link({ href, children, onClick, prefetch, scroll, replace, ...rest }) {
  return (
    <a
      href={`#${href}`}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
