
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, MessageSquare, Heart, Settings, User, LogOut, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const userInfo = {
  name: "Пользователь Авито",
  phone: "+7 (XXX) XXX-XX-XX",
  registeredDate: "27 апреля 2025",
  lastLogin: "Сегодня, 14:30"
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    // Имитация выхода из системы
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-1/4">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle>Мой профиль</CardTitle>
                  <CardDescription>
                    Управляйте своим аккаунтом и объявлениями
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === "profile" ? "bg-gray-100" : ""}`}
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Профиль
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === "ads" ? "bg-gray-100" : ""}`}
                      onClick={() => setActiveTab("ads")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Мои объявления
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === "favorites" ? "bg-gray-100" : ""}`}
                      onClick={() => setActiveTab("favorites")}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Избранное
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === "messages" ? "bg-gray-100" : ""}`}
                      onClick={() => setActiveTab("messages")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Сообщения
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === "notifications" ? "bg-gray-100" : ""}`}
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Уведомления
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === "settings" ? "bg-gray-100" : ""}`}
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Настройки
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-4"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Выйти
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Биометрическая защита</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Верификация активна
                  </div>
                  <p className="text-xs text-gray-500">
                    Ваш аккаунт защищен биометрической верификацией. 
                    При следующем входе система попросит пройти верификацию лица.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="w-3/4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-6 mb-6">
                  <TabsTrigger value="profile">Профиль</TabsTrigger>
                  <TabsTrigger value="ads">Объявления</TabsTrigger>
                  <TabsTrigger value="favorites">Избранное</TabsTrigger>
                  <TabsTrigger value="messages">Сообщения</TabsTrigger>
                  <TabsTrigger value="notifications">Уведомления</TabsTrigger>
                  <TabsTrigger value="settings">Настройки</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Информация профиля</CardTitle>
                      <CardDescription>
                        Управляйте информацией вашего профиля
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-center">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                              <User size={40} />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-xl font-medium">{userInfo.name}</h3>
                              <p className="text-gray-500">{userInfo.phone}</p>
                            </div>
                          </div>
                          <Button className="mt-4 lg:mt-0">Изменить профиль</Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Дата регистрации</h4>
                            <p>{userInfo.registeredDate}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Последний вход</h4>
                            <p>{userInfo.lastLogin}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Биометрическая защита</h4>
                            <p className="text-green-600">Активна</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Статус аккаунта</h4>
                            <p className="text-green-600">Активен</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Безопасность</CardTitle>
                      <CardDescription>
                        Управляйте настройками безопасности вашего аккаунта
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <div>
                          <h4 className="font-medium">Двухэтапная аутентификация</h4>
                          <p className="text-sm text-gray-500">Биометрическая верификация включена</p>
                        </div>
                        <Button variant="outline">Управление</Button>
                      </div>
                      
                      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <div>
                          <h4 className="font-medium">Изменить пароль</h4>
                          <p className="text-sm text-gray-500">Последнее изменение: никогда</p>
                        </div>
                        <Button variant="outline">Изменить</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">История входов</h4>
                          <p className="text-sm text-gray-500">Просмотр истории входов в аккаунт</p>
                        </div>
                        <Button variant="outline">Просмотр</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="ads">
                  <Card>
                    <CardHeader>
                      <CardTitle>Мои объявления</CardTitle>
                      <CardDescription>
                        Управляйте своими активными и архивными объявлениями
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus size={24} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">У вас пока нет объявлений</h3>
                          <p className="text-gray-500 mb-6">Разместите своё первое объявление прямо сейчас</p>
                          <Button>Разместить объявление</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="favorites">
                  <Card>
                    <CardHeader>
                      <CardTitle>Избранное</CardTitle>
                      <CardDescription>
                        Объявления, которые вы добавили в избранное
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart size={24} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">В избранном пока ничего нет</h3>
                          <p className="text-gray-500 mb-6">Добавляйте товары в избранное, чтобы не потерять их</p>
                          <Button>Найти товары</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages">
                  <Card>
                    <CardHeader>
                      <CardTitle>Сообщения</CardTitle>
                      <CardDescription>
                        Ваши сообщения с продавцами и покупателями
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare size={24} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Нет новых сообщений</h3>
                          <p className="text-gray-500 mb-6">Здесь будут отображаться ваши диалоги с пользователями</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Уведомления</CardTitle>
                      <CardDescription>
                        Настройте уведомления и просматривайте историю
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell size={24} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Нет новых уведомлений</h3>
                          <p className="text-gray-500 mb-6">Здесь будут отображаться ваши уведомления о важных событиях</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Настройки аккаунта</CardTitle>
                      <CardDescription>
                        Управляйте настройками вашего аккаунта
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                          <div>
                            <h4 className="font-medium">Настройки уведомлений</h4>
                            <p className="text-sm text-gray-500">Настройте получение уведомлений</p>
                          </div>
                          <Button variant="outline">Настроить</Button>
                        </div>
                        
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                          <div>
                            <h4 className="font-medium">Управление биометрией</h4>
                            <p className="text-sm text-gray-500">Настройки биометрической защиты</p>
                          </div>
                          <Button variant="outline">Настроить</Button>
                        </div>
                        
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                          <div>
                            <h4 className="font-medium">Приватность</h4>
                            <p className="text-sm text-gray-500">Настройки приватности и видимости</p>
                          </div>
                          <Button variant="outline">Настроить</Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-red-500">Удаление аккаунта</h4>
                            <p className="text-sm text-gray-500">Удаление всех данных и объявлений</p>
                          </div>
                          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
