import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { getLastGameApi } from "../api/game";
import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames";

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastGameApi(15);
      if (size(response) > 0) setGames(response);
      else [];
    })();
  }, []);
  return (
    <BasicLayout className="home">
      {!games && <Loader active>Cargando Juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
