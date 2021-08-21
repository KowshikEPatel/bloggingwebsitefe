import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/3484061/pexels-photo-3484061.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        alt=""
      />
    </div>
  );
}
