
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface InventoryItem {
  id: string;
  type: "gold" | "case";
  name: string;
  amount?: string;
  status: "pending" | "completed";
  date: string;
  imageUrl: string;
}

const Profile = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "inv-1",
      type: "gold",
      name: "Золото",
      amount: "500G",
      status: "completed",
      date: "01.05.2025",
      imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=2000"
    },
    {
      id: "inv-2",
      type: "case",
      name: "Стандартный кейс",
      status: "pending",
      date: "01.05.2025",
      imageUrl: "https://images.unsplash.com/photo-1595323397978-65433d8e64bb?q=80&w=2000"
    },
  ]);

  const [gameId, setGameId] = useState("12345678");
  const [transactions, setTransactions] = useState([
    {
      id: "tx-1",
      amount: "150 RUB",
      date: "01.05.2025",
      status: "успешно"
    },
    {
      id: "tx-2",
      amount: "25 RUB",
      date: "01.05.2025",
      status: "в обработке"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Шапка сайта */}
      <header className="py-6 px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <h1 className="text-3xl font-bold text-yellow-500">STFANDER</h1>
            </Link>
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">OFFICIAL</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-yellow-500 transition-colors">Главная</Link>
            <Link to="/" className="hover:text-yellow-500 transition-colors">Как купить</Link>
            <Link to="/" className="hover:text-yellow-500 transition-colors">Поддержка</Link>
            <Link to="/profile" className="text-yellow-500">Личный кабинет</Link>
          </nav>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Выйти
          </Button>
        </div>
      </header>

      {/* Основная часть */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
          <div className="flex items-center gap-2 text-yellow-500">
            <Icon name="User" size={20} />
            <span>ID в игре: {gameId}</span>
          </div>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="inventory" className="text-lg">Инвентарь</TabsTrigger>
            <TabsTrigger value="transactions" className="text-lg">История платежей</TabsTrigger>
          </TabsList>
          
          {/* Вкладка Инвентарь */}
          <TabsContent value="inventory">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory.map((item) => (
                <Card key={item.id} className="bg-gray-800 border-gray-700 overflow-hidden hover:border-yellow-500 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                    {item.amount && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded font-bold">
                        {item.amount}
                      </div>
                    )}
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded font-bold ${
                      item.status === "completed" ? "bg-green-500" : "bg-orange-500"
                    }`}>
                      {item.status === "completed" ? "Получено" : "В обработке"}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription className="text-gray-400">Получено: {item.date}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    {item.status === "pending" ? (
                      <Button className="w-full bg-gray-700 hover:bg-gray-600">
                        Ожидает обработки
                      </Button>
                    ) : (
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Доставлено в игру
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
              
              {inventory.length === 0 && (
                <div className="col-span-full text-center py-12 bg-gray-800 rounded-lg">
                  <Icon name="PackageOpen" size={64} className="mx-auto mb-4 text-gray-600" />
                  <h3 className="text-2xl font-bold mb-2">Ваш инвентарь пуст</h3>
                  <p className="text-gray-400 mb-4">У вас пока нет приобретенных товаров</p>
                  <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Link to="/">Перейти в магазин</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Вкладка Транзакции */}
          <TabsContent value="transactions">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 font-semibold">
                <div>ID транзакции</div>
                <div>Сумма</div>
                <div>Дата</div>
                <div>Статус</div>
              </div>
              {transactions.map((tx) => (
                <div key={tx.id} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750">
                  <div className="text-yellow-500">{tx.id}</div>
                  <div>{tx.amount}</div>
                  <div>{tx.date}</div>
                  <div className={tx.status === "успешно" ? "text-green-500" : "text-orange-500"}>
                    {tx.status}
                  </div>
                </div>
              ))}
              
              {transactions.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Receipt" size={64} className="mx-auto mb-4 text-gray-600" />
                  <h3 className="text-2xl font-bold mb-2">История платежей пуста</h3>
                  <p className="text-gray-400">У вас пока нет совершенных платежей</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
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

export default Profile;
