import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (info) => {
    console.log(info);

    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl) => {
      setLoading(true);
      setImageUrl(imageUrl);
    });
  };

  console.log(imageUrl);
  const uploadButton = (
    <div>
      {loading ? <AiOutlineLoading /> : <AiOutlinePlus />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="image"
        // onChange={(e) =>
        //   setUpdates((k) => ({ ...k, image: e.target.files[0] }))
        onChange={(e) => handleChange(e.target.files)}
      />

      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </>
  );
};

export default Upload;
