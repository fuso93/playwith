import {useState, useEffect} from 'react';
import axios from "axios";


const useAxios = (configParams) => {

    axios.defaults.baseURL = "http://localhost:8000/api";
    const [res, setRes] = useState('')
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(true)


    const fetchingDataUsingAxios = async () => {
        try{
           const {data} = await axios.request(configParams)
            setRes(data)
            setLoading(false)

        }catch(err){
            setErr(err.response.data.message)
            setLoading(false)

        }
    }

    useEffect(() => {
        fetchingDataUsingAxios()
    },[])



    return [res, err, loading];
};

export default useAxios;