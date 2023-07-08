import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { App } from 'app/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Register } from 'features/auth/Register/Register';
import { Login } from 'features/auth/Login/Login';
import { GlobalError } from 'common/components/GlobalError/GlobalError';
import 'react-toastify/dist/ReactToastify.css';
import { Packs } from 'features/packs/Packs/Packs';
import { Counter } from 'features/counter/Counter';
import { Cards } from 'features/cards/componets/Cards/Cards';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Counter/>,
	},
	{
		path: '/login',
		element: <Login/>,
	},
	{
		path: '/register',
		element: <Register/>,
	},
	{
		path: '/packs',
		element: <Packs/>,
	},
	{
		path: '/cards/:packId',
		element: <Cards/>,
	},
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<GlobalError/>
		<App/>
		<RouterProvider router={router}/>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
