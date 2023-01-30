# Roox test

Project: [roox_test](https://vladzinovev.github.io/roox_test/).

**[Основная страница]** - первое, что видит пользователь. Это вход в БД.

![LANDING](docs/1.PNG)

## Пользование БД

Сначала мы входим в нашу БД через кнопку (это было реализовано для того чтобы можно было изменять профиль любого пользователя и видеть изменения в системе), но также после изменения профиля есть вывод в консоль.

## Страница с пользователями

![LANDING](docs/2.PNG)

На данной странице можно перейти в любой профиль пользователя для редактирования, а также отсротировать по городу и по названию компании, по умолчания я реализовал сортировку по ФИО.

## Страница редактирования

![LANDING](docs/3.PNG)

На странице редактирования мы можем изменить предоставленные нам поля, но только после нажатия кнопки "редактировать", кнопка отправить не доступна. Как только нажали редактировать, получаем доступ к изменению полей, на каждое поле добавлена валидация на пустоту, длину символов и корректность ввода (исходя из данных https://jsonplaceholder.typicode.com/users). Если какое то поле  не правильно заполнено, то кнопка "отправить" не будет срабатывать для отправки данных. После того как все правильно ввели, нажимаем "отправить", данные формируются в json и выводятся в консоль, помимо этого я реализовал сохранение измененного пользователя в массив. Для того чтобы можно было нажать на кнопку "назад" и посмотреть на наши изменения, так же можем потом снова вернуться к этому пользователю и изменения останутся прежними.


[Запрос через axios](https://jsonplaceholder.typicode.com/users)

## Стек технологий

```
React
TypeScript
Axios
Scss
Redux toolkit
```
