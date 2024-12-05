import { useEffect, useState } from 'react';
import { Grid } from 'react-loader-spinner';

const Loader = () => {
	const [primaryColor, setPrimaryColor] = useState('hsl(221.2, 83.2%, 53.3%)');

	useEffect(() => {
		const rootStyles = getComputedStyle(document.documentElement);
		const hslColor = rootStyles.getPropertyValue('--primary').trim();
		if (hslColor) {
			setPrimaryColor(`hsl(${hslColor.replace(/\s+/g, ', ')})`);
		}
	}, []);
	return (
		<div className="fixed inset-0 flex justify-center items-center bg-[#F8F8FF] h-screen">
			<Grid
				visible={true}
				height="80"
				width="80"
				color={primaryColor}
				ariaLabel="grid-loading"
				radius="12.5"
				wrapperStyle={{}}
				wrapperClass="grid-wrapper"
			/>
		</div>
	);
};

export default Loader;
