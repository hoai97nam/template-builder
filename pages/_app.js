import { ComponentsProvider } from "../contexts/ComponentContext";
import "../styles/globals.css";
import 'antd/dist/antd.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MyApp({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ComponentsProvider>
        <Component {...pageProps} />
      </ComponentsProvider>
    </DndProvider>
  );
}

export default MyApp;
