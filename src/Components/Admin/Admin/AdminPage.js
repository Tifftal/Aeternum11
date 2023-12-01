import React, { useState, useEffect } from "react";
import SideBarAdmin from "../SideBarAdmin/SideBarAdmin";
import Tab from "../Tab/Tab";
import "./AdminPage.css"

const AdminPage = () => {
    const [tab, setTab] = useState("");

    useEffect(() => {
        const checkAdminRole = () => {
          const jwtToken = window.localStorage.getItem("jwtToken");
          if (jwtToken) {
            try {
              const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
              const userRoles = decodedToken.roles || [];
    
              // Проверяем, есть ли у пользователя роль ROLE_ADMIN
              const isAdminUser = userRoles.includes('ROLE_ADMIN');
              if (!isAdminUser) {
                window.location.href = "/";
              }
            } catch (error) {
              console.error('Error decoding JWT token:', error);
            }
          } else {
            window.location.href="/"
          }
        };
    
        checkAdminRole();
      }, []);

    return (
        <div className="adminPage">
            <div style={{ margin: "0 0 0 30px", marginBottom: "3%", width: "18%" }}>
                <SideBarAdmin setTab={setTab} tab={tab} />
            </div>
            <div style={{ margin: "0 30px", marginBottom: "3%", width: "82%" }}>
                <Tab tab={tab} />
            </div>
        </div>
    )
}

export default AdminPage;