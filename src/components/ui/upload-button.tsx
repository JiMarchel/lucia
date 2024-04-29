import { UploadButton } from "@/lib/upload-thing";

export const UploadImage = ({
  setImageUrl,
}: {
  setImageUrl: (url: string) => void;
}) => {
  return (
    <UploadButton
      className="flex flex-col-reverse"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log(res);
        setImageUrl(res[0].url);
      }}
      onUploadError={(error: Error) =>
        console.log("UploadError", error.message)
      }
      content={{
        button: "Change Image",
        allowedContent: "Click edit first then save it for changes your image, max (4mb).",
      }}
      appearance={{
        container: "w-max flex justify-start",
        allowedContent: " flex justify-start text-white",
        button: "flex mr-auto"
      }}
      
    />
  );
};
