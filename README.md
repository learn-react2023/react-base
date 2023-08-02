## Комментарии к курсу - дополнительный модуль про бекенд
### Для начала нужно развернуть у себя локальный сервер

:white_check_mark: Скачайте себе архив send-github.zip    

:white_check_mark: Распакуйте архив, установите все необходимые зависимости    

:white_check_mark: Запустите сервер, используя команду `npm start` - данный проект представляет собой небольшое node.js приложение, написанное с использованием фреймворка Express, при желании можно изучить официальный сайт

### Далее. Настроить проксирование на клиенте

В реакте есть возможность использовать так называемое проксирование запросов, чтобы вы могли обращаться к необходимому серверу, используя в коде относительные ссылки. Для его настройки нужно выполнить следующие шаги:

:white_check_mark: Откройте файл package.json - в нем вам нужно добавить следующую строку `"proxy": "http://localhost:3000",`    

:white_check_mark: Перезапустите локальный сервер с клиентом    

Отлично, теперь у нас есть работающий бэкенд сервер, а также настроенная клиентская часть, которая может делать на этот сервер запросы. Основная задача данного этапа - реализация хранения данных приложения за его пределами. Ситуация, когда все данные стираются после каждой перезагрузки приложения, уместна для изучения непосредственно библиотеки React, но на практике все данные обычно вне клиентской части. В рамках этого проекта мы реализуем базовую логику, в которой данные будут записываться на сервер при создании новой записи о транзакции, а при каждом открытии страницы со статистикой - подгружаться с сервера. При этом при работе приложения список данных будет суммироваться, на основе того, что есть на сервере и того, что хранится ( пока ) в локальном стейте приложения. Давайте начнем.

### Внесение изменений в код клиентской части

:white_check_mark: Для начала настроим получение данных с сервера таким образом, чтобы они сразу записывались в локальное redux-хранилище нашего проекта. Для этого в файле App.js реализуем обращение к API и получим необходимые данные, которые по получении запишем в стейт.    

```javascript

useEffect(() => {

    ( async () => {

      const data = await fetch('/get-data', {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then(response => response.json())

      data.data.forEach(item => dispatch(setDataFromRedux(item)))

    })()

  }, [ dispatch ])

```

Обратите внимание, мы используем async / await в хуке useEffect, и здесь есть особенность. Базовый коллбек, которые вызывается в хуке лучше не использовать как асинхронную функцию, поэтому мы вызовем анонимную функцию, которая сразу же, на месте, и отработает. Внутри функции не происходит ничего особенного, получаем данные, затем пишем их в стейт. На практике есть другие варианты для записи данных с сервера в локальный стейт - но это обширная тема, по-хорошему, для отдельного курса, поэтому здесь мы будем рассматривать базовый вариант функционала.    
:white_check_mark: Далее нам нужно настроить отправку данных на сервер ( помимо записи в стейт ) при создании каждой новой записи транзакции. Для этого перейдем в файл Main.jsx и немного отредактируем функцию validation, которая отвечает за сохранение новых записей.

```javascript

const validation = () => {
  if ( formatValue.length > 2 && viewType ) {
    console.log('валидация прошла успешно')

    const dataLine = `${formatValue}::${viewType}::${viewComment}`

    action(dataLine)

    dispatch(changeValue(''))
    dispatch(changeViewType('доход'))
    dispatch(changeComment(''))

    fetch('/add-data', {
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" }, 
      body: JSON.stringify({
        value: dataLine
      })
    })

  } else console.log('ошибка валидации')
}

```

Обратите внимание на запись с функцией fetch - 

```javascript

fetch('/add-data', {
  method: 'POST',
  headers: { "Content-type": "application/json; charset=UTF-8" }, 
  body: JSON.stringify({
    value: dataLine
  })
})

```

Мы записываем данные на сервер в том же формате, каком пишем их в локальное хранилище. После этого у нас получается модель, в которой при работе с приложением все данные мы берем из локального хранилища Redux, записываем мы данные одновременно в стейт и на сервер ( при этом без необходимости ожидания, когда на стороне API они будут сохранены ) и имеем синхронизацию между сервером и клиентом, благодаря тому, что при первом запуске приложения все актуальные данные у нас получаются и пишутся в стейт. Как я уже упоминал, на практике есть иные способы избежать провисаний при обновлении данных в реальном времени, но они - предмет для отдельного изучения.