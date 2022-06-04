import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Search() {
  const [term, setTerm] = useState("book");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);
  useEffect(() => {
    ///////////////////// possible way 1
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };
    search();

    ///// possible way 2
    // (async()=>{
    //   await axios.get('url');
    // })();

    ///// possible way 3\
    // axios.get('url')
    // .then((res)=>{
    //   console.log(res.data);
    // });
  }, [debouncedTerm]);

  const renderResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="content">
          <div className="header">
            <h2>{result.title}</h2>
          </div>
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui form container">
        <div className="field">
          <label>Enter search term</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list container">{renderResults}</div>
    </div>
  );
}
