# Документация REST API

Для ознакомления с API очень удобно использовать специально приложение [Postman](https://www.getpostman.com/), 
которое представляет собой консоль разработчика и позволяет выполнять произвольные вызовы к REST API 
прямо из приложения, ориентируясь на примеры кода.

> ##### Точка входа:
> **http://{IP_CONTROLLER}/api/v1/client**  
> Где переменная **{IP_CONTROLLER}** является IP адресом контроллера в вашей локальной сети.

## Заголовки:
**Content-Type: application/x-www-form-urlencoded** или **application/json**   
**Authorization: {TOKEN_KEY}**  

## Авторизация:
Все запросы должны быть подписанны специальным Token ключом. Данный ключ можно сгенерировать в настройках контроллера.
 
## Методы:

#### Получить все секции
* **URL:** `/section`
* **Method:** `GET`
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `[{"id": 1, "name": "Backholder 1"}, {"id": 2, "name": "Backholder 2"}]`
 
* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Set token Authorization" }`
    
  OR
    
  * **Code:** 500 SERVER ERROR <br/>
    **Content:** `{ error : "Message" }`


