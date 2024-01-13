import Link from "next/link";

const Header = () => {
	return (
		<div>
			<div style={{margin:"3rem"}}>
				<h1 style={{fontSize:"2rem"}}>
					<Link href="/">
						Fantasticfy Assessment
					</Link>
				</h1>
				<h2 style={{fontSize:"1rem",marginTop:"1rem"}}>
					Fetch a public API of users, populate it to a MongoDB collection and enable user creation on top of it, all in sync.
				</h2>
			</div>
		</div>
	);
};

export default Header;