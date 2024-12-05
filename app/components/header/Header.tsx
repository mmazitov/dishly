import Logo from './Logo';
import UserNav from './UserNav';

const Header = () => {
	return (
		<header className="border-primary py-2 border-b-2 header">
			<div className="flex justify-between items-center container">
				<Logo />
				<UserNav />
			</div>
		</header>
	);
};

export default Header;
