import logo from "../images/react-logo@3x.svg";
function Header() {
  return (
    <header className="app-header">
      <img
        style={{ width: "20rem"}}
        src={logo}
        alt="React Logo"
      />
      <h1 id="header__title ">The React Quiz</h1>
    </header>
  );
}

export default Header;
