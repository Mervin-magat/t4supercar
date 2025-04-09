import { error } from "console";
import { ne } from "drizzle-orm";
import { number } from "zod";
import { getImage } from "~/server/queries";
import { Modal } from "./modal";
import FullPageImageView from "~/app/components/full-image-page";

export default async function PhotoModal({
    params,
}:{
    params: {
        id: string,
    };
}) {
const photoId = (await params).id;
    return(
      <Modal>
       {/* <img src={image.url} alt={image.name} className="w-96"/>*/}
         <FullPageImageView photoId={photoId}/>
     </Modal>

     // <div>{photoId}</div>
    );
}