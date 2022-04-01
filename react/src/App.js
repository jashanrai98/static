import "./App.css"
import { useState, useEffect } from "react";
export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7071/api/toons`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Toons Static Web API</h1>
      <p>This demonstrates fetching data to the server</p>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <table class="wp-table">
      <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Occupation</th>
            </tr>
        {data &&
          data.map(({ id, firstName, lastName, occupation }) => (
        <><tr>
                <td>{id}</td>
                <td>{firstName} {lastName}</td>
                <td>{occupation}</td>
              </tr></>
                  ))}
      </table>
    </div>
  );
}
