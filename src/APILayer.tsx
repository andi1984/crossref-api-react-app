import React, { FC } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { ReactQueryDevtools } from "react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
});

const APILayer: FC<{ doi: string }> = ({ doi }) => {
  const { isLoading, error, data } = useQuery(doi, () =>
    fetch(`https://api.crossref.org/works/${doi}`).then((res) => res.json())
  );

  if (isLoading) return <span>"Loading..."</span>;

  if (error) return <span>"An error has occurred: " + error</span>;

  // Extracting info from crossref API
  const { title, abstract, "references-count": referencesCount } = data.message;

  return (
    <>
      <h1>{title}</h1>
      <div>
        {abstract && (
          <>
            <h2>Abstract</h2>
            <p>{abstract}</p>
          </>
        )}
        {referencesCount && (
          <>
            <h2>Reference Count</h2>
            <span>{referencesCount}</span>
          </>
        )}
      </div>
    </>
  );
};

export default function App({ doi }: { doi: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <APILayer doi={doi} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
