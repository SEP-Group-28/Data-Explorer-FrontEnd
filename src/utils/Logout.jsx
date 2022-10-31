import AuthServices from "../services/AuthServices";
import { useEffect,useState } from "react";
import Loader from "../components/loader/Loader";
import AlertServices from "../services/AlertServices";

function Logout() {

  const [loader, setLoader] = useState(false);
  useEffect(()=>{
    logout();
  },[])

  const logout = async () => {
    
    try {
      setLoader(true);
      // const response = await AuthServices.logout();
      const response = await AlertServices.removeToken();
      localStorage.clear();
      window.location.href="/login";

    } catch (error) {
      localStorage.clear();
      window.location.href="/login";
      
    }
    setLoader(false); 
    
  }
  if(loader){
    return <Loader/>
  }
  return (
    <div>
      
    </div>
  )
}

export default Logout
