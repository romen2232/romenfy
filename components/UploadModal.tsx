"use client";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading]=useState(false);
    const uploadModal = useUploadModal();
    const {user}=useUser();
    const supabaseClient=useSupabaseClient();
    const router=useRouter();

    const {register, handleSubmit, reset}=useForm<FieldValues>({
        defaultValues: {
            title: '',
            author: '',
            song: null,
            image: null,
            lyrics: null,
        }
    });

    const onChange = (open: boolean) => {
        if(!open){
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const songFile=values.song?.[0];
            const imageFile=values.image?.[0];
            const lyricsFile=values.lyrics?.[0];
            if(!imageFile || !songFile || !lyricsFile || !user){
                toast.error("Missing fields");
                return;
            }
            const uniqueID=uniqid();

            const {
                data: songData,
                error: songError
            } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`, songFile, {cacheControl: '3600', upsert: false});

            if(songError){
                setIsLoading(false);
                toast.error("Failed song upload");
                return;
            }

            const {
                data: imageData,
                error: imageError
            } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`, imageFile, {cacheControl: '3600', upsert: false});

            if(imageError){
                setIsLoading(false);
                toast.error("Failed image upload");
                return;
            }

            const {
                data: lyricsData,
                error: lyricsError
            } = await supabaseClient.storage.from('lyrics').upload(`lyrics-${values.title}-${uniqueID}`, lyricsFile, {cacheControl: '3600', upsert: false});

            if(lyricsError){
                setIsLoading(false);
                toast.error("Failed lyrics upload");
                return;
            }

            const {error: supabaseError} = await supabaseClient.from('songs').insert({
                title: values.title,
                author: values.author,
                image_path: imageData?.path,
                song_path: songData?.path,
                lyrics_path: lyricsData?.path,
                user_id: user.id,
            })

            if(supabaseError){
                setIsLoading(false);
                toast.error("Failed upload");
                return;
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song uploaded");
            reset();
            uploadModal.onClose();

        } catch (error) {
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
    }



    return ( 
        <Modal title='Add a song'
        description="Upload a mp3 file"
        isOpen={uploadModal.isOpen}
        onChange={()=>{}}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", {required: true})}
                    placeholder="Song title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register("author", {required: true})}
                    placeholder="Song author"
                />
                <div>
                <span className="pb-1">
                    Select a song
                </span>
                <Input
                    id="song"
                    type="file"
                    disabled={isLoading}
                    accept=".mp3"
                    {...register("song", {required: true})}
                    placeholder="Song File"
                />
                </div>
                <div>
                <span className="pb-1">
                Select the lyrics
                </span>
                <Input
                    id="lyrics"
                    type="file"
                    disabled={isLoading}
                    accept=".srt"
                    {...register("lyrics", {required: true})}
                    placeholder="Lyrics File"
                />
                </div>
                <div>
                    <span className="pb-1">
                    Select an image
                    </span>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register("image", {required: true})}
                        placeholder="Song File"
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
     );
}
 
export default UploadModal;