
import FullPageImageView from "~/app/components/full-image-page";
import { getImage } from "~/server/queries";


export default async function PhotoModal({
    params,
}:{
    params: {
        id: string,
    };
}) {
    const photoId = await params.id;
   const idAsNumber = Number(photoId);

  if (Number.isNaN(idAsNumber)) throw new Error ("Invalid Photo Id")

    const image = await getImage(idAsNumber);

    return(  
        <div className="flex h-full min-h-0 w-full  min-w-0  overflow-y-hidden">
                <FullPageImageView photoId={photoId}/>
        </div>
    );
}