import React, {FC} from 'react';
import Link from "next/link";
import {heroIcon} from "../../utils/heroIcons";

const tabs = [
  {index: 0, text: 'Dashboard', href: '/', icon: ''},
  {index: 1, text: 'Lend/Borrow', href: '/bank', icon: 'lib'},
  {index: 2, text: 'Insurance', href: '/insurance', icon: 'shield'},
  {index: 3, text: 'Vaults', href: '/valuts', icon: 'archive'},
  {index: 4, text: 'Funds', href: '/funds', icon: 'graph'},
];

type Props = {
  selected: number;
}

type TabButtonProps = {
  index: number;
  text: string;
  href: string;
  selected: number;
  selectedStyle: string;
  icon?: string;
}

const TabButton: FC<TabButtonProps> = ({index, text, href, selected, selectedStyle, icon}) => {
  return (
    <Link href={href}>
        <a
          className={`flex items-center text-gray-600 py-2 px-6 block hover:text-green-500 focus:outline-none ${selected === index && selectedStyle}`}>
          {icon && heroIcon(icon, 'h-4 w-4 mr-2')}
          {text}
        </a>
    </Link>
  );
};

const TabsNav: FC<Props> = ({selected}) => {
  const selectedStyle = 'text-green-500 border-b-2 font-medium border-green-500';
  return (
    <div className="bg-white mb-8 mt-4">
      <nav className="flex flex-col sm:flex-row">
        {tabs.map((tab) => (
          <TabButton key={tab.index} text={tab.text} index={tab.index} selected={selected} selectedStyle={selectedStyle}
                     href={tab.href} icon={tab.icon}/>
        ))}
      </nav>
    </div>
  );
};

export default TabsNav;