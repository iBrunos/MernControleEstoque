import { useState, useEffect } from "react";
import axios from "axios";
import unidecode from "unidecode";
import Header from "../../components/header/Header";
import moment from "moment";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PaidIcon from "@mui/icons-material/Paid";

export default function FormReports() {
  const [itemsEntrys, setItemsEntrys] = useState([]);
  const [itemsExits, setItemsExits] = useState([]);
  const [itemsUsers, setItemsUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [entryCount, setEntryCount] = useState(0);
  const [exitCount, setExitCount] = useState(0);

  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("Happy Makeup | Relatórios");

  const handleClearFilters = () => {
    location.reload();
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    fetchItems();
    setTipo("todos");
    setUser("todos");
  }, []);

  useEffect(() => {
    const filteredEntries = itemsEntrys.filter((entry) => {
      const searchTermMatches = unidecode(entry.product.toLowerCase()).includes(
        unidecode(searchTerm.toLowerCase())
      );
      const typeMatches =
        tipo === "todos" || entry.type.toLowerCase() === tipo.toLowerCase();
      const userMatches = user === "todos" || entry.inserted_by === user;
      const dateMatches =
        (!startDate ||
          moment(entry.createdAt).isSameOrAfter(moment(startDate))) &&
        (!endDate || moment(entry.createdAt).isSameOrBefore(moment(endDate)));

      return searchTermMatches && typeMatches && userMatches && dateMatches;
    });

    const totalEntryPrice = filteredEntries.reduce((accumulator, entry) => {
      const entryPrice = parseFloat(entry.entry_price);
      return accumulator + entryPrice;
    }, 0);

    setEntryCount(totalEntryPrice);
  }, [itemsEntrys, searchTerm, tipo, user, startDate, endDate]);

  useEffect(() => {
    const filteredEntries = itemsExits.filter((exit) => {
      const searchTermMatches = unidecode(exit.product.toLowerCase()).includes(
        unidecode(searchTerm.toLowerCase())
      );
      const typeMatches =
        tipo === "todos" || exit.type.toLowerCase() === tipo.toLowerCase();
      const userMatches = user === "todos" || exit.inserted_by === user;
      const dateMatches =
        (!startDate ||
          moment(exit.created_at).isSameOrAfter(moment(startDate))) &&
        (!endDate || moment(exit.createdAt).isSameOrBefore(moment(endDate)));

      return searchTermMatches && typeMatches && userMatches && dateMatches;
    });

    const totalExitPrice = filteredEntries.reduce((accumulator, exit) => {
      const exitPrice = parseFloat(exit.exit_price);
      return accumulator + exitPrice;
    }, 0);

    setExitCount(totalExitPrice);
  }, [itemsExits, searchTerm, tipo, user, startDate, endDate]);

  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    // definir o cabeçalho `Authorization` com o token JWT
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // fazer uma solicitação HTTP GET para a rota protegida com o token JWT
    try {
      const responseEntry = await axios.get(
        "https://happy-archei.vercel.app/entry",
        config
      );
      const responseExit = await axios.get(
        "https://happy-archei.vercel.app/exit",
        config
      );
      const responseUser = await axios.get(
        "https://happy-archei.vercel.app/user",
        config
      );
      setItemsEntrys(responseEntry.data);
      setItemsExits(responseExit.data);
      setItemsUsers(responseUser.data);
    } catch (error) {
      console.error(error);
    }
  };
  function formatDateHours(dateString) {
    const date = moment(dateString).format("DD/MM/YYYY [às] HH:mm");
    return date;
  }
  return (
    <>
      <Header />
      <form className="flex lg:flex-row flex-col mb-0 mt-1 bg-white border-b-gray-200 border-b pl-8 pt-1 pb-2 ml-0">
        <section className="flex items-center space-x-2 border rounded-md p-2 lg:mt-0 mt-2 lg:w-64 w-[20rem] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="outline-none appearance-none placeholder-gray-500 text-gray-500 lg:w-64 w-[20rem]"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            id="input__pesquisar"
          />
        </section>
        <select
          className="lg:ml-2 ml-0 flex items-center space-x-2 border rounded-md p-2 text-gray-500 lg:mt-0 mt-2 w-44"
          onChange={(e) => setTipo(e.target.value)}
          value={tipo}
        >
          <option value="todos">Tipo</option>
          <option value="Entrada">Entrada</option>
          <option value="Saída">Saída</option>
        </select>

        <select
          className="lg:ml-2 ml-0 flex items-center space-x-2 border rounded-md p-2 text-gray-500 lg:mt-0 mt-2 w-44"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        >
          <option value="todos">Todos Funcionários</option>
          {itemsUsers.map((users) => (
            <option
              key={users.id}
              className="hover:text-pink-500 hover:bg-pink-50"
              value={users.username}
            >
              {users.username}
            </option>
          ))}
        </select>
        <input
          className="lg:ml-2 ml-0 border rounded-md p-2 text-gray-500 w-36 lg:mt-0 mt-2"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <p className="p-2 ml-2">até</p>
        <input
          className="lg:ml-2 ml-0 border rounded-md p-2 text-gray-500 w-36"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="block mr-1 lg:mt-0 mt-2 w-[10rem] border rounded-md lg:ml-2 ml-0 p-2 bg-pink-500 text-white font-medium hover:bg-pink-600"
          onClick={handleClearFilters}
        >
          Limpar Filtros
        </button>
        <button
          className="block mr-1 lg:mt-0 mt-2 w-[10rem] border rounded-md lg:ml-2 ml-0 p-2 bg-pink-500 text-white font-medium hover:bg-pink-600"
          onClick={handlePrint}
        >
          Imprimir
        </button>
      </form>
      <div className="p-0 m-2 mb-0 text-center">
        <h3 className="text-gray-800 text-4xl font-bold text-center ">
          RELÁTORIOS
        </h3>
      </div>
      <div className="m-1 flex flex-row items-center justify-center ">
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white border-gray-200 border lg:mr-4 mr-0 lg:ml-7 ml-0 lg:pr-16 pr-8 lg:pb-8 pb-4">
          <div className="lg:p-4 p-1 flex items-center">
            <div className="lg:p-3 p-1 rounded-full text-red-500 dark:text-red-100 bg-red-100 dark:bg-red-500 lg:mr-4 mr-2">
              <ContentPasteGoIcon></ContentPasteGoIcon>
            </div>
            <div>
              <p className="mb-2 lg:text-lg text-xs font-normal text-gray-500">
                Entradas
              </p>
              <p className="lg:text-3xl text-xs font-bold text-red-700">
                {"R$: " + entryCount}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white border-gray-200 border lg:mr-4 mr-0 lg:ml-7 ml-1 lg:pr-16 pr-8 lg:pb-8 pb-4">
          <div className="lg:p-4 p-1 flex items-center">
            <div className="lg:p-3 p-1 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 lg:mr-4 mr-2">
              <RequestQuoteIcon></RequestQuoteIcon>
            </div>
            <div>
              <p className="mb-2 lg:text-lg text-xs font-normal text-gray-500">
                Saídas
              </p>
              <p className="lg:text-3xl text-xs font-bold text-green-700">
                {"R$: " + exitCount}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white border-gray-200 border lg:mr-4 mr-0 lg:ml-7 ml-1 lg:pr-16 pr-8 lg:pb-8 pb-4">
          <div className="lg:p-4 p-1 flex items-center">
            <div className="lg:p-3 p-1 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 lg:mr-4 mr-2">
              <PaidIcon></PaidIcon>
            </div>
            <div>
              <p className="mb-2 lg:text-lg text-xs font-normal text-gray-500">
                Lucro
              </p>
              <p className="lg:text-3xl text-xs font-bold text-grey-700">
                {"R$: " + (exitCount - entryCount)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[44rem]">
        <div className="mt-1 shadow-sm border rounded-lg overflow-x-auto max-h-[39rem] ">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr className="">
                <th className="py-3 px-6">Produto</th>
                <th className="py-3 px-6">Quantidade</th>
                <th className="py-3 px-6">Tipo</th>
                <th className="py-3 px-6">Preço</th>
                <th className="py-3 px-6">Funcionário</th>
                <th className="py-3 px-6">Data Criação</th>
                <th className="py-3 px-6">Data Modificação</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y border-b-[0.05rem] border-t-[0.1rem]">
              {itemsEntrys
                .filter((item) => {
                  const searchTermUnidecoded = unidecode(
                    searchTerm?.toLowerCase() || ""
                  );
                  const itemUserUnidecoded = unidecode(
                    item.product?.toLowerCase() || ""
                  );
                  const itemDate = moment(item.createdAt);
                  return (
                    (tipo === "todos" || tipo === item.type) &&
                    (user === "todos" || user === item.inserted_by) &&
                    (searchTermUnidecoded === "" ||
                      itemUserUnidecoded.includes(searchTermUnidecoded)) &&
                    (!startDate || itemDate.isSameOrAfter(startDate, "day")) &&
                    (!endDate || itemDate.isSameOrBefore(endDate, "day"))
                  );
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      R$: {item.entry_price}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      {item.inserted_by}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {formatDateHours(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {formatDateHours(item.updatedAt)}
                    </td>
                    <td className=" px-6 whitespace-nowrap"></td>
                  </tr>
                ))}
            </tbody>
            <tbody className="text-gray-600 divide-y border-t-[0.05rem] border-gray-200">
              {itemsExits
                .filter((item) => {
                  const searchTermUnidecoded = unidecode(
                    searchTerm?.toLowerCase() || ""
                  );
                  const itemUserUnidecoded = unidecode(
                    item.product?.toLowerCase() || ""
                  );
                  const itemDate = moment(item.createdAt);
                  return (
                    (tipo === "todos" || tipo === item.type) &&
                    (user === "todos" || user === item.inserted_by) &&
                    (searchTermUnidecoded === "" ||
                      itemUserUnidecoded.includes(searchTermUnidecoded)) &&
                    (!startDate || itemDate.isSameOrAfter(startDate, "day")) &&
                    (!endDate || itemDate.isSameOrBefore(endDate, "day"))
                  );
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      R$: {item.exit_price}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      {item.inserted_by}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {formatDateHours(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {formatDateHours(item.updatedAt)}
                    </td>
                    <td className=" px-6 whitespace-nowrap"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
