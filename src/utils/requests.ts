import axios from "axios";
import { RegisterAPI } from "../config/register-config";
import { LoginAPI } from "../config/login-config";
import { BooksAPI } from "../config/book-config";
import { UpdateBook } from "../views/book/components/update-book-model";
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 3000
});

export interface CreateBook {
    name: string;
    author: string;
    description: string;
    cover: string;
}

export async function register(username: string, password: string) {
    return await axiosInstance.post(RegisterAPI.registers.register, {
        username, password
    });
}

export async function login(username: string, password: string) {
    return await axiosInstance.post(LoginAPI.logins.login, {
        username, password
    });
}

export async function list(name: string) {
    return await axiosInstance.get(BooksAPI.book.list, {
        params: {
            name,
        }
    });
}

export async function create(book: CreateBook) {
    return await axiosInstance.post(BooksAPI.book.create, {
        name: book.name,
        author: book.author,
        description: book.description,
        cover: book.cover
    });
}

export async function detail(id: number) {
    return await axiosInstance.get(`/book/${id}`)
}

export async function update(book: UpdateBook) {
    return await axiosInstance.put(BooksAPI.book.update, {
        id: book.id,
        name: book.bookName,
        author: book.author,
        description: book.des,
        cover: book.cover
    });
}

export async function del(id: number) {
    return await axiosInstance.delete(`/book/delete/${id}`)
}
