'use client';

import DishList from './components/dishes/DishList';
import Header from './components/header/Header';

export default function Home() {
	return (
		<div>
			<Header />
			<DishList />
		</div>
	);
}
