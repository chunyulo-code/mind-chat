import Image from "next/image";
import homeImage from "@/img/homeImage.png";
import Header from "./components/Header";
import MapPageButton from "./components/ToMapPageButton";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-tr from-mindchat-bg-dark to-mindchat-bg-dark-darker">
      <div className="relative h-full w-full overflow-hidden">
        <DemoImage />
        <div className="relative mx-auto h-full w-full px-[130px] lg:px-[65px] sm:px-[40px]">
          <Header />
          <MainContent />
        </div>
      </div>
    </div>
  );
}

function DemoImage() {
  return (
    <Image
      src={homeImage}
      width={1400}
      alt="Using MindChat in multi-devices"
      className="absolute right-[-490px] top-[200px] 2xl:right-[-650px] lg:hidden"
    />
  );
}

function MainContent() {
  return (
    <main className="flex h-full w-1/2 items-center pt-[50px] text-start lg:w-full lg:text-center">
      <div className="flex w-full flex-col gap-[60px] pr-[46px] xl:pr-0 lg:items-center md:gap-[80px]">
        <p className="text-[35px] font-bold leading-[80px] text-white md:leading-[55px] sm:text-[28px]">
          Immerse in Visual Thinking
          <br />
          <span className="text-[110px] font-black leading-[120px] text-mindchat-primary md:text-[85px]">
            MIND CHAT
          </span>
          , <br />
          Your Gateway
        </p>
        <p className="w-4/5 text-[16px] font-normal leading-[34px] tracking-wider text-mindchat-secondary lg:w-1/2 md:hidden">
          a web application that facilitates visual thinking for users by
          combining mind maps and ChatGPT.
        </p>
        <MapPageButton />
      </div>
    </main>
  );
}
