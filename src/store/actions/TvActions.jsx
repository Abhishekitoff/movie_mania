export{removetv} from "../reducers/TvSlice"
import axios from "../../utils/axios";
import { loadtv } from "../reducers/TvSlice";

export const asyncloadtv =  (id) => async (dispatch, getState) =>{

    try {

        const detail =await axios.get(`/tv/${id}`);
        const external =await axios.get(`/tv/${id}/external_ids`);
        const recommendations =await axios.get(`/tv/${id}/recommendations`);
        const similar =await axios.get(`/tv/${id}/similar`);
        const videos =await axios.get(`/tv/${id}/videos`);
        const watchProviders =await axios.get(`/tv/${id}/watch/providers`);

        let ulimateDets={
            detail : detail.data,
            external:external.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            
            videos:videos.data.results.find(m=> m.type === "Trailer"),
            watchProviders:watchProviders.data.results.IN

        };

        dispatch(loadtv(ulimateDets));
       
        
    } catch (error) {
        console.log(error)
        
    }

}