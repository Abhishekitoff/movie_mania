export{removemovie} from "../reducers/MovieSlice"
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/MovieSlice";

export const asyncloadmovie =  (id) => async (dispatch, getState) =>{

    try {

        const detail =await axios.get(`/movie/${id}`);
        const external =await axios.get(`/movie/${id}/external_ids`);
        const recommendations =await axios.get(`/movie/${id}/recommendations`);
        const similar =await axios.get(`/movie/${id}/similar`);
        const videos =await axios.get(`/movie/${id}/videos`);
        const watchProviders =await axios.get(`/movie/${id}/watch/providers`);

        let ulimateDets={
            detail : detail.data,
            external:external.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            
            videos:videos.data.results.find(m=> m.type === "Trailer"),
            watchProviders:watchProviders.data.results.IN

        };

        dispatch(loadmovie(ulimateDets));
       
        
    } catch (error) {
        console.log(error)
        
    }

}