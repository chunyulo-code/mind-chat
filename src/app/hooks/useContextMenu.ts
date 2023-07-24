import { useState, useEffect } from "react";

function useContextMenu() {
  const [rightClicked, setRightClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    function handleClick() {
      setRightClicked(false);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return {
    rightClicked,
    setRightClicked,
    points,
    setPoints
  };
}
export default useContextMenu;
