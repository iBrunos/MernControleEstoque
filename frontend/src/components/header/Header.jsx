import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import avatarDefault from "./../../assets/imgs/avatar.png";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGerente, setIsGerente] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const level = localStorage.getItem("level");
  const userId = localStorage.getItem("userId");
  const [imageSrc, setImageSrc] = useState("");
  const navigateToLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/");
  };

  //const API_URL = 'http://localhost:3000/user/';
  const API_URL = "https://api-happy-makeup.onrender.com/user";

  useEffect(() => {
    setIsGerente(level === "Gerente");
    fetchItems();
    checkImageSrc();
  }, [level]);

  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(`${API_URL}/${userId}`, config);
      // Converte o buffer da imagem em um array de bytes
      const imageBuffer = response.data.avatar.data; // obtém o buffer de imagem do response
      const blob = new Blob([new Uint8Array(imageBuffer)], {
        type: "image/png",
      }); // cria um objeto Blob a partir do buffer
      const imageUrl = URL.createObjectURL(blob); // cria um URL para o objeto Blob
      setImageSrc(imageUrl); // define a URL como a fonte da imagem
    } catch (error) {
      console.error(error);
    }
  };

  const checkImageSrc = () => {
    if (!imageSrc) {
      setImageSrc(avatarDefault);
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-pink-500 border-b border-pink-500">
      <div className="max-w-[120rem]  lg:w-[120rem] sm:w-8">
        <nav className="flex h-20">
          <div className="flex items-center">
            <Link
              to="/user/estoque"
              className="flex-shrink-0 flex items-center ml-10 mr-8 lg:mr-40"
            >
              <h1 className="text-2xl font-bold text-black lg:hidden block">
                HAPPY MAKEUP
              </h1>
              <h1 className="text-4xl font-bold text-black hidden lg:block">
                HAPPY MAKEUP
              </h1>
            </Link>
            <div className="hidden sm:ml-6 sm:flex">
              <Link
                to="/user/estoque"
                className="text-white hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <StoreIcon className="mr-1 font-bold" />
                Estoque
              </Link>
              <Link
                to="/user/cadastro"
                className="text-white hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <AppRegistrationIcon className="mr-1 font-bold" />
                Cadastro
              </Link>

              <Link
                to="/user/entradas"
                className="text-white hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <AddShoppingCartIcon className="mr-1 font-bold" />
                Entradas
              </Link>
              <Link
                to="/user/saidas"
                className="text-white hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <RemoveShoppingCartIcon className="mr-1 font-bold" />
                Saídas
              </Link>

              {isGerente ? (
                <Link
                  to="/user/usuarios"
                  className="text-white hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <AccountCircleIcon className="mr-1 font-bold" />
                  Usuários
                </Link>
              ) : (
                <span className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg cursor-auto hidden">
                  <AccountCircleIcon className="mr-1 font-bold" />
                  Usuários
                </span>
              )}
              {isGerente ? (
                <NavLink
                  to="/user/relatorios"
                  className="text-white hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium "
                >
                  <StickyNote2Icon className="mr-1 font-bold" />
                  Relatórios
                </NavLink>
              ) : (
                <span className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg cursor-default hidden">
                  <StickyNote2Icon className="mr-1 font-bold" />
                  Relatórios
                </span>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-4 ml-10">
              <div className="relative w-14 h-14 lg:w-16 sm:h-16">
                <span className="absolute -bottom-px right-1 lg:w-4 lg:h-4 w-3 h-3 rounded-full border border-white bg-green-500"></span>
                <img
                  src={imageSrc}
                  alt="Avatar do Usúario"
                  className="w-full h-full rounded-full border lg:border-2"
                />
              </div>
              <div className="">
                <span className="lg:block hidden font-semibold text-black m-0">
                  {user}
                </span>
                <span className="lg:block hidden text-sm text-black">{email}</span>
              </div>
            </div>
            <button
              onClick={navigateToLogout}
              className="text-white hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-[18rem] hidden lg:block mt-4 mb-4"
            >
              <LogoutIcon className="mr-1 font-bold" />
              Sair
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-pink-500 hover:bg-black focus:outline-none focus:ring-inset focus:ring-0"
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
        <div className=" px-2 pt-2 pb-3 space-y-1 grid grid-cols-2">
          <Link
            to="/user/estoque"
            className=" block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
          >
            <StoreIcon className="mr-1 font-bold" /> Estoque
          </Link>
          <Link
            to="/user/cadastro"
            className="block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
          >
            <AppRegistrationIcon className="mr-1 font-bold" /> Cadastro
          </Link>
          <Link
            to="/user/entradas"
            className="block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
          >
            <AddShoppingCartIcon className="mr-1 font-bold" /> Entradas
          </Link>
          <Link
            to="/user/saidas"
            className="block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
          >
            <RemoveShoppingCartIcon className="mr-1 font-bold" /> Saídas
          </Link>


          {isGerente ? (
            <Link
              to="/user/usuarios"
              className="block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
            >

              <AccountCircleIcon className="mr-1 font-bold" /> Usuários
            </Link>
          ) : (
            <span className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg cursor-auto hidden">

              Usuários
            </span>
          )}
          {isGerente ? (
            <NavLink
              to="/user/relatorios"
              className="block px-3 py-2 text-white hover:bg-pink-400 rounded-md "
            >

              <StickyNote2Icon className="mr-1 font-bold" /> Relatórios
            </NavLink>
          ) : (
            <span className="px-3 py-2 text-black rounded-md font-medium mr-2 text-lg cursor-default hidden">

              Relatórios
            </span>
          )}
          <button
            onClick={navigateToLogout}
            className=" ml-[-7rem] block px-3 py-2 text-white hover:bg-pink-400 rounded-md"
          >
            <LogoutIcon className="mr-1 font-bold" /> Sair
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;