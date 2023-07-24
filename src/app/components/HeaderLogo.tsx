import Link from "next/link";
import Image from "next/image";

function LogoImage({ logoSize }: { logoSize: number }) {
  return (
    <Image
      src="/mindChat.svg"
      alt="Mind Chat Logo"
      width={logoSize}
      height={logoSize}
      style={{ cursor: "pointer" }}
    />
  );
}

function LogoText() {
  return (
    <span className="ml-5 text-lg font-bold text-mindchat-primary sm:hidden">
      MIND CHAT
    </span>
  );
}

export function Logo({ logoSize }: { logoSize: number }) {
  return (
    <Link href="/" title="logo" className="flex items-center">
      <LogoImage logoSize={logoSize} />
      <LogoText />
    </Link>
  );
}
