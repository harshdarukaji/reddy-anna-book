import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  height?: number;
  href?: string;
};

export function Logo({ className = "", height = 48, href = "/" }: LogoProps) {
  const width = Math.round(height * 2.8);

  const image = (
    <Image
      src="/logo.png"
      alt="Reddy Anna — Since 2010"
      width={width}
      height={height}
      className={`h-auto w-auto object-contain ${className}`}
      style={{ height, width: "auto", maxWidth: width }}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {image}
      </Link>
    );
  }

  return image;
}
