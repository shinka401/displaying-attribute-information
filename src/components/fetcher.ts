const fetcher = async (...args: Parameters<typeof fetch>) =>
  await fetch(...args).then((res) => {
    if (!res.ok) throw new Error("データの取得に失敗");
    return res.json();
  });

export default fetcher;
