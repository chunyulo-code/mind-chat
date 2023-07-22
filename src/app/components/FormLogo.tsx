import Link from "next/link";
import Image from "next/image";

export default function FormLogo() {
  return (
    <div className="flex justify-center">
      <Link href="/">
        <Image
          src="/mindChat.svg"
          alt="Mind Chat Logo"
          width={100}
          height={100}
          style={{ cursor: "pointer" }}
        />
      </Link>
    </div>
  );
}
