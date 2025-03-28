import { error } from "console";
import { ne } from "drizzle-orm";
import { number } from "zod";
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

    return(  <FullPageImageView id={idAsNumber}/>
    );
}