"use client";

type Points = {
  x: number;
  y: number;
};

type ContextMenuProps = {
  points: Points;
  menuClickHandler: (event: React.MouseEvent) => void;
};

type MenuList = {
  text: string;
  id: string;
  clickHandler: () => void;
};

const menuLists: MenuList[] = [
  {
    text: "Copy",
    id: "copy",
    clickHandler: () => {
      console.log("Copy clicked");
    }
  },
  {
    text: "Delete",
    id: "delete",
    clickHandler: () => {
      console.log("Delete clicked");
    }
  },
  {
    text: "Add node",
    id: "addNode",
    clickHandler: () => {
      console.log("Add node clicked");
    }
  },
  {
    text: "Add to library",
    id: "AddToLibrary",
    clickHandler: () => {
      console.log("Add to library clicked");
    }
  }
];

export default function ContextMenu({
  points,
  menuClickHandler
}: ContextMenuProps) {
  return (
    <div
      className="absolute w-[160px] rounded-md bg-mindchat-bg-dark shadow-md shadow-gray-900"
      style={{ top: `${points.y}px`, left: `${points.x}px` }}
    >
      <ul className="list-none p-2">
        {menuLists.map((menuList) => (
          <li
            key={menuList.id}
            id={menuList.id}
            onClick={menuClickHandler}
            className="rounded-lg px-4 py-2 text-mindchat-secondary hover:cursor-pointer hover:border hover:border-mindchat-primary"
          >
            {menuList.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
