import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import unidecode from "unidecode";

export default function FormUsers() {
    const [items, setItems] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [avatar, setAvatar] = useState();

    const changePageTitle = (newTitle) => {
        document.title = newTitle;
    };
    changePageTitle("Happy Makeup | Usuários");
    const API_URL = 'http://localhost:3000/user/';
    //const API_URL = 'https://api-happy-makeup.onrender.com/user';

    changePageTitle("Happy Makeup | Cadastro");

    const fetchItems = async () => {
        const token = localStorage.getItem("token");
        // definir o cabeçalho `Authorization` com o token JWT
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        // fazer uma solicitação HTTP GET para a rota protegida com o token JWT
        try {
            const response = await axios.get(API_URL, config);

            setItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const addItem = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const newItem = {
            username,
            password,
            level,
            email,
            phone,
        };

        // Create a new FormData object
        const formData = new FormData();
        formData.append("avatar", avatar); // Add the image file to the form data
        formData.append("username", newItem.username);
        formData.append("password", newItem.password);
        formData.append("level", newItem.level);
        formData.append("email", newItem.email);
        formData.append("phone", newItem.phone);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
                },
            });
            setItems([...items, response.data]);
            setUsername("");
            setPassword("");
            setLevel("");
            setEmail("");
            setPhone("");
            setAvatar(null); // Reset the selected image file
            fetchItems();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteItem = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const editItem = async (id) => {
        const token = localStorage.getItem("token");

        setEditingItem(id);
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const item = response.data;
        setUsername(item.username);
        setPassword("");
        setLevel(item.level);
        setEmail(item.email);
        setPhone(item.phone);
    };

    const updateItem = async (e) => {
        e.preventDefault();
        const updatedItem = {
            _id: editingItem,
            username,
            password,
            level,
            email,
            phone,
        };

        const token = localStorage.getItem("token");

        const response = await axios.put(`${API_URL}/${editingItem}`, updatedItem, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setItems(
            items.map((item) => (item._id === editingItem ? response.data : item))
        );
        setUsername("");
        setPassword("");
        setLevel("");
        setEmail("");
        setPhone("");
        setEditingItem(null);
        fetchItems();
    };

    return (
        <>
            <Header />
            <form
                onSubmit={editingItem !== null ? updateItem : addItem}
                className="flex flex-row mb-0 mt-1 bg-white border-b-gray-200 border-b pl-8 pt-1 pb-2 ml-0"
            >
                <input
                    type="text"
                    value={username}
                    placeholder="Usuário"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto focus:border-pink-500"
                    id="input__product"
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto focus:border-pink-500"
                />
                <div className="relative w-40 mr-2 text-pink-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-pink-500 right-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <select
                        className="w-full py-2  pl-2 pr-6 text-gray-500 border-gray-300 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-pink-500 cursor-pointer"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                    >
                        <option value="">Nível de Acesso</option>
                        <option className="hover:text-pink-500 hover:bg-pink-50">
                            Funcionário
                        </option>
                        <option className="hover:text-pink-500 hover:bg-pink-50">
                            Gerente
                        </option>
                    </select>
                </div>

                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mr-2 border-gray-300 border rounded-md p-2 w-[10rem] outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
                />
                <input
                    type="text"
                    value={phone}
                    placeholder="Telefone"
                    onChange={(e) => setPhone(e.target.value)}
                    className="mr-2 border-gray-300 border rounded-md p-2 w-[10rem] outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    placeholder="Insira sua Imagem"
                    className="mr-2 border-gray-300 border rounded-md outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500 pr-[21rem] pb-0"
                />
                <button
                    type="submit"
                    className=" block mr-16 border rounded-md ml-2 p-2 bg-pink-500 text-white font-medium hover:bg-pink-600"
                >
                    {editingItem !== null ? "Salvar Usuário" : "Adicionar Usuário"}
                </button>


                <section className="flex items-center space-x-2 border rounded-md p-2 ml-[23rem] focus:border-pink-500">
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
                        className="outline-none appearance-none placeholder-gray-500 text-gray-500 w-64"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Pesquisar"
                        id="input__pesquisar"
                    />
                </section>


            </form>
            <div className="p-0 m-2 text-center">
                <h3 className="text-gray-800 text-4xl font-bold text-center ">
                    USUÁRIOS
                </h3>
            </div>
            <div className="bg-white mx-auto px-4 md:px-8">
                <div className="mt-1 shadow-sm border rounded-lg overflow-x-auto max-h-[44rem]">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Usuário</th>
                                <th className="py-3 px-6">Senha</th>
                                <th className="py-3 px-6">Nível de Acesso</th>
                                <th className="py-3 px-6">Email</th>
                                <th className="py-3 px-6">Telefone</th>
                                <th className="py-3 px-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {items
                                .filter((item) => {
                                    const searchTermUnidecoded = unidecode(
                                        searchTerm?.toLowerCase() || ""
                                    );
                                    const itemUserUnidecoded = unidecode(
                                        item.username?.toLowerCase() || ""
                                    );
                                    if (searchTermUnidecoded === "") {
                                        return true;
                                    } else if (
                                        itemUserUnidecoded.includes(searchTermUnidecoded)
                                    ) {
                                        return true;
                                    }
                                    return false;
                                })
                                .map((item, index) => (
                                    <tr key={item._id || index}>
                                        <td className="px-6 py-4">{item.username}</td>
                                        <td className="px-6 py-4 text-[0.5rem]">{item.password}</td>
                                        <td className="px-6 py-4">{item.level}</td>
                                        <td className="px-6 py-4 ">{item.email}</td>
                                        <td className="px-6 py-4 ">{item.phone}</td>
                                        <td className=" px-6 whitespace-nowrap">
                                            <button
                                                onClick={() => editItem(item._id)}
                                                className="py-1 px-2 font-medium text-white duration-150 hover:bg-indigo-700 bg-indigo-600 rounded-lg mr-1"
                                            >
                                                <EditIcon className="mr-1" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => deleteItem(item._id)}
                                                className="py-1 leading-none px-2 font-medium text-white duration-150 bg-red-600 hover:bg-red-700 rounded-lg"
                                            >
                                                <DeleteForeverIcon className="mr-1" />
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
