import React, {FC} from 'react';
import Link from "next/link";

const tabs = [
  {index: 0, text: 'Dashboard', href: '/'},
  {index: 1, text: 'Lend/Borrow', href: '/bank'},
  {index: 2, text: 'Insurance', href: '/insurance'},
  {index: 3, text: 'Vaults', href: '/valuts'},
  {index: 4, text: 'Funds', href: '/funds'},
];

type Props = {
  selected: number;
}

type TabButtonProps = {
  text: string;
  index: number;
  selected: number;
  selectedStyle: string;
  href: string;
}

const TabButton: FC<TabButtonProps> = ({text, index, selected, selectedStyle, href}) => {
  return (
    <Link href={href}>
      <a className={`text-gray-600 py-2 px-6 block hover:text-green-500 focus:outline-none ${selected === index && selectedStyle}`}>
        {text}
      </a>
    </Link>
  );
};

const TabsNav: FC<Props> = ({selected}) => {
  const selectedStyle = 'text-green-500 border-b-2 font-medium border-green-500';
  return (
    <div className="bg-white my-6">
      <nav className="flex flex-col sm:flex-row">
        {tabs.map((tab) => (
          <TabButton text={tab.text} index={tab.index} selected={selected} selectedStyle={selectedStyle} href={tab.href}/>
        ))}
      </nav>
    </div>
  );
};

export default TabsNav;