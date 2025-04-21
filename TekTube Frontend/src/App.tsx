import "./App.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import Store from "./Store";
import AppRoutes from "./Pages/AppRoutes";

function App() {
  return (
    <Provider store={Store}>
      <MantineProvider>
        <Notifications position="top-center" zIndex={1000} />
        <AppRoutes />
      </MantineProvider>
    </Provider>
  );
}

export default App;
