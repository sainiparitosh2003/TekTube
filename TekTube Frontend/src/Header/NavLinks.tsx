import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Home", url: "/" }, 
    { name: "Explore", url: "/explore" },
    // { name: "SignUp", url: "/signup" }
  ];
  
  const location = useLocation();

  return (
    <div className="flex gap-5 h-full items-center">
      {links.map((link, index) => (
        <div
          key={index}
          className={`${
            location.pathname === link.url ? "border-red-400 text-red-400" : "border-transparent"
          } border-t-[3px] h-full flex items-center`}
        >
          <Link to={link.url}>{link.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
