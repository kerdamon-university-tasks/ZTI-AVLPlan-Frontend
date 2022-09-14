import { useParams } from "react-router-dom";

const useIdFromParams = (): string => {
  const {id} = useParams();
  if(!id){
    throw new Error('No id as param in routes');
  }
  return id;
}

export default useIdFromParams;