import { Layout } from "components/Layout";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { search } from "services/search";
import { useI18N } from "context/i18n";

export default function Component({ query, results }) {
  const { t } = useI18N();
  return (
    <>
      <Head>
        <title>XKCD - Results for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>
      <Layout>
        <h1>{t("SEARCH_RESULTS_TITLE", results.length, query)}</h1>
        {results.map((result) => {
          return (
            <Link href={`/comic/${result.id}`} key={result.id}>
              <a className="flex flex-row  bg-slate-300 hover:bg-slate-50">
                <Image
                  src={result.img}
                  width="50"
                  height="50"
                  alt={result.alt}
                  className="rounded-full"
                />
                <div>
                  <h2>{result.title}</h2>
                </div>
              </a>
            </Link>
          );
        })}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const { results } = await search({ query: q });

  return {
    props: {
      query: q,
      results,
    },
  };
}
