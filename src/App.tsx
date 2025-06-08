import "./assets/css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { Suspense } from "react";

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <input type="checkbox" id="side-menu" className="drawer-toggle" />
        <section className="drawer-content">
          <Nav />
          <Suspense fallback={<div className="flex justify-center p-10">로딩 중...</div>}>
            <section className="main pt-16">
              <Router />
            </section>
          </Suspense>
          <Footer />
        </section>
        <Drawer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
