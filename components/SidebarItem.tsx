import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon: IconType;
    name: string;
    active: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    // El icono es un componente de react, por lo que se debe importar como un componente de react
    icon: Icon,
    name,
    active,
    href
}) => {
    return ( 
        <Link href={href} className={twMerge(`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`, active && 'text-white')}>
            <Icon size={26} />
            <p className="truncate w-ful">{name}</p>
        </Link>

    );
}
 
export default SidebarItem;