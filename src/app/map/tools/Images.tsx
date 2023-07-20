"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Rnd } from "react-rnd";
import Image from "next/image";
import {
  setImageUrls,
  setSelectedImage
} from "@/redux/features/imageUrlsSlice";
import { RiCloseCircleFill } from "react-icons/ri";
import { updateFSImages } from "@/app/utils/firestoreUpdater";
import { useEffect } from "react";
import { getFSImages } from "@/app/utils/firestoreUpdater";

export default function Images() {
  const allImages = useAppSelector((state) => state.imageUrls.allImages);
  const userUid = useAppSelector((state) => state.userInfo.uid);
  const selectedMap = useAppSelector((state) => state.userInfo.selectedMap);
  const selectedImage = useAppSelector(
    (state) => state.imageUrls.selectedImage
  );
  const dispatch = useAppDispatch();

  function deleteHandler() {
    const newImageUrls = allImages.filter(
      (imageUrl) => imageUrl !== selectedImage
    );
    dispatch(setImageUrls(newImageUrls));
    updateFSImages();
  }

  useEffect(() => {
    getFSImages();
  }, [userUid, selectedMap]);

  return (
    <div className="absolute left-0 top-0 z-10">
      {allImages.map((imageUrl, index) => (
        <Rnd
          key={index}
          className={`${
            imageUrl === selectedImage ? "border-2 border-mindchat-primary" : ""
          }`}
          minWidth={150}
          minHeight={100}
          maxWidth={innerWidth}
          maxHeight={innerHeight}
          default={{ x: 50, y: 50, width: 300, height: 200 }}
          disableDragging={false}
          onMouseDown={() => dispatch(setSelectedImage(imageUrl))}
        >
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            className="h-full w-full align-top"
            alt={imageUrl}
            draggable={false}
          />
          <div
            className={`absolute right-[-12px] top-[-12px] z-20 text-2xl text-mindchat-primary hover:text-mindchat-focus ${
              imageUrl === selectedImage ? "block" : "hidden"
            }`}
            onClick={deleteHandler}
          >
            <RiCloseCircleFill />
          </div>
        </Rnd>
      ))}
    </div>
  );
}
