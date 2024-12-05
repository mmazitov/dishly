'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface DishDetailsProps {
	id: number;
	onBack: () => void; // Функция для возврата к списку
}

interface Dish {
	title: string;
	instructions: string;
	image: string;
}

const DishDetails = ({ id, onBack }: DishDetailsProps) => {
	const [dish, setDish] = useState<Dish | null>(null);
	const API_KEY = process.env.NEXT_PUBLIC_DISH_API_KEY;

	useEffect(() => {
		axios
			.get(
				`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
			)
			.then((response) => {
				setDish(response.data);
			})
			.catch((error) => {
				console.error('Error fetching dish details:', error);
			});
	}, [id, API_KEY]);

	return (
		<div>
			<Button onClick={onBack} className="mb-4">
				Back to List
			</Button>
			<Card className="dish">
				<CardHeader>
					<h2 className="font-bold text-2xl">{dish?.title}</h2>
				</CardHeader>
				<CardContent className="flex flex-nowrap gap-x-5 border-primary py-2 pt-0 pb-6 border-b-2">
					<img src={dish?.image} alt={dish?.title} className="w-full" />
					<p dangerouslySetInnerHTML={{ __html: dish?.instructions }} />
				</CardContent>
				<CardFooter className="flex justify-end gap-x-5 pt-6">
					<Button>add fav</Button>
					<Button>remove fav</Button>
					<Button>add to menu</Button>
					<Button>remove from menu</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default DishDetails;
