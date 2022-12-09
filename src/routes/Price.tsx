import {useQuery} from "react-query";
import {fetchCoinTickers} from "../api";

interface PriceProps {
    coinId:string;
}

interface IPriceData {
    circulating_supply: number;

}

function Price({coinId} : PriceProps){
    const {isLoading, data} = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));
   // const {isLoading: tickersLoading, data:tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId)

    return <h1>{data?.circulating_supply}     
            </h1>;
}
export default Price;