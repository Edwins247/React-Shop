import { Link } from "react-router-dom";

const Drawer = (): JSX.Element => {
  const closeDrawer = () => {
    const checkbox = document.getElementById("side-menu") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  return (
    <div className="drawer-side">
      <label htmlFor="side-menu" className="drawer-overlay" onClick={closeDrawer}></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
        <li>
          <Link to="/fashion" onClick={closeDrawer} className="!text-gray-700 active:!text-white dark:!text-white">
            패션
          </Link>
        </li>
        <li>
          <Link to="/accessory" onClick={closeDrawer} className="!text-gray-700 active:!text-white dark:!text-white">
            액세서리
          </Link>
        </li>
        <li>
          <Link to="/digital" onClick={closeDrawer} className="!text-gray-700 active:!text-white dark:!text-white">
            디지털
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
