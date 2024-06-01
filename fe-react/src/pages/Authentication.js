import { FormsBox } from "../components/FormsBox/FormsBox";
import Header from "../components/Header/Header";


export const Authentication = () => {

    const [isOnLoginComponent, setIsOnLoginComponent] = useState(true);
    
    return(
        <>
            <Header/>
            <FormsBox/>
        </>

    )
}