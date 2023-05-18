import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { findTrendingValue, sortArray, Order, paginateArray } from "../utils/utils";
import {
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
  FormControl,
  Card,
  CardContent,
} from "@mui/material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import styles from "../styles/Home.module.css";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement);
const Home: React.FC = () => {
  const [resources, setResources] = useState<string[]>([]);
  const [raw, setRaw] = useState<any[]>([]);
  const [resourceDetails, setResourceDetails] = useState<any[]>([]);
  const [resourceLoading, setResourceLoading] = useState(false);
  const [trendingData, setTrendingData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState(Order.ASCENDING);
  const [commonTrends, setCommonTrends] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any>(null);


  const columns: GridColDef[] = [
    { field: 'ConsumedQuantity', headerName: 'ConsumedQuantity', width: 100 },
    { field: 'Cost', headerName: 'Cost', width: 200 },
    { field: 'ResourceGroup', headerName: 'Resource Group', width: 150 },
    { field: 'ResourceLocation', headerName: 'ResourceLocation', width: 150 },

  ];
 
  useEffect(() => {
    const sortedData = sortArray(resourceDetails, sortBy, sortDirection);
    const updatedPaginatedData = paginateArray(sortedData, page * rowsPerPage, rowsPerPage);

  }, [resourceDetails, sortBy, sortDirection, page, rowsPerPage]);

  useEffect(() => {
    fetchResources();
    fetchRawData();
  }, []);

  // Update totalRows when resourceDetails change


  useEffect(() => {
    const commonTrends = inferCommonTrends(resourceDetails);
    setCommonTrends(commonTrends);
  }, [resourceDetails]);

  useEffect(() => {
    const chartData = generateChartData(commonTrends,raw);
    setChartData(chartData);
  }, [commonTrends,raw]);

  const fetchResources = async () => {
    try {
      const res = await fetch("https://engineering-task.elancoapps.com/api/resources");
      const data = await res.json();
      setResources(data);
    } catch (error) {
      console.log("Error fetching resources:", error);
    }
  };

  const fetchRawData = async () => {
    try {
      const res = await fetch("https://engineering-task.elancoapps.com/api/raw");
      const data = await res.json();
      setRaw(data);
    } catch (error) {
      console.log("Error fetching raw data:", error);
    }
  };

  const handleResourceSelected = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const resourceId = event.target.value as string;
    if (resourceId) {
      setResourceLoading(true);
      try {
        const res = await fetch(`https://engineering-task.elancoapps.com/api/resources/${resourceId}`);
        const data = await res.json();
        setResourceDetails(data);
      } catch (error) {
        console.log("Error fetching resource details:", error);
      } finally {
        setResourceLoading(false);
      }
    }
  };

  const handleTrendsSelected = (event: React.ChangeEvent<{ value: string }>) => {
    const value = event.target.value;
    if (raw) {
      const trendingData = findTrendingValue(raw, value);
      generateChartData(value)
      setTrendingData(trendingData);
    }
  };


  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: "bold",
          },
        },
      },
    },
  });



  const inferCommonTrends = (data: any[]) => {
    if (!data) return [];

    const highestCost = data.reduce((max: number, item: any) => Math.max(max, item.Cost), 0);
    const minimumCost = data.reduce((min: number, item: any) => Math.min(min, item.Cost), Infinity);
    const maximumConsumedQuantity = data.reduce(
      (max: number, item: any) => Math.max(max, item.ConsumedQuantity),
      0
    );
    const minimumConsumedQuantity = data.reduce(
      (min: number, item: any) => Math.min(min, item.ConsumedQuantity),
      Infinity
    );

    const trends: string[] = [];
    if (highestCost > 0) trends.push(`Highest cost: $${highestCost}`);
    if (minimumCost < Infinity) trends.push(`Minimum cost: $${minimumCost}`);
    if (maximumConsumedQuantity > 0) trends.push(`Maximum consumed quantity: ${maximumConsumedQuantity}`);
    if (minimumConsumedQuantity < Infinity) trends.push(`Minimum consumed quantity: ${minimumConsumedQuantity}`);

    return trends;
  };

  const generateChartData = (trendType: string = "HighestCost") => {
    const chartLabels: string[] = [];
    const chartData: number[] = [];

    raw.forEach((item: any) => {
      chartLabels.push(item.Date);
      switch (trendType) {
        case "HighestCost":
          chartData.push(item.Cost);
          break;
        case "MinimumCost":
          chartData.push(item.cost);
          break;
        case "MaximumConsumedQuantity":
          chartData.push(item.ConsumedQuantity);
          break;
        case "MinimumConsumedQuantity":
          chartData.push(item.ConsumedQuantity);
          break;
        default:
          break;
      }
    });

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: trendType,
          data: chartData,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "rgba(75,192,192,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(75,192,192,1)",
        },
      ],
    });
  };

  const handleChartClick = (event, chartElements, chart) => {
    if (chartElements && chartElements.length > 0 && chart) {
      const selectedDataIndex = chartElements[0].index;
      const selectedData = chart.data.datasets[0].data[selectedDataIndex];
  
      // Implement further action based on the selected data
      // For example, you can display a modal or update a state variable to show additional information
  
      alert(`Selected Value: ${selectedData}`);
    }
  };

 

  const sortedData = sortArray(resourceDetails, sortBy, sortDirection);


  const chartRef = useRef(null);
  const renderChart = () => {
    if (chartData) {
      return (
        <Line
          data={chartData}
          options={{
            onClick: (event, chartElements) => handleChartClick(event, chartElements, chartRef.current),
          }}
          ref={chartRef}
        />
      );
    }
    return null;
  };
  return (
    <>
      <Head>
        <title>Elanco App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          
          
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "58%" }}>
          <h2>show Tabuler form data for selected resource details</h2>
          <Card style={{ minHeight:'60vw'}}>
           <CardContent>
          <FormControl fullWidth>
          <Select className={styles.selectContainer}  name="resources" id="resources" value="" onChange={handleResourceSelected}>
            <MenuItem disabled value="">
              Select an Option
            </MenuItem>
            {resources.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          {resourceLoading ? (
            <div>Loading..</div>
          ) : (
            resourceDetails.length > 0 && (
              <ThemeProvider theme={theme}>
                
                <DataGrid
                style={{height: '60vw', minHeight:'60vw'}}
                    rows={resourceDetails}
                    columns={columns}
                    getRowId={(row) => row.InstanceId+Math.random(1000000000)}
                    pageSizeOptions={[15]}
                    rowCount={sortedData.length}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 15,
                        },
                      },
                    }}
                  
                    checkboxSelection
                  />
              </ThemeProvider>
            )
          )}
          </CardContent>
          </Card>
          </div>
          <div style={{ width: "40%" }}>
          <h2>Show chart for selected common trends</h2>
          <Card style={{height: '50vw', minHeight:'50vw'}}>
           <CardContent>
          <FormControl fullWidth>
          <Select  className={styles.selectContainer} name="trends" id="trends" value="" onChange={handleTrendsSelected}>
            <MenuItem disabled value="">
              Select an Option
            </MenuItem>
            <MenuItem value="HighestCost">Max Cost</MenuItem>
            <MenuItem value="MinimumCost">Min Cost</MenuItem>
            <MenuItem value="MaximumConsumedQuantity">Max Consumed Quantity</MenuItem>
            <MenuItem value="MinimumConsumedQuantity">Min Consumed Quantity</MenuItem>
          </Select>
          </FormControl>
          {trendingData && <h2>{trendingData}</h2>}
            {renderChart()}
            </CardContent>
            </Card>
          </div>
        </div>
      
      </main>
      <footer className={styles.footer}>
    <p>Powered by Elanco</p>
  </footer>
    </>
  );
};

export default Home;