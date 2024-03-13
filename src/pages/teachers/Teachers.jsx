import React, { useEffect, useState } from "react";
import "./Teachers.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/teachers?active=true`, {
          withCredentials: true,
        });
        setTeachers(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="teachers-container">
      <div className="teachers-header-div">
        <div className="teachers-title x">EĞİTMENLER</div>
      </div>
      <div className="teachers-list">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="teacher-item">
            <Link to={`/egitmenler/${teacher.slug}`} className="teacher-link">
              <img
                className="teachers-img"
                src={
                  teacher?.profilePic
                    ? `${import.meta.env.VITE_BACKEND_URL}/images/${
                        teacher.profilePic
                      }`
                    : "/nouser.png"
                }
                alt=""
              />
              <div className="teacher-information">
                <div className="teacher-name">{teacher.name}</div>
                <div className="teacher-lastname">{teacher.lastName}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
