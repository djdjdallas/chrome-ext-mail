import { HamburgerMenu } from "/Users/dominickhill/next-extension/next-chrome-starter/components/hamburger-menu/index.js";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">My App</h1>
      <HamburgerMenu />
    </header>
  );
}
