import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import logo from "../../assets/imgs/logoHM.png";
import logoArchei from "../../assets/imgs/ArcheiLogo.png";
import wallpaper from "../../assets/imgs/wallpaper.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const handleBotaoClick = () => {
    abrirModal();
  };
  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("Happy Makeup | Login");

  useEffect(() => {
    if (localStorage.getItem("checkError") === "true") {
      window.alert(
        "Você precisa fazer login para acessar essa página.\nCaso Esteja com algum erro, chame o suporte."
      );
      localStorage.removeItem("checkError");
    }
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        navigate("/user/estoque");
      }
    }
  }, [navigate]);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      const credentials = { email, password };
      localStorage.setItem("credentials", JSON.stringify(credentials));
    } else {
      localStorage.removeItem("credentials");
    }
  };

  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("credentials"));
    if (savedCredentials) {
      setEmail(savedCredentials.email);
      setPassword(savedCredentials.password);
      setRememberMe(true);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const newItem = { email, password };
    const response = await axios.post(
      "https://happy-archei.vercel.app/auth",
      newItem
    );
    const data = response.data;
    if (data.message === "Login realizado com sucesso.") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("level", data.level);
      navigate("/user/estoque");
    } else {
      setPassword("");
      setEmail("");
      alert(data.message);
    }
  };

  return (
    <>
      <section className="bg-pink-300 lg:py-[8.4rem] sm:py-[10rem]">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-full"
            style={{ backgroundImage: `url(${wallpaper})` }}
          ></div>

          <form onSubmit={login} className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-44 my-[-2rem]" src={logo} alt="logo" />
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-wide text-center text-gray-800  md:text-3xl">
              Bem vindo,
            </h1>
            <h1 className="mb-2 text-2xl font-normal tracking-wide text-center text-gray-800  md:text-3xl">
              realize seu login.
            </h1>
            <div className="">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="LoggingEmailAddress"
              >
                E-mail
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-pink-400 focus:ring-opacity-40 dark:focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-300"
                type="email"placeholder="seuemail@exemplo.com"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600"
                  htmlFor="loggingPassword"
                >
                  Senha
                </label>
                <div>
                  <a
                    href="#"
                    className="text-xs text-gray-500 hover:underline hover:text-pink-500"
                    onClick={handleBotaoClick}
                  >
                    Esqueceu sua senha?
                  </a>

                  {modalAberto && (
                    <section
                      id="password-change-banner"
                      className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-60"
                    >
                      <div className="max-w-md shadow-2xl p-4 mx-auto bg-white border-2 border-pink-200 rounded-2xl">
                        <h2 className="font-semibold text-gray-800 ">
                        🔒 Esqueceu a sua senha? 🔑
                        </h2>

                        <p className="mt-4 text-sm text-gray-600">
                          Caso tenha esquecido ou perdido sua senha, por favor, entre em
                          contato com o <span className="text-pink-600">suporte</span> ou o seu <span className="text-pink-600">gerente</span> designado para
                          obter assistência na recuperação da sua senha.
                        </p>
                        <p className="mt-4 text-sm text-gray-600">
                          Lembre-se de armazenar sua senha de forma segura.
                        </p>

                        <div className="flex justify-end mt-4">
                          <button
                            className="text-xs border text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none"
                            onClick={fecharModal}
                          >
                            Fechar
                          </button>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>

              <input
                id="loggingPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-pink-400 focus:ring-opacity-40 dark:focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-300 font-black"
                type="password"
                placeholder="●●●●●●●●"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-pink-400 focus:ring-3 focus:ring-primary-300 accent-pink-500 cursor-pointer"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 hover:text-pink-500 cursor-pointer"
                  >
                    Lembre-se de mim
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Entrar
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b md:w-1/4"></span>

              <span className="text-xs text-gray-500 uppercase">
                desenvolvido por
              </span>

              <span className="w-1/5 border-b md:w-1/4"></span>
            </div>
            <a className="flex justify-center mx-auto" href="https://archei.vercel.app">
              <img
                className="lg:mt-[1rem] lg:mb-[0rem] lg:w-full sm:w-48 sm:mt-[1rem] sm:mb-[0rem]"
                src={logoArchei}
                alt="logo"
                
              />
            </a>
          </form>
        </div>
        <span className="ml-[32rem] lg:block sm:hidden">
          Image by{" "}
          <a href="https://www.freepik.com/free-photo/makeup-brushes-with-pink-powder-splash_4912081.htm#query=make%20up&position=11&from_view=search&track=ais">
            Freepik
          </a>
        </span>
      </section>
    </>
  );
}
