
import {useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const { data: session, status } = useSession();
  const responseGoogle = response => {
    console.log(response);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    setLoginStatus(true);
  };
  const logout = () => {
    console.log("logout");
    setLoginStatus(false);
  };
  const popupCenter = (url, title) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  // if (status === "authenticated") {
  //   return (
  //     <div>

  //       < h2 > Welcome {session.user.email} 😀</h2 >
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </div>
  //   )
  // }
  // else if (status === "unauthenticated") {
  //   return (

  //     <div>

  //       <h2>Please Login</h2>
  //       <button onClick={() => popupCenter("/google-signin", "Sample Sign In")} >
  //         Sign In with Google
  //       </button>
  //     </div>
  //   )
  // }

  return (
    <div>
      <div className="App">
        <h1>Login with Google</h1>
        {!loginStatus && (
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        )}
        {loginStatus && (
          <div>
            <h2>Welcome {name}</h2>
            <h2>Email: {email}</h2>
            <img src={url} alt={name} />
            <br />
            <GoogleLogout
              clientId="671348139606-906f7lcl8vk6l26hivc1ka0hk2teuvb1.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logout}
            />
          </div>
        )}
      </div>
    </div>
  )
}
