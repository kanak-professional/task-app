import Head from "next/head";
import styles from "./styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { getTrendingData } from "./utility/comman-utils";
import { DataGrid } from '@mui/x-data-grid';

export default function Home() {
  const [resources, setResources] = useState([]);
  const [raw, setRaw] = useState([]);
  const [resourceDetails, setResourceDetails] = useState([]);
  const [resourceLoading, setResourceLoading] = useState(false);
  const [trendingData, seTrendingData] = useState("");

  useEffect(() => {
    fetch("https://engineering-task.elancoapps.com/api/resources")
      .then(async (res) => {
        setResources(await res.json());
      });

    fetch("https://engineering-task.elancoapps.com/api/raw")
      .then(async (res) => {
        setRaw(await res.json());
      });
  }, []);

  const handleResourceSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setResourceLoading(true);
    fetch(`https://engineering-task.elancoapps.com/api/resources/${event.target.value}`)
      .then(async (res) => {
        setResourceDetails(await res.json());
        setResourceLoading(false);
      });
  };

  const handleTrendsSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    seTrendingData(getTrendingData(raw, value));
  };

  return (
    <>
      <Head>
        <title>Elanco App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h2>Get the common trends from raw data</h2>
          <select
            name="trends"
            id="trends"
            className={styles.select}
            onChange={(event) => handleTrendsSelected(event)}
          >
            <option value="none" selected disabled hidden>
              Select an Option
            </option>
            <option value="HighestCost">Highest Cost</option>
            <option value="MinimumCost">Minimum Cost</option>
            <option value="MaximumConsumedQuantity">
              Maximum Consumed Quantity
            </option>
            <option value="MinimumConsumedQuantity">
              Minimum Consumed Quantity
            </option>
          </select>
          {trendingData && <h2>{trendingData}</h2>}
          <h2 style={{ marginTop: "15px" }}>
            Select a resource to get the details
          </h2>
          <select
            name="resources"
            id="resources"
            className={styles.select}
            onChange={(event) => handleResourceSelected(event)}
          >
            <option value="none" selected disabled hidden>
              Select an Option
            </option>
            {resources.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          {resourceLoading ? (
            <div>Loading..</div>
          ) : (
            resourceDetails.length > 0 && (
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={resourceDetails}
                  columns={[
                    { field: 'ConsumedQuantity', headerName: 'Consumed Quantity', flex: 1 },
                    { field: 'Cost', headerName: 'Cost', flex: 1 },
                    { field: 'Date', headerName: 'Date', flex: 1 },
                    { field: 'MeterCategory', headerName: 'Meter Category', flex: 1 },
                    { field: 'InstanceId', headerName: 'Instance Id', flex: 1 },
                    { field: 'ResourceGroup', headerName: 'Resource Group', flex: 1 },
                    { field: 'ResourceLocation', headerName: 'Resource Location', flex: 1 },
                    { field: 'UnitOfMeasure', headerName: 'Unit of Measure', flex: 1 },
                    { field: 'Location', headerName: 'Location', flex: 1 },
                    { field: 'ServiceName', headerName: 'Service Name', flex: 1 },
                  ]}
                />
              </div>
            )
          )}
        </div>
      </main>
    </>
  );
}
