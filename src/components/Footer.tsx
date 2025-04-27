
const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">О компании</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">О нас</a></li>
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Вакансии</a></li>
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Контакты</a></li>
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Правовые вопросы</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Сервисы и приложения</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Мобильное приложение</a></li>
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Авито для бизнеса</a></li>
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Платные услуги</a></li>
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Реклама на сайте</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Помощь</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Безопасность</a></li>
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Правила размещения</a></li>
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Центр поддержки</a></li>
              <li><a href="#" className="text-gray-600 hover:text-avito-blue">Карта сайта</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Мы в соцсетях</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">VK</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">OK</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">YT</a>
            </div>
            <p className="text-sm text-gray-600">© ООО «Авито», 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
