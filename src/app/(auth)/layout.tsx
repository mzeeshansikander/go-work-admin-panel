import Image from "next/image";
import sideImage from "../../../public/assets/images/gowork_logo.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-screen">
        <div className=" lg:w-[50%] w-full bg-white h-full">
          <main className="h-full">{children}</main>
        </div>
        <div className="hidden xl:flex w-[50%] h-full items-center justify-center bg-[url(/assets/images/gowork_cover.png)] bg-cover bg-center overflow-hidden">
          <div className="relative w-[40vw] max-w-[400px] 2xl:max-w-[500px] aspect-[1/1] min-h-[200px]">
            <Image
              src="/assets/images/gowork_logo.png"
              alt="GoWork Logo"
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 40vw, 500px"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
