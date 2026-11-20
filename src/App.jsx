import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import OrderForm from "./OrderForm"; // Agar OrderForm kisi aur folder mein hai toh path check kar lein

function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-blush-50 to-cream-100 px-6 pt-24 text-center">
      <p className="font-heading text-7xl font-semibold text-terracotta-400">404</p>
      <h1 className="mt-4 font-heading text-3xl font-semibold">This page wandered off</h1>
      <p className="mt-3 text-ink/70">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}