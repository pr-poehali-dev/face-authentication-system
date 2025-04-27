
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-avito-blue mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Страница не найдена</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Извините, страница, которую вы ищете, не существует или была перемещена.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/">
              <Button>На главную</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Войти</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
