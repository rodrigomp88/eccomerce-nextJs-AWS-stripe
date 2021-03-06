import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressList() {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay ninguna dirección</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => {
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address address={address} />
            </Grid.Column>;
          })}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  const { address } = props;
  return (
    <div class="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
    </div>
  );
}
