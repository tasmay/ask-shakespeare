import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex flex-row items-center p-6">
            <h1 className="text-3xl text-center sm:text-5xl"><Link href="#">Ask Shakespeare</Link></h1>
            <div className="">
                <Image
                src="/shakes.png"
                width={200}
                height={200}
                alt="Picture of Shakespeare"
                priority={true}
                />
            </div>
        </div>
    );
}