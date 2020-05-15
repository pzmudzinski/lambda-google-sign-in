import React, { useState, useEffect } from "react";
import { getSecretData } from "../api";

export const Dashboard = () => {
  const [data, setData] = useState<string[]>();
  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const mySecretTexts = await getSecretData();
        setData(mySecretTexts);
      } catch (e) {
        console.error(e, e.stack);
      }
    };
    fetchSecrets();
  }, []);

  return (
    <main>
      <h1>Hello from dashboard</h1>
      {data && (
        <ul>
          {data.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      )}
    </main>
  );
};
