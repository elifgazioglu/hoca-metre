import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="left-side">
        <div className="footer-logo">
          <a href="/">Hoca Metre</a>
        </div>
        <div className="links">
          <a href="/">Ana Sayfa</a> | <a href="/hakkinda">Hakkımızda</a>
        </div>
      </div>
      <div>
        <h4>İletişime Geç</h4>
        <form>
          <input type="email" placeholder="E-posta adresi" />
          <textarea placeholder="Mesajınızı buraya yazın" rows="4"></textarea>
          <button type="submit">Gönder</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
