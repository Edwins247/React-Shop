import "./assets/css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <input type="checkbox" id="side-menu" className="drawer-toggle" />
      <section className="drawer-content">
        <Nav />
        <section className="main pt-16">
          <Router />
        </section>
        <Footer />
      </section>
      <Drawer />
    </BrowserRouter>
  );
};

export default App;
