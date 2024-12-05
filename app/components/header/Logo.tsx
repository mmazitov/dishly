import logoImg from '@/public/assets/logo.png';

import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
	return (
		<Link href="/">
			<Image src={logoImg} alt="logo" width={75} height={75} />
		</Link>
	);
};

export default Logo;
