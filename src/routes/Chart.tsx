import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId:string;
}

interface IHistorical {
    time_open: string;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({coinId} : ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId)
    ,{
        refetchInterval:10000,
    });
    return <div>{isLoading ? "Loading chart..." : <ApexChart type="candlestick" 
        series={[
            {
                name: "price",
                data: data?.map((price) => [(price.time_close * 1000), price.open, price.high, price.low, price.close]) as number[][]
            }
        ]}
        options={{ 
            chart:{
                height:300,
                width:500,
                toolbar: {
                    show:false,
                },
                background:'transparent',
            },
            theme: {
                mode:'dark',
            },
            stroke: {
                curve:'smooth',
                width: 3,
            },
            grid: {
                show:false,
            },
            yaxis: {
                show:false,
            },
            xaxis: {
                labels: {
                    show:false,
                },
                type: "datetime",
                axisTicks: {
                    show:false,
                },
                axisBorder: {
                    show:false,
                },
                categories: data?.map(price => new Date(price.time_close * 1000).toISOString()),
            },
            //fill:{ type:'gradient', gradient:{gradientToColors: ["#0be881"], stops: [0, 100]} },
            colors: ["#0fbcf9"],
            tooltip: {
                y: {
                    formatter: (Value) => `$ ${Value.toFixed(3)}`,
                },
               
            }
            

        }}
    /> }</div>
}
export default Chart;