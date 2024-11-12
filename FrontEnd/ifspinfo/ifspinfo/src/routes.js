import Maps from "views/Map.js";
import User from "views/User";
import Signup from "views/Signup";
import Dashboard from "views/Dashboard";
import AdminPage from "views/AdminPage";
import CursosCRUD from "views/CursosCRUD";
import CursoPage from "views/CursoPage";
import ConteudoAdd from "views/ConteudoAdd";
import ConteudoCRUD from "views/ConteudoCRUD";
import RedeSociaisCRUD from "views/RedesSociaisCRUD"

var routes = [
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/signup",
    component: <Signup />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/adminpage",
    component: <AdminPage />,
    layout: "/admin",
  },
  {
    path: "/cursos",
    component: <CursosCRUD />,
    layout: "/admin",
  },
  {
    path: "/cursopage",
    component: <CursoPage />,
    layout: "/admin",
  },
  {
    path: "/conteudo",
    component: <ConteudoAdd />,
    layout: "/admin",
  },
  {
    path: "/conteudoCRUD",
    component: <ConteudoCRUD />,
    layout: "/admin",
  },
  {
    path: "/redesCRUD",
    component: <RedeSociaisCRUD />,
    layout: "/admin",
  },
  {
    pro: true,
    path: "/user",
    name: "Sou um Administrador",
    icon: "nc-icon nc-circle-10",
    component: <User />,
    layout: "/admin",
  },
];
export default routes;
