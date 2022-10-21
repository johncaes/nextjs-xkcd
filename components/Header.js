import { Container, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const { locale, locales } = useRouter();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();

    if (!q) return;

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults);
      });
  };

  const restOfLocales = locales.filter((l) => l !== locale);
  // const showLocales = () => {
  //   const restOfLocales = locales.filter((l) => l !== locale);
  //   return {
  //     selectedLocale: locale,
  //     restOfLocales,
  //   };
  // };

  return (
    <header className="flex justify-between mx-auto mt-5 items-start max-w-2xl px-5">
      <div>
        <Link href="/">
          <a className="text-sm">
            <h1 className="font-bold">
              Next<span className="font-light">xkcd</span>
            </h1>
          </a>
        </Link>
      </div>

      <nav>
        <ul className="flex gap-2 items-baseline">
          <li>
            <Link href="/">
              <a className="text-sm">Home</a>
            </Link>
          </li>

          <li>
            <Link href="/" locale={restOfLocales[0]}>
              <a className="text-sm">{restOfLocales[0]}</a>
            </Link>
          </li>

          {/* <li>
            <Link href="/search">
              <a className="text-sm">Search</a>
            </Link>
          </li> */}
          <li className="bg-slate-300 rounded-3xl  relative">
            <input
              type="search"
              ref={searchRef}
              className="bg-slate-100  px-4 py-1 rounded-full   text-slate-500 font-bold "
              placeholder="Search comic"
              onChange={handleChange}
            />

            <div>
              {Boolean(results.length) && (
                <ul className="w-full flex flex-col   bg-slate-100 z-20 p-2 rounded-2xl shadow-slate-300 shadow-xl  text-slate-500 mt-2 absolute">
                  <li className="px-2 py-1 rounded-lg border-b-2  hover:bg-slate-300  cursor-pointer">
                    <Link href={`/search?q=${getValue()}`}>
                      <a className="text-bold">
                        {`See all results for:`}
                        <span className="font-bold"> {getValue()}</span>
                      </a>
                    </Link>
                  </li>
                  {results.map((result) => (
                    <li
                      className="px-2 py-1 rounded-lg  hover:bg-slate-300  cursor-pointer"
                      key={result.id}
                    >
                      <Link href={`/comic/${result.id}`}>
                        <a className="text-slate-500">{result.title}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
