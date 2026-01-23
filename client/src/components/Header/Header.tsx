import "./Header.css";
import logo from "../../assets/logo.webp";

export const Header = () => {
  return (
    <header>
      <nav className="container">
        <img src={logo} alt="Mercado Libre" />
      </nav>
    </header>
  );
};
