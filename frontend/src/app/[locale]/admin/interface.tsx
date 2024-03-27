interface Item {
  key: string;
  id: number;
  mode: string;
  target_by_item: string;
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}


interface DataType {
  key: React.Key;
  mode: string;
  target_by_item: string;
}

type EditData = {
  mode: string;
  target_by_item: string;
};

type UpData = {
  id: number;
  mode: string;
  target_by_item: string;
};

type id_row = {
  id: number;
};
