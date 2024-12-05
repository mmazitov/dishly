const getServerSideProps = async () => {
	const API_KEY = process.env.NEXT_PUBLIC_DISH_API_KEY;
	const res = await fetch(
		`https://api.spoonacular.com/recipes/716429/information?apiKey=${API_KEY}&includeNutrition=true`,
	);
	const data = await res.json();

	return {
		props: {
			dishes: [data], // Ensure data is an array
		},
	};
};

export default getServerSideProps;
