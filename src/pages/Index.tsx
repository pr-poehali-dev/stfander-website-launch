
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [gameId, setGameId] = useState("");

  const goldItems = [
    { amount: "100G", price: "30 RUB", imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=2000" },
    { amount: "500G", price: "150 RUB", imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=2000" },
    { amount: "1000G", price: "350 RUB", imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=2000" },
    { amount: "3000G", price: "1000 RUB", imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=2000" },
  ];

  const cases = [
    { name: "Стандартный кейс", price: "25 RUB", imageUrl: "https://images.unsplash.com/photo-1595323397978-65433d8e64bb?q=80&w=2000" },
  ];

  const handleBuy = (itemType, item) => {
    if (!gameId) {
      alert("Пожалуйста, введите ваш ID в игре");
      return;
    }
    
    // Здесь была бы интеграция с платежной системой ЮMoney
    alert(`Товар "${item.amount || item.name}" добавлен в корзину. Заявка будет обработана после оплаты.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Шапка сайта */}
      <header className="py-6 px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-yellow-500">STFANDER</h1>
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">OFFICIAL</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-yellow-500 transition-colors">Главная</Link>
            <Link to="/" className="hover:text-yellow-500 transition-colors">Как купить</Link>
            <Link to="/" className="hover:text-yellow-500 transition-colors">Поддержка</Link>
          </nav>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Войти</Button>
        </div>
      </header>

      {/* Основная часть */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Форма ввода ID */}
        <div className="max-w-md mx-auto mb-12 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Введите ваш ID в игре Stadoff2</h2>
          <div className="flex gap-2">
            <Input 
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Ваш ID в игре" 
              className="bg-gray-700 border-gray-600"
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Сохранить</Button>
          </div>
          <p className="text-gray-400 text-sm mt-2">ID необходим для доставки товаров в игру</p>
        </div>

        {/* Табы с товарами */}
        <Tabs defaultValue="gold" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="gold" className="text-lg">Голда</TabsTrigger>
            <TabsTrigger value="cases" className="text-lg">Кейсы</TabsTrigger>
          </TabsList>
          
          {/* Вкладка Голда */}
          <TabsContent value="gold">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {goldItems.map((gold, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden hover:border-yellow-500 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={gold.imageUrl} alt={gold.amount} className="object-cover w-full h-full" />
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded font-bold">
                      {gold.amount}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{gold.amount} Голды</CardTitle>
                    <CardDescription className="text-gray-400">Пополнение баланса в игре</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-xl font-bold">{gold.price}</span>
                    <Button 
                      onClick={() => handleBuy("gold", gold)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      Купить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Вкладка Кейсы */}
          <TabsContent value="cases">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cases.map((caseItem, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden hover:border-yellow-500 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={caseItem.imageUrl} alt={caseItem.name} className="object-cover w-full h-full" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{caseItem.name}</CardTitle>
                    <CardDescription className="text-gray-400">Шанс выпадения редкого ножа</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-xl font-bold">{caseItem.price}</span>
                    <Button 
                      onClick={() => handleBuy("case", caseItem)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      Купить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Информация о способе оплаты */}
        <div className="mt-16 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Способы оплаты</h2>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <img 
                src="https://images.unsplash.com/photo-1593672715438-d88a1cf7a48f?q=80&w=2080" 
                alt="ЮMoney" 
                className="w-12 h-12 object-contain"
              />
              <span>ЮMoney</span>
            </div>
            <div className="text-center mt-4 w-full">
              <p className="text-gray-400">После покупки товар добавляется в ваш инвентарь на сайте. 
              Заявка обрабатывается администратором после подтверждения ID.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Футер */}
      <footer className="py-8 px-4 md:px-6 bg-gray-900 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-yellow-500">STFANDER</h2>
              <p className="text-gray-400">Официальный магазин доната для Stadoff2</p>
            </div>
            <div className="flex gap-4">
              <Link to="/" className="text-gray-400 hover:text-white">Условия использования</Link>
              <Link to="/" className="text-gray-400 hover:text-white">Политика конфиденциальности</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500">
            <p>© 2025 STFANDER. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
