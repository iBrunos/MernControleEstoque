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
import NotificationsIcon from '@mui/icons-material/Notifications';
import moment from "moment";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
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


  const [expired, setExpired] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleToggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  //Botão de logout
  const navigateToLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("credentials");
    localStorage.removeItem("level");
    localStorage.removeItem("userId");
    localStorage.removeItem("store");
    navigate("/");
  };

  //const API_URL = 'http://localhost:3000/user/';
  const API_URL = "https://api-happy-makeup.onrender.com/user";
  const API_URL_ENTRY = "https://api-happy-makeup.onrender.com/entry";

  useEffect(() => {
    setIsGerente(level === "Gerente");
    fetchItems();
    fetchItemsEntrys();
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

  const fetchItemsEntrys = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(API_URL_ENTRY, config);
      const items = response.data;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
      oneMonthFromNow.setHours(0, 0, 0, 0);

      const expired = [];
      const expiringSoon = [];

      items.forEach(item => {
        const expirationDate = new Date(item.expiration_date);
        expirationDate.setHours(0, 0, 0, 0);

        if (expirationDate < today) {
          expired.push(item);
        } else if (expirationDate < oneMonthFromNow) {
          expiringSoon.push(item);
        }
      });

      setExpired(expired);
      setExpiringSoon(expiringSoon);
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
                className="text-white hover:bg-pink-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <StoreIcon className="mr-1 font-bold" />
                Estoque
              </Link>

              {isGerente ? (
                <Link
                  to="/user/cadastro"
                  className="text-white hover:bg-pink-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <AppRegistrationIcon className="mr-1 font-bold" />
                  Cadastro
                </Link>
              ) : (
                <span className="px-3 py-2 text-pink-bg-pink-400 rounded-md font-medium mr-2 text-lg cursor-auto hidden">
                  Null
                </span>
              )}

              {isGerente ? (
                <Link
                  to="/user/entradas"
                  className="text-white hover:bg-pink-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <AddShoppingCartIcon className="mr-1 font-bold" />
                  Entradas
                </Link>
              ) : (
                <span className="px-3 py-2 text-pink-bg-pink-400 rounded-md font-medium mr-2 text-lg cursor-auto hidden">
                  Null
                </span>
              )}
              <Link
                to="/user/saidas"
                className="text-white hover:bg-pink-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <RemoveShoppingCartIcon className="mr-1 font-bold" />
                Saídas
              </Link>
              {isGerente ? (
                <Link
                  to="/user/usuarios"
                  className="text-white hover:bg-pink-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <AccountCircleIcon className="mr-1 font-bold" />
                  Usuários
                </Link>
              ) : (
                <span className="px-3 py-2 text-pink-bg-pink-400 rounded-md font-medium mr-2 text-lg cursor-auto hidden">
                  <AccountCircleIcon className="mr-1 font-bold" />
                  Usuários
                </span>
              )}
              {isGerente ? (
                <NavLink
                  to="/user/relatorios"
                  className="text-white hover:bg-pink-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-12"
                >
                  <StickyNote2Icon className="mr-1 font-bold" />
                  Relatórios
                </NavLink>
              ) : (
                <span className="px-3 py-2 text-pink-bg-pink-400 rounded-md font-medium mr-2 text-lg cursor-default hidden">
                  <StickyNote2Icon className="mr-1 font-bold" />
                  Relatórios
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={handleToggleNotification}
              className="text-white hover:bg-pink-400 hover:text-white px-3 py-2 rounded-md mr-0 text-sm font-medium hidden lg:block mt-4 mb-4"
            >
              <NotificationsIcon className="mr-1 font-bold" />
              {(expired.length + expiringSoon.length) > 0 && (
                <span className="px-1 py-1 bg-red-500 rounded-full text-white text-xs">
                  {expired.length + expiringSoon.length}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="bg-white w-64 border border-gray-200 rounded-lg shadow-lg absolute right-0 p-2 ">
                {expired.length > 0 && (
                  <div className="mb-2">
                    <h3 className="text-red-500 font-bold mb-1">Itens Expirados:</h3>
                    <ul>
                      {expired.map(item => (
                        <li key={item._id}>{item.product}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {expiringSoon.length > 0 && (
                  <div>
                    <h3 className="text-yellow-500 font-bold mb-1">Itens Próximos ao Vencimento:</h3>
                    <ul>
                      {expiringSoon.map(item => (
                        <li key={item._id}>{item.product}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="ml-2 flex">
            <div className="flex items-center space-x-4">
              <div className="relative w-14 h-14 lg:w-16 sm:h-16">
                <span className="absolute -bottom-px right-1 lg:w-4 lg:h-4 w-3 h-3 rounded-full border border-white bg-green-500"></span>
                <img
                  src={imageSrc}
                  alt="Avatar do Usúario"
                  className="w-full h-full rounded-full border lg:border-2"
                />
              </div>
              <div className="">
                <span className="lg:block hidden font-semibold text-white m-0">
                  {user}
                </span>
                <span className="lg:block hidden text-sm text-black">
                  {email}
                </span>
              </div>
            </div>
            <button
              onClick={navigateToLogout}
              className="text-white hover:bg-pink-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-[18rem] hidden lg:block mt-4 mb-4"
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
