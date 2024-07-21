import "./globals.css";
import "../src/fonts.css";

import "tailwindcss/tailwind.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ListAvailableStrategies } from "../api/ApiWrapper";
import { useDispatch } from "react-redux";
import { store } from "../src/app/store";
import SideBar from "./copytrading/SideBar";

import { listAllTraders } from "../api/ApiWrapper";
import { listAllStrategies } from "../api/ApiWrapper";
import { statsCopy } from "../api/ApiWrapper";
import { setStats } from "../src/features/mainStats/statsSlice";
import { setTraders } from "../src/features/traders/traderSlice";
import { setStrategies } from "../src/features/strategies/strategySlice";
import { setAvailStrategies } from "../src/features/strategies/availstrategySlice";
function TradersUpdater() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndUpdateTraders = async () => {
      await listAllTraders(dispatch, setTraders);
    };

    fetchAndUpdateTraders();
    const intervalId = setInterval(fetchAndUpdateTraders, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
}
function StatsUpdater() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndUpdateStats = async () => {
      await statsCopy(dispatch, setStats);
    };

    fetchAndUpdateStats();
    const intervalId = setInterval(fetchAndUpdateStats, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
}
function AvailStrategiesUpdater() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndUpdateAvailStrategies = async () => {
      await ListAvailableStrategies(dispatch, setAvailStrategies);
    };

    fetchAndUpdateAvailStrategies();
    const intervalId = setInterval(fetchAndUpdateAvailStrategies, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
}
function StrategiesUpdater() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndUpdateStrategies = async () => {
      await listAllStrategies(dispatch, setStrategies);
    };

    fetchAndUpdateStrategies();
    const intervalId = setInterval(fetchAndUpdateStrategies, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
}
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="bg-[#0B1217]">
        <SideBar />

        <TradersUpdater />
        <StrategiesUpdater />
        <StatsUpdater />
        <AvailStrategiesUpdater />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
