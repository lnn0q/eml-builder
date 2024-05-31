import "./styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="header__link">
        <div className="header__icon icon">&#xf0ee3;</div>
        <div className="header__title">eml-builder</div>
      </Link>
    </header>
  );
};

export default Header;
