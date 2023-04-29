import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";

import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Router />
    </BrowserRouter>
  );
}

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <div class="footer">
        <p>Footer</p>
      </div>
    </>
  );
};

const Nav = () => {
  return (
    <div>
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/apple" className="link">
        Apple
      </Link>
      <Link to="/applet" className="link">
        Applet
      </Link>
      <Link to="/test" className="link">
        Test
      </Link>
    </div>
  );
};
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="apple" element={<ApplePage />}>
        <Route path="msg" element={<AppleMsg />} />
        <Route
          path="protectedmsg"
          element={
            <Protected isSignedIn={true}>
              <AppleMsgP />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate replace to="/apple" />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

function HomePage() {
  return <div className="page">🏠 Page</div>;
}

function NotFoundPage() {
  return <div className="page">🧐 Page Not Found</div>;
}

function ApplePage() {
  const navigate = useNavigate();
  return (
    <div className="page">
      🍎 Page
      <button onClick={() => navigate("msg")}> show msg </button>
      <button onClick={() => navigate("protectedmsg")}>
        show protected msg{" "}
      </button>
      {/* all child routes will come here */}
      <Outlet />
    </div>
  );
}
function AppleMsg() {
  return <div className="page">🍎 is healthy msg page</div>;
}
function AppleMsgP() {
  return (
    <div className="page">🍎 is healthy , try to toggle "isSignedIn" </div>
  );
}
function Protected({ isSignedIn, children }) {
  console.log("navigate", !isSignedIn);
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
