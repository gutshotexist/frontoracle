import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <nav>
      <Link href="/">
        <span className="logo" onClick={handleClick}>
          0xDeFace
        </span>
      </Link>
      {/* Rest of the navbar code */}
    </nav>
  );
};

export default Navbar;
