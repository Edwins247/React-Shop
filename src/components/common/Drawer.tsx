import { Link } from "react-router-dom";

const Drawer = (): JSX.Element => {
  return (
    <div className="drawer-side">
      <label htmlFor="side-menu" className="drawer-overlay"></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
        <li>
          <Link to="/fashion" className="!text-gray-700 active:!text-white dark:!text-white">
            패션
          </Link>
        </li>
        <li>
          <Link to="/accessory" className="!text-gray-700 active:!text-white dark:!text-white">
            액세서리
          </Link>
        </li>
        <li>
          <Link to="/digital" className="!text-gray-700 active:!text-white dark:!text-white">
            디지털
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
