import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import jwt_decode from "jwt-decode";
const PagesDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  }; var token = localStorage.token;
  var decoded = jwt_decode(token);
  setTimeout(function () {
    if (decoded.role == "Doctor") {
      document.getElementById("diagnosis").style.display = "none";
      document.getElementById("userprofile").style.display = "none";

    } else if (decoded.role == "patient") {
      document.getElementById("docprofile").style.display = "none";


    }
  }, 100)
  return (
    <>
      <a
        className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Self Diagnostic Menu
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >

        <Link
          to="/diagnosis" id="diagnosis"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Diagnostic
        </Link>

        <Link
          to="/userprofile" id="userprofile"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Profile
        </Link>

        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />








        <Link
          to="/profile" id="docprofile"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Profile
        </Link>
        <Link
          to="/forum"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Forum
        </Link>
        <Link
          to="/contact"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Contact
        </Link>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          <Link

            onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            to="/"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            Logout
        </Link>

        </a>
      </div>
    </>
  );
};

export default PagesDropdown;
