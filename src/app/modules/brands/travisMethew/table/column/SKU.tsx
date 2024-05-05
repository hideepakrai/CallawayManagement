// SKUFilter.tsx

import React, { useRef } from 'react';
import { Input, InputRef } from 'antd';

interface SKUFilterProps {
  setSelectedKeys: (keys: string[]) => void;
  selectedKeys: string[];
  confirm: ({ closeDropdown }: { closeDropdown: boolean }) => void;
}

const SKUFilter: React.FC<SKUFilterProps> = ({ setSelectedKeys, selectedKeys, confirm }) => {
  const searchInput = useRef<InputRef>(null);

  return (
    <div style={{ padding: 8, position: "absolute", top: -90, backgroundColor: "white", zIndex: 1 }}>
      <Input
        ref={searchInput}
        placeholder="Search SKU"
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onKeyUp={(e) => confirm({ closeDropdown: false })}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
    </div>
  );
};

export default SKUFilter;
