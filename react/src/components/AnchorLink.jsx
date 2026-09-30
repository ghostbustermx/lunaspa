import { useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "../lib/effects";

export default function AnchorLink({ to, children, className, onClick, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(e) {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    e.preventDefault();
    const hashIndex = to.indexOf("#");
    const path = hashIndex >= 0 ? to.slice(0, hashIndex) : to;
    const id = hashIndex >= 0 ? to.slice(hashIndex + 1) : null;

    if (!id) {
      navigate(path === "" ? "/" : path);
      return;
    }

    const current = location.pathname || "/";
    const target = path === "" ? "/" : path;
    if (target === current) {
      scrollToId(id);
    } else {
      navigate(target, { state: { scrollTo: id } });
    }
  }

  return (
    <a className={className} href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}