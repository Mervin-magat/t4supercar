import { clerkClient } from "@clerk/clerk-sdk-node";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
    const image = await getImage(props.id);
    if (!image?.userId) return <div>Error: No uploader found.</div>;

    let uploaderInfo = null;
    try {
        uploaderInfo = await clerkClient.users.getUser(image.userId);
    } catch (error) {
        console.error("Error fetching user:", error);
    }

    const fullName = uploaderInfo?.firstName && uploaderInfo?.lastName
        ? `${uploaderInfo.firstName} ${uploaderInfo.lastName}`
        : uploaderInfo?.username || "Unknown User";

    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-gray-950 text-white p-6">
            <div
                className="absolute inset-0 bg-cover bg-center blur-xl opacity-30"
                style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className="relative flex flex-col items-center w-full max-w-3xl p-6 bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl border border-gray-800">
                <img
                    src={image.url}
                    alt={image.name}
                    className="max-h-[70vh] w-auto rounded-lg shadow-lg object-contain border border-gray-700"
                />
                <div className="mt-6 w-full text-center">
                    <h2 className="text-3xl font-bold text-white">{image.name}</h2>
                    <div className="mt-3 text-gray-400 space-y-2">
                        <p>📤 Uploaded by: {fullName}</p>
                        <p>📅 Created At: {new Date(image.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
