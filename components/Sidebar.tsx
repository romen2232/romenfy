// Use client porque es un componente que se renderiza en el navegador
"use client";

import { usePathname } from 'next/navigation'
import { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import { Song } from '@/types';

// defino la interfaz de las props
interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

// defino el componente Sidebar
const Sidebar: React.FC<SidebarProps> = ({ children, songs }) =>{

    // Hook usePathname para obtener la ruta actual
    const pathname = usePathname()
    
    // Hook useMemo para memorizar el array de rutas y no tener que volver a crearlo cada vez que se renderiza el componente
    //TODO search
    const routes = useMemo(() => [
        { name: 'Home', icon: HiHome, active: pathname !== '/search', href: '/' },
        { name: 'Search', icon: BiSearch, active: pathname === '/search', href: '/search'}
    ], [])

    return (
        <div className="flex h-full">
            <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-80 p-2'>
                <Box>
                    <div className='flex flex-col gap-y-4 px-5 py-4'>
                        {routes.map((route, index) => (
                            <SidebarItem key={index} {...route} />
                        )    )
                        }
                    </div>
                </Box>
                <Box className='overflow-y-auto h-full'>
                    <Library songs={songs}/>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}

export default Sidebar;