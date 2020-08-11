This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Тестовое задание для фронтенд-разработчиков

Мы ищем сильного фронтендера, который вольется в нашу команду и поможет ей двигаться вперед.

Предлагаем вам решить тестовое задание. Нужно написать приложение, с помощью которого можно анализировать информацию, собранную фитнес-трекером.

Для разработки можно использовать шаблон на основе *Create React App*. Он уже есть в репозитории. Или вы можете создать проект с нуля и настроить его самостоятельно. 

## Условие задачи

Приложение состоит из таблицы (обязательно) и графика (опционально).

Таблица заполняется данными, которые запрашиваются из JSON-файла с помощью API в [этом репозитории](https://github.com/itrevolution-perm/test-task-api). Проект нужно склонировать на свой компьютер и запустить.

График показывает активность пользователя. По оси X расположены дни, по Y — пройденное расстояние.

Макет: [ссылка](https://www.figma.com/file/LHQfVGPTQ7gNrx4jk46asl/Artboard1?node-id=0%3A1). Мы не гонимся за pixel-perfect, но заметим, если что-то сильно расходится с оригиналом.

## Требования к решению

- Необходимо использовать любой инструмент для управления состоянием (помимо встроенного в выбранный фреймворк). Например, Redux.
- Пользователь должен иметь возможность:
  - Увидеть в таблице все произошедшие прогулки
  - Отсортировать таблицу по дате или по расстоянию
  - Изменить данные о существующей прогулке
  - Добавить новую запись
  - Удалить запись

Используйте любые инструменты, которые помогут вам быстро и качественно решить задачу.

### Рекомендуемый стек для React-разработчиков
 - TypeScript, 
 - React, 
 - Redux, 
 - Styled Components.
 
### Рекомендуемый стек для Vue-разработчиков
 - TypeScript, 
 - Vue, 
 - Vuex. 

### Дополнительные задания

Будет плюсом, если вы:

- ⭐ Добавите график, на котором отображается активность пользователя по дням
- ⭐ Напишете тесты
- ⭐ Используете типы при разработке
- ⭐ Добавите всплывающее окно, в котором можно автоматически рассчитать расстояние по двум точкам на карте. Для работы с картой можно использовать любое API, которое вам нравится: Яндекс.Карты, Google Maps, OpenStreetMap...

## Что мы проверяем

- Качество архитектуры приложения
- Выбор подходящих инструментов
- Знание Javascript и React/Vue, их новых возможностей
- Как быстро кандидат может изучить новые технологии
- Адаптивность
- Кроссбраузерность. Мы не просим верстать под IE, но в основных современных браузерах (Chrome, Safari, Firefox, Opera, Edge) не должно быть явных артефактов.

