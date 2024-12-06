'use client';
import { useAuthPopup } from '@/app/context/AuthPopupContext';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';

const UserNav = () => {
	const { openAuthPopup } = useAuthPopup();

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger className="focus-visible:outline-none">
					<div className="flex items-center gap-x-3 px-2 lg:px-4 py-2 lg:py-2 border rounded-full">
						<MenuIcon className="w-6 lg:w-5 h-6 lg:h-5" />
						<Image
							src="https://static.vecteezy.com/system/resources/previews/020/911/737/large_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png "
							alt="User profile image"
							className="lg:block hidden rounded-full w-8 h-8"
						/>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem className="px-0 py-0 outline-none">
						<Button className="w-full" onClick={() => openAuthPopup(true)}>
							Login
						</Button>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="px-0 py-0 outline-none">
						<Button className="w-full" onClick={() => openAuthPopup(false)}>
							Sign Up
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserNav;
