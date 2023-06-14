"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({
    image,
    name,
    href
}) => {

    const router = useRouter();

    //Cuando se haga click en el componente, se redirigirá a la ruta especificada en href
    const onClick = () => {
        //TODO añadir autenticación antes del push
        router.push(href);
    }

    return ( 
        <button onClick={onClick} className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            <div className="relative h-[64px] w-[64px]">
                <Image className="object-cover" fill src={image} alt={name}/>
            </div>
                <p className="font-medium truncate py-5">{name}</p>
                <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 scale-75 hover:scale-90 ">
                    <FaPlay className="text-black"/>
                </div>
        </button>
    );
}
 
export default ListItem;