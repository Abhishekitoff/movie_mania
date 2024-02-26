export{removeperson} from "../reducers/PersonSlice"
import axios from "../../utils/axios";
import { loadperson } from "../reducers/PersonSlice";

export const asyncloadperson =  (id) => async (dispatch, getState) =>{

    try {

        const detail =await axios.get(`/person/${id}`);
        const external =await axios.get(`/person/${id}/external_ids`);
        const combined_credits =await axios.get(`/person/${id}/combined_credits`);
        const tvCredits =await axios.get(`/person/${id}/tv_credits`);
        const movieCredits =await axios.get(`/person/${id}/movie_credits`);
       
    

        let ulimateDets={
            detail : detail.data,
            external:external.data,
            combined_credits:combined_credits.data,
            tvCredits:tvCredits.data,
            movieCredits:movieCredits.data,



        };

        dispatch(loadperson(ulimateDets));
       
        
    } catch (error) {
        console.log(error)
        
    }

}