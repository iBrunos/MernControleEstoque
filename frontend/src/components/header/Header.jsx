import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import avatar from "./../../assets/imgs/avatar.png";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGerente, setIsGerente] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const level = localStorage.getItem("level");
  const navigateToLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/");
  };
  useEffect(() => {
    setIsGerente(level === "Gerente");
  }, [level]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-pink-500 border-b border-pink-500">
      <div className="max-w-[120rem]  lg:w-[120rem] sm:w-8">
        <nav className="flex h-20">
          <div className="flex items-center">
            <Link to="/pt-br" className="flex-shrink-0 flex items-center ml-10 mr-40" >
              <h1 className="text-4xl font-bold text-black lg:hidden block">
                HAPPY MAKEUP
              </h1>
              <h1 className="text-4xl font-bold text-black hidden lg:block">
                HAPPY MAKEUP
              </h1>
            </Link>
            <div className="hidden sm:ml-6 sm:flex">
              <Link
                to="/user/estoque"
                className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg"
              >
                <StoreIcon className="mr-1 font-bold" />
                Estoque
              </Link>
              <Link
                to="/user/cadastro"
                className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg"
              >
                <AppRegistrationIcon className="mr-1 font-bold" />
                Cadastro
              </Link>

              <Link
                to="/user/entradas"
                className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg"
              >
                <AddShoppingCartIcon className="mr-1 font-bold" />
                Entradas
              </Link>
              <Link
                to="/user/saidas"
                className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg"
              >
                <RemoveShoppingCartIcon className="mr-1 font-bold" />
                Saídas
              </Link>

              {isGerente ? (
                <Link
                  to="/user/usuarios"
                  className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg"
                >
                  <AccountCircleIcon className="mr-1 font-bold" />
                  Usuários
                </Link>
              ) : (
                <spam
                  className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg cursor-auto"
                >
                  <AccountCircleIcon className="mr-1 font-bold" />
                  Usuários
                </spam>
              )}
              {isGerente ? (
                <Link
                  to="/user/relatorios"
                  className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg"
                >
                  <StickyNote2Icon className="mr-1 font-bold" />
                  Relátorios
                </Link>
              ) : (
                <spam
                  className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg cursor-default"
                >
                  <StickyNote2Icon className="mr-1 font-bold" />
                  Relatórios
                </spam>
              )}
              
              <div className="flex items-center space-x-4 ml-40">
                <div
                  className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-pink-500 ring-4 z-40"
                >
                  <img
                    src={avatar}
                    className="w-full h-full rounded-full"
                    alt="Avatar do Usuário"
                  />
                </div>
                <div className="">
                  <span className="block font-semibold text-black m-0">
                    {user}
                  </span>
                  <span className="block text-sm text-black">{email}</span>
                </div>
              </div>
              <button
                onClick={navigateToLogout}
                className="px-3 py-2 text-black rounded-md font-medium text-lg ml-[10rem]"
              >
                <LogoutIcon className="mr-1 font-bold" />
                Sair
              </button>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-pink-500 hover:text-pink-500 hover:bg-black focus:outline-none focus:ring-inset focus:ring-0"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={handleToggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      <nav
        className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/pt-br/sobre"
            className="block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
          >
            Sobre a Archei
          </Link>
          <Link
            to="/pt-br/oque-fazemos"
            className="block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
          >
            O que fazemos
          </Link>
          <Link
            to="/pt-br/nosso-trabalho"
            className="block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
          >
            Nosso trabalho
          </Link>
          <Link
            to="/pt-br/contato"
            className="block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
          >
            Entre em contato
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
