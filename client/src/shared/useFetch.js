
import React, {
    useState,
    useEffect
} from 'react';

import axios from "axios";

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [serverError, setServerError] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await axios.get(url);
          const data = await resp?.data;
  
          setApiData(data);
          setIsLoading(false);
        } catch (error) {
          setServerError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
      console.log("useFetch ::");
    }, [url]);

    return { isLoading, apiData, serverError };
  };

  export default useFetch;