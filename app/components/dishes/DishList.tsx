'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { useAuthPopup } from '@/app/context/AuthPopupContext';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import DishDetails from './DishDetails';

interface Dish {
	id: number;
	title: string;
	summary: string;
	image: string;
}

const DishList = () => {
	const { openAuthPopup } = useAuthPopup();
	const [dishes, setDishes] = useState<Dish[]>([]);
	const [selectedDishId, setSelectedDishId] = useState<number | null>(null);

	useEffect(() => {
		const API_KEY = process.env.NEXT_PUBLIC_DISH_API_KEY;
		axios
			.get(
				`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`,
			)
			.then((response) => {
				console.log(response.data.recipes);
				setDishes(response.data.recipes); // В ответе ключ recipes
			})
			.catch((error) => {
				console.error('Error fetching dishes:', error);
			});
	}, []);

	// Выбор блюда для отображения деталей
	const handleDishClick = (id: number) => {
		setSelectedDishId(id);
	};

	// Сброс выбора блюда
	const handleBackToList = () => {
		setSelectedDishId(null);
	};

	return (
		<div>
			{/* Если выбрано блюдо, отображаем компонент с деталями */}
			{selectedDishId ? (
				<DishDetails id={selectedDishId} onBack={handleBackToList} />
			) : (
				<>
					<h1 className="mb-4 font-bold text-2xl">Dishes List</h1>
					<div>
						<div>
							{dishes.map((dish) => (
								<Card key={dish.id} className="mb-4">
									<CardHeader>
										<h2 className="font-semibold text-xl">{dish.title}</h2>
									</CardHeader>
									<CardContent>
										<p
											className="text-gray-500"
											dangerouslySetInnerHTML={{ __html: dish.summary }}
										/>
									</CardContent>
									<CardFooter>
										<button
											onClick={() => handleDishClick(dish.id)}
											className="text-blue-500"
										>
											More Details
										</button>
										<button
											onClick={() => openAuthPopup(false)}
											className="text-blue-500"
										>
											Add to fav
										</button>
									</CardFooter>
								</Card>
							))}
						</div>
						{/* {dishes.length > 0 ? (
							
						) : (
							<Loader />
						)} */}
					</div>
				</>
			)}
		</div>
	);
};

export default DishList;
