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
import userImage from '@/public/assets/user-profile.webp';
import { MenuIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UserNav = () => {
	const router = useRouter();
	const { openAuthPopup } = useAuthPopup();
	const { data: session, status } = useSession();

	const handleLogout = async () => {
		router.push('/');
		await signOut({ redirect: false });
	};

	useEffect(() => {
		console.log('Session status:', status);
		console.log('Session data:', session);
	}, [session, status]);

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger className="focus-visible:outline-none">
					<div className="flex items-center gap-x-3 px-2 lg:px-4 py-2 lg:py-2 border rounded-full">
						<MenuIcon className="w-6 lg:w-5 h-6 lg:h-5" />
						<Image
							src={session?.user?.image || userImage}
							width={32}
							height={32}
							alt="User profile image"
							className="lg:block hidden rounded-full w-8 h-8"
						/>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{session ? (
						<>
							<DropdownMenuItem className="px-0 py-0 outline-none">
								<Button
									className="w-full"
									onClick={() => router.push('/pages/profile')}
								>
									Profile
								</Button>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="px-0 py-0 outline-none">
								<Button
									className="w-full"
									variant="destructive"
									onClick={handleLogout}
								>
									Logout
								</Button>
							</DropdownMenuItem>
						</>
					) : (
						<>
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
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserNav;
