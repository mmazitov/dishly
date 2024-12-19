import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MdLanguage } from 'react-icons/md';

const LangSwitcher = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="focus-visible:outline-none">
				<Button
					variant="outline"
					className="flex justify-center items-center p-0 rounded-full !w-[50px] !h-[50px]"
				>
					<MdLanguage />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem className="focus:bg-transparent outline-none">
					<Button variant={'link'} className="justify-start p-0 w-auto h-auto">
						RU
					</Button>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="focus:bg-transparent outline-none">
					<Button variant={'link'} className="justify-start p-0 w-auto h-auto">
						ENG
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LangSwitcher;
