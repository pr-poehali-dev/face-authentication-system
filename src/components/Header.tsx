
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { MapPin, Search, User, Heart, MessageSquare, Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-avito-blue font-bold text-3xl">
              Avito
            </Link>
            
            <div className="flex items-center text-gray-500">
              <MapPin size={18} className="mr-1" />
              <span className="text-sm">Москва</span>
            </div>
          </div>

          <div className="flex-grow mx-16">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Поиск по объявлениям" 
                className="w-full h-11 rounded-md border-gray-300 pl-10" 
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Button className="absolute right-0 top-0 h-full bg-avito-blue hover:bg-avito-light-blue text-white rounded-l-none">
                Найти
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
              <Heart size={20} className="mb-1" />
              <span className="text-xs">Избранное</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
              <MessageSquare size={20} className="mb-1" />
              <span className="text-xs">Сообщения</span>
            </Button>
            
            <Link to="/login">
              <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
                <User size={20} className="mb-1" />
                <span className="text-xs">Войти</span>
              </Button>
            </Link>
            
            <Button className="bg-avito-green hover:opacity-90 text-white flex items-center">
              <Plus size={20} className="mr-1" />
              Разместить объявление
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
