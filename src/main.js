/* eslint-disable object-curly-spacing */
import Navigo from "navigo";
import Signin from "./client/login/signin";
import Signup from "./client/login/signup";
import HomePage from "./client/page/home";
import Laptop from "./client/page/laptop";
import PhoneProduct from "./client/page/phone";
import ProductDetail from "./client/page/product/productDetail";
import Dashboard from "./admin/Dashboard";
import AddProducts from "./admin/products/AddProduct";
import ListProducts from "./admin/products/ListProducts";
import EditProducts from "./admin/products/EditProduct";
import ListUsers from "./admin/users/ListUser";
import AddUsers from "./admin/users/AddUser";
import EditUsers from "./admin/users/EditUserInfo";
import Category from "./admin/categories/Category";
import ListCategory from "./admin/categories/ListCategory";
import CartPage from "./client/page/cart";
import Search from "./client/page/search";
import ProductCate from "./client/page/productCate";

const router = new Navigo("/", { linksSelector: "a" });

const print = async (content, id) => {
    document.getElementById("content").innerHTML = await content.render(id);
    if (content.afterRender) content.afterRender(id);
};

router.on("/admin/*", () => { }, {
    before(done, match) {
        if (JSON.parse(localStorage.getItem('user'))) {
            const role = JSON.parse(localStorage.getItem('user')).role;
            if (role == 1) {
                done();
            } else {
                document.location.href = "/"
            }
        } else {
            document.location.href = "/"
        }
    }
})

router.on({
    "/": () => print(HomePage),
    "/signin": () => print(Signin),
    "/signup": () => print(Signup),
    "/phones": () => print(PhoneProduct),
    "/laptop": () => print(Laptop),
    "/productDetail/:id": ({ data }) => print(ProductDetail, data.id),
    "/admin/dashboard": () => print(Dashboard),
    "/admin/products": () => print(ListProducts),
    "/admin/products/add": () => print(AddProducts),
    "/admin/products/:id/edit": ({ data }) => print(EditProducts, data),
    "/admin/users": () => print(ListUsers),
    "/admin/users/add": () => print(AddUsers),
    "/admin/users/:id/edit": ({ data }) => print(EditUsers, data),
    "/admin/category/add": () => print(Category),
    "/admin/category": () => print(ListCategory),
    "/cart": () => print(CartPage),
    "/search": ({ params }) => print(Search, params),
    "/:name/:id": ({ data }) => print(ProductCate, data.id)
});

router.resolve();