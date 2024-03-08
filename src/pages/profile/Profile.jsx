import React, { useContext, useEffect, useState } from "react";
import "./Profile.scss";
import axios from "axios";
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    profilePic: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const updateUserProfile = async () => {
    try {
      const updatedData = {
        name: profileData.name,
        lastName: profileData.lastName,
        profilePic: profileData.profilePic,
      };
      if (selectedFile) {
        const formData = new FormData();
        const filename = Date.now() + selectedFile.name;
        formData.append("name", filename);
        formData.append("file", selectedFile);
        updatedData.profilePic = filename;
        try {
          await axios.post(`http://localhost:8000/api/upload`, formData, {
            withCredentials: true,
          });
        } catch (error) {
          console.log(error);
        }
      }
      const res = await axios.put(
        `http://localhost:8000/api/user`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(profileData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/user`, {
          withCredentials: true,
        });
        setProfileData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="profile">
      <div className="image">
        <img
          src={
            selectedFile
                ? URL.createObjectURL(selectedFile)
                : (profileData?.profilePic
                    ? `http://localhost:8000/images/${profileData.profilePic}`
                    : "/nouser.png")
        }
          alt=""
        />
      </div>
      <label htmlFor="fileInput" className="file-upload-button">
        <AiOutlineCamera className="camera-icon" />
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="input-group">
        İsim
        <input
          required
          type="text"
          name="name"
          value={profileData.name}
          onChange={(e) =>
            setProfileData({ ...profileData, name: e.target.value })
          }
          placeholder="isim"
        />
      </div>
      <div className="input-group">
        Soyisim
        <input
          required
          type="text"
          name="lastName"
          value={profileData.lastName}
          onChange={(e) =>
            setProfileData({ ...profileData, lastName: e.target.value })
          }
          placeholder="soyisim"
        />
      </div>
      <div className="input-group">
        <label>E-posta</label>
        <input
          required
          type="email"
          name="email"
          value={profileData.email}
          placeholder="e-posta"
        />
      </div>
      <div className="input-group">
        Telefon Numarası
        <input
          type="tel"
          name="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={profileData.phone}
          onChange={(e) =>
            setProfileData({ ...profileData, phone: e.target.value })
          }
          placeholder="telefon"
        />
      </div>
      <button className="update-button" onClick={updateUserProfile}>
        Profilimi Güncelle
      </button>
    </div>
  );
};

export default Profile;
