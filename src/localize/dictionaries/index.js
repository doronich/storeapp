import {en} from './en_US'
import {ru} from './ru-RU'



const dictionaries = {
    "en-US":{
        "account":{
            "logout": "Logout",
            "signin": "Sign In",
            "signup": "Sign Up",
            "login":"Login",
            "emailreq":"Email is not valid.",
            "loginreq":"Login must have atleast 6 characters.",
            "pass":"Password",
            "passreq":"Password must have contains at least 6 characters; one lowercase character; one upperrcase character; one digit from 0-9.",
            "confpass":"Repeat password",
            "passmism": "Password dismatch",
            "fname":"First name",
            "lname":"Last name",
            "needReg":"Need an account?",
            "needLog":"Have an account?",
            "errsignin":"Incorrect login or password."
        },
        "header":{
            "women":"Women",
            "men":"Men",
            "contacts":"Contacts",
            "about":"About us",
            "delivery":"Delivery"
        },
        "aside":{
            "categories":"Categories",
            "other":"Other",
            "products":"Products",
            "footwear":"Footwear",
            "clothing":"Clothing",
            "accessories":"Accessories",
            "account":{
                "name":"Account",
                "allitems":"All products",
                "additem":"Add a product"
            },
            
        }

    },
    "ru-RU":{
        "account":{
            "logout": "Выйти",
            "signin": "Войти",
            "signup": "Регистрация",
            "login":"Логин",
            "emailreq":"Недействительный e-mail.",
            "loginreq":"Логин должен содержать не менее 6 символов",
            "pass":"Пароль",
            "passreq":"Пароль должен содержать не менее 6 символов, минимум один символ нижнего регистра; минимум один символ верхнего регистра; минимум одну цифру 0-9.",
            "confpass":"Повторите пароль",
            "passmism": "Пароль не совпадает",
            "fname":"Имя",
            "lname":"Фамилия",
            "needReg":"Нет аккаунта?",
            "needLog":"Уже есть аккаунт?",
            "errsignin":"Неверный логин или пароль."            
        },
        "header":{
            "women":"Женское",
            "men":"Мужское",
            "contacts":"Контакты",
            "about":"О нас",
            "delivery":"Доставка"
        },
        "aside":{
            "categories":"Категории",
            "other":"Прочее",
            "products":"Товары",
            "footwear":"Обувь",
            "clothing":"Одежда",
            "accessories":"Аксесссуары",
            "account":{
                "name":"Аккаунт",
                "allitems":"Все товары",
                "additem":"Добавить товар"
            },
            
        }

    }
}

export {dictionaries};