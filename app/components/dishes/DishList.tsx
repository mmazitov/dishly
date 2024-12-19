'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { useAuthPopup } from '@/app/context/AuthPopupContext';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { MdOutlineStar } from 'react-icons/md';
import DishDetails from './DishDetails';

interface Dish {
	id: number;
	title: string;
	summary: string;
	image: string;
	dishTypes: [];
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
					<h1 className="mb-4 font-bold text-[var(--page-heading)] text-2xl">
						Dishes
					</h1>
					<ResponsiveMasonry
						columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
					>
						<Masonry gutter="35px">
							{dishes.map((dish) => (
								<Card key={dish.id}>
									<CardHeader>
										<h2 className="font-semibold text-xl">{dish.title}</h2>
									</CardHeader>
									<CardContent className="border-primary border-b-2">
										<Image
											src={
												dish?.image ||
												'https://placecats.com/millie_neo/300/200'
											}
											alt={dish?.title || 'Dish image'}
											width={300}
											height={200}
											className="block mb-[10px]"
										/>
										<p
											dangerouslySetInnerHTML={{ __html: dish.dishTypes }}
											className="break-all"
										/>
									</CardContent>
									<CardFooter className="flex justify-between items-center p-6">
										<Button
											onClick={() => handleDishClick(dish.id)}
											variant="link"
										>
											More Details
										</Button>
										<Button
											onClick={() => openAuthPopup(false)}
											variant="outline"
										>
											<MdOutlineStar className="!w-[32px] !h-[32px]" />
										</Button>
										<Button
											onClick={() => openAuthPopup(false)}
											variant="destructive"
										>
											<MdOutlineStar className="!w-[32px] !h-[32px]" />
										</Button>
									</CardFooter>
								</Card>
							))}
						</Masonry>
					</ResponsiveMasonry>
					{/* {dishes.length > 0 ? (
							
						) : (
							<Loader />
						)} */}
				</>
			)}
		</div>
	);
};

export default DishList;
