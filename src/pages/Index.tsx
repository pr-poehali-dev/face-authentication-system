
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid3X3, LayoutList } from "lucide-react";

const categories = [
  { id: 1, name: "Транспорт", count: "954 321" },
  { id: 2, name: "Недвижимость", count: "854 103" },
  { id: 3, name: "Работа", count: "123 456" },
  { id: 4, name: "Услуги", count: "435 678" },
  { id: 5, name: "Личные вещи", count: "754 321" },
  { id: 6, name: "Для дома и дачи", count: "345 678" },
  { id: 7, name: "Электроника", count: "234 567" },
  { id: 8, name: "Хобби и отдых", count: "123 456" },
];

const products = [
  {
    id: 1,
    title: "Volkswagen Polo, 2018",
    price: "850 000 ₽",
    location: "Москва, м. Бабушкинская",
    time: "Сегодня, 14:24",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 2,
    title: "iPhone 13 Pro 256GB",
    price: "75 000 ₽",
    location: "Москва, м. Лубянка",
    time: "Сегодня, 13:15",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 3,
    title: "2-к квартира, 54 м², 5/9 эт.",
    price: "7 800 000 ₽",
    location: "Москва, м. Медведково",
    time: "Сегодня, 12:40",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 4,
    title: "Диван угловой раскладной",
    price: "25 000 ₽",
    location: "Москва, м. Бульвар Рокоссовского",
    time: "Сегодня, 12:10",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 5,
    title: "Детский велосипед Stels",
    price: "6 800 ₽",
    location: "Москва, м. Войковская",
    time: "Сегодня, 11:32",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 6,
    title: "Стиральная машина Samsung",
    price: "19 500 ₽",
    location: "Москва, м. Алтуфьево",
    time: "Сегодня, 11:05",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300"
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-8">
          {/* Categories */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {categories.map(category => (
              <a 
                key={category.id} 
                href="#" 
                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <span className="font-medium">{category.name}</span>
                <span className="text-gray-500 text-sm">{category.count}</span>
              </a>
            ))}
          </div>
          
          {/* Products */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Рекомендации для вас</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-8">
                  <LayoutList size={16} className="mr-1" />
                  Список
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Grid3X3 size={16} className="mr-1" />
                  Плитка
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="auto">Авто</TabsTrigger>
                <TabsTrigger value="realty">Недвижимость</TabsTrigger>
                <TabsTrigger value="electronics">Электроника</TabsTrigger>
                <TabsTrigger value="hobbies">Хобби</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-3 gap-6">
                  {products.map(product => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1 hover:text-avito-blue">{product.title}</h3>
                        <p className="text-lg font-bold mb-1">{product.price}</p>
                        <p className="text-sm text-gray-500">{product.location}</p>
                        <p className="text-xs text-gray-400 mt-2">{product.time}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="auto" className="mt-0">
                <div className="grid grid-cols-3 gap-6">
                  {products.slice(0, 1).map(product => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1 hover:text-avito-blue">{product.title}</h3>
                        <p className="text-lg font-bold mb-1">{product.price}</p>
                        <p className="text-sm text-gray-500">{product.location}</p>
                        <p className="text-xs text-gray-400 mt-2">{product.time}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="realty" className="mt-0">
                <div className="grid grid-cols-3 gap-6">
                  {products.slice(2, 3).map(product => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1 hover:text-avito-blue">{product.title}</h3>
                        <p className="text-lg font-bold mb-1">{product.price}</p>
                        <p className="text-sm text-gray-500">{product.location}</p>
                        <p className="text-xs text-gray-400 mt-2">{product.time}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Banner */}
          <div className="bg-avito-blue rounded-lg p-8 text-white flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Продавайте на Авито</h2>
              <p className="text-lg mb-4">Более 50 млн человек смотрят объявления</p>
              <Button className="bg-white text-avito-blue hover:bg-gray-100">Разместить объявление</Button>
            </div>
            <div className="w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300" 
                alt="Продавайте на Авито" 
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
