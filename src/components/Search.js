import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Search() {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);
  useEffect(() => {
    ///////////////////// possible way 1
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };
    if (term && !results.length) {
      if (term) {
        search();
      }
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    ///// possible way 2
    // (async()=>{
    //   await axios.get('url');
    // })();

    ///// possible way 3\
    // axios.get('url')
    // .then((res)=>{
    //   console.log(res.data);
    // });
  }, [term, results.length]);

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
