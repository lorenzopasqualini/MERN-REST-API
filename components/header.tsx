import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<div id="icon">
			<Link href="/">
				<Image src='/favicon.ico' width={80} height={80} alt="icon" />
			</Link>
		</div>
	);
};

export default Header;