import LangSwitcher from './LangSwitcher';
import Logo from './Logo';
import ThemeSwitcher from './ThemeSwitcher';
import UserNav from './UserNav';

const Header = () => {
	return (
		<header className="border-primary py-2 border-b-2 header">
			<div className="flex justify-between items-center container">
				<UserNav />
				<Logo />
				<ThemeSwitcher />
				<LangSwitcher />
			</div>
		</header>
	);
};

export default Header;
