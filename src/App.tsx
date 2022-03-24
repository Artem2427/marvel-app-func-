import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from './Components/appHeader/AppHeader';
import SingleCharacterLayout from './Pages/SingleCharacterLayout/SingleCharacterLayout';
import SingleComicLayout from './Pages/SingleComicLayout/SingleComicLayout';
import Spinner from './Components/Spinner';

const SinglePage = lazy(() => import('./Pages/SinglePage/SinglePage'));
const ComicsPage = lazy(() => import('./Pages/ComicsPage'));
const MainPage = lazy(() => import('./Pages/MainPage'));
const Page404 = lazy(() => import('./Pages/Page404'));

import { ComponentIs } from './Utils/enum';

import './App.css';

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <div className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />

              <Route
                path="/comics/:id"
                element={
                  <SinglePage
                    Component={SingleComicLayout}
                    dataType={ComponentIs.comic}
                  />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={SingleCharacterLayout}
                    dataType={ComponentIs.character}
                  />
                }
              />

              <Route path="/comics" element={<ComicsPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
