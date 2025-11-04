import Image from "next/image";
import logo from "../../../public/assets/images/gowork_logo.png";
import bg_logo from "../../../public/assets/images/gowork_cover.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-screen">
        <div className="lg:w-[50%] w-full bg-white h-full">
          <main className="h-full">{children}</main>
        </div>

        <div
          className="hidden xl:flex w-[50%] h-full items-center justify-center bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `url(${bg_logo.src})`,
          }}
        >
          <div className="relative w-[40vw] max-w-[400px] 2xl:max-w-[500px] aspect-square min-h-[200px]">
            <Image
              src={logo}
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
