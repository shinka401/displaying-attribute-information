import Link from "next/link";

export function Header() {
  return (
    <header className="flex content-center items-center">
      <Link href="/" className="p-3">
        index
      </Link>
      <Link href="/second" className="p-3">
        second
      </Link>
    </header>
  );
}
