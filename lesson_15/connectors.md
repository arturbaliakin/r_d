https://rozetka.com.ua/

Тест-кейс №1
1. Перехід у розділ "Ноутбуки та комп’ютери" в каталозі із Side menu
.sidebar-theme.pb-2 li[data-index="0"] a[data-testid]
2. Перехід до "Очисних засобів"
.d-block.relative a[title = "Очисні засоби"]
3. Вибір 3-го елементу у каталозі
.item:nth-child(3)

Тест-кейс №2
1. Кнопка "Офромити замовлення" на головній сторінці, після додавання товару у кошик
.main-notification__buttons a[class="button--medium button button--green"]
2. Селектор кнопки для згортання контактної інформації
.toggle-form.ng-untouched.ng-dirty.ng-valid.open button

Тест-кейс №3
1. Відкрити каталог товарів
.relative.d-flex.items-center button[data-testid="fat_menu_btn"]
2. Вибір зимових шин у каталозі в розділі "Авто і мото", категорії "Шини та диски"
.list-content-item ul[class = "mt-1"] a[href*= "zimnie-272703"]
3. Заповнити дані по кожному із чотирьох селекторів
.widget-auto div[class = "choose-auto__cell"]:nth-child(1)
.widget-auto div[class = "choose-auto__cell"]:nth-child(2)
.widget-auto div[class = "choose-auto__cell"]:nth-child(3)
.widget-auto div[class = "choose-auto__cell"]:nth-child(4)
4. Натиснути "Застосувати"
.widget-auto div[class = "choose-auto__footer"] button:nth-child(2)