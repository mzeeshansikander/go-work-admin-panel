import Image from "next/image";
import React from "react";
import background_loader_gif from "../../../public/assets/images/2a6c0ebbae09bfc38b8c1257401617dc9f84b1be.gif";

export default function LoaderOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="aspect-square w-[120px] h-[120px]">
        <Image src={background_loader_gif} alt="background loader" />
      </div>
    </div>
  );
}
