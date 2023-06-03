import ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { store } from "./app/store";
import Auth from "./features/auth/auth";
import Employees from "./pages/Employees/Employees";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import Status from "./pages/Status/Status";
import Employee from "./pages/Employee/Employee";
import EditEmployee from "./pages/EditEmployee/EditEmployee";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Employees />,
  },
  {
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.register,
    element: <Register />,
  },
  {
    path: routes.page404,
    element: <h1>Page doesn't exist</h1>,
  },
  {
    path: routes.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${routes.status}/:status`,
    element: <Status />,
  },
  {
    path: `${routes.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${routes.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
    <Provider store={store}>
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </Provider>
  </ConfigProvider>
);
