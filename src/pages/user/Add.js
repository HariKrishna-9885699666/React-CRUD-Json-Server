import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation  } from "react-router-dom";
import { loadUsers, addUser, getUser, updateUser } from "../../api";

function Add() {
  const uid = useRef(null);
  const name = useRef(null);
  const dob = useRef(null);
  const phoneNumber = useRef(null);
  const address = useRef(null);
  const activationStatus = useRef(null);
  const [formErrors, setFormErrors] = useState({
    name: false,
    dob: false,
    phoneNumber: false,
    address: false,
    activationStatus: false
  });

  const { id } = useParams();
  const location = useLocation()
  const navigate = useNavigate();
  const userData = async () => {
    const allUsers = await loadUsers('all');
    uid.current.value = `CRUD-${101+allUsers.length}`;
  };

  useEffect(() => {
    if (id) {
      const getUserData = async () => {
        const userInfo = await getUser(id);
        uid.current.value = userInfo.uid;
        name.current.value = userInfo.name;
        dob.current.value = userInfo.dob;
        phoneNumber.current.value = userInfo.phoneNumber;
        address.current.value = userInfo.address;
        activationStatus.current.value = userInfo.activationStatus;
      };
      getUserData();
    } else {
      userData();
    }
  }, [id]);

  useEffect(
    () => {
      if (!id) {
        name.current.value = '';
        name.current.value = '';
        dob.current.value = '';
        phoneNumber.current.value = '';
        address.current.value = '';
        activationStatus.current.value = '';
        userData();
      }
    },
    [location, id]
  )

  async function handleSubmit (e) {
    e.preventDefault();
    const userObj = {
      uid: uid.current.value,
      name: name.current.value,
      dob: dob.current.value,
      phoneNumber: phoneNumber.current.value,
      address: address.current.value,
      activationStatus: activationStatus.current.value,
      isDeleted: false
    }

    const formErr = {};
    for (const prop in userObj) {
      if (prop === 'isDeleted' || prop === 'uid') continue;
      formErr[prop] = !userObj[prop];
    }
    setFormErrors({
      ...formErrors,
      ...formErr
    });
    const areTrue = Object.values(formErr).some(
      value => value === true
    );
    if (areTrue) return false;
    
    if (id) {
      await updateUser(id, userObj);
    } else {
      await addUser(userObj);
    }
    navigate("/");
  }

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h2 className="text-2xl font-bold">ADD USER</h2>
      <form className="w-[50%] h-full flex flex-col mt-2">
        <input
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="text"
          placeholder="Unique reference number"
          disabled={true}
          ref={uid}
        />
        <input
          className={`bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4 ${formErrors.name ? 'border-red-500': ''}`}
          type="text"
          placeholder="Enter your name"
          ref={name}
        />
        <input
          className={`bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4 ${formErrors.dob ? 'border-red-500': ''}`}
          type="date"
          placeholder="Date of birth"
          ref={dob}
        />
        <input
          className={`bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4 ${formErrors.phoneNumber ? 'border-red-500': ''}`}
          type="phone"
          placeholder="Enter your phone no."
          ref={phoneNumber}
        />
        <input
          className={`bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4 ${formErrors.address ? 'border-red-500': ''}`}
          type="text"
          placeholder="Enter your address"
          ref={address}
        />
        <select ref={activationStatus} className={`bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4 ${formErrors.activationStatus ? 'border-red-500': ''}`}>
          <option value="">[SELECT]</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Blocked">Blocked</option>
        </select>
        <button
          className="bg-teal-600 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4"
          type="submit"
          onClick={handleSubmit }
        >
          {`${!id ? 'ADD' : 'UPDATE'} USER`}
        </button>
      </form>
    </div>
  );
}

export default Add;
