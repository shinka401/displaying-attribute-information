// const fetcher = async (...args: Parameters<typeof fetch>) =>
//   await fetch(...args).then((res) => {
//     if (!res.ok) throw new Error("データの取得に失敗");
//     return res.json();
//   });

// export default fetcher;

import { useState } from "react";
import useSWR from "swr";

type Data = {
  count: {
    male: number;
    female: number;
  };
  image?: string;
};

export const usePollingCount = () => {
  const [count, setCount] = useState({
    male: 0,
    total: 0,
  });

  const fetcher = async (...args: Parameters<typeof fetch>) =>
    await fetch(...args).then((res) => {
      if (!res.ok) throw new Error("データの取得に失敗");
      return res.json();
    });
  const { data } = useSWR<Date>("/api/count", fetcher, { refreshInterval: 2000 });

  setCount((cnt) => {
    return { male: cnt.male + 1, total: cnt.male + 1 };
  });
  return { count };
};
