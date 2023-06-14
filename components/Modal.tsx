import * as Dialog from '@radix-ui/react-dialog';
import {IoMdClose} from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onChange:(open: boolean)=>void;
    title: string;
    description: string; 
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onChange, title, description, children}) => {
    return ( 
            <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="inset-0 bg-neutral-900/90 backdrop-blur-sm fixed" />
                    <Dialog.Content className="fixed drop-shadow-sm border border-neutral-700 top-1/2 left-1/2 max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vh] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none">
                        <Dialog.Title className="text-white text-xl font-bold mb-4 text-center">{title}</Dialog.Title>
                        <Dialog.Description className="text-white text-sm leading-normal text-center mb-4">{description}</Dialog.Description>
                        <div className="">
                            {children}
                        </div>
                        <Dialog.Close className="absolute top-4 right-4 hover:text-white text-white/80 transition" aria-label="Close">
                            <button>
                                <IoMdClose className="text-xl"/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal> 
            </Dialog.Root>
         );
}
 
export default Modal;