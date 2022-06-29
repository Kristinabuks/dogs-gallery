import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UploadPage } from "./pages/UploadPage";
import { IndexPage } from "./pages/IndexPage";
import { GalleryPage } from "./pages/GalleryPage";
import { Navbar, NavbarItem } from "./components/Navbar";
import { MainContainer } from "./components/MainContainer";
import { useInnerWidth } from "./hooks/useInnerWidth";

function App() {
  useInnerWidth();
  return (
    <BrowserRouter>
      <Navbar greeting="Добро пожаловать в мою галерею">
        <NavbarItem path="/" description="Главная" />
        <NavbarItem path="/upload" description="Добавить&nbsp;фото" />
        <NavbarItem path="/gallery" description="Галлерея" />
      </Navbar>
      <MainContainer>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </MainContainer>
    </BrowserRouter>
  );
}

export { App };
