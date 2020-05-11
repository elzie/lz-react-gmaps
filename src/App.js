import React from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import * as skoleData from './RandersSkoleData.json';

/* DOCS: https://react-google-maps-api-docs.netlify.app/ */

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedSchool: null,
    };
  }
  containerStyle = {
    width: '90vw',
    height: '90vh',
  };

  center = {
    lat: 56.52,
    lng: 10.04,
  };

  render() {
    const { selectedSchool } = this.state;
    return (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
        <GoogleMap
          mapContainerStyle={this.containerStyle}
          center={this.center}
          zoom={11}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {skoleData.features.map((skole) => (
            <Marker
              key={skole.properties.Name}
              position={{
                lat: skole.geometry.coordinates[1],
                lng: skole.geometry.coordinates[0],
              }}
              onClick={() => {
                this.setState({ selectedSchool: skole });
              }}
            />
          ))}
          {selectedSchool && (
            <InfoWindow
              position={{
                lat: selectedSchool.geometry.coordinates[1],
                lng: selectedSchool.geometry.coordinates[0],
              }}
              onCloseClick={() => {
                this.setState({ selectedSchool: null });
              }}
            >
              <div>
                <h2>{selectedSchool.properties.skole}</h2>
                <p></p>
                <p>Adresse: {selectedSchool.properties.adresse}</p>
                <p>Postnr: {selectedSchool.properties.post_nr}</p>
                <p>By: {selectedSchool.properties.by}</p>
                <p>
                  Web:{' '}
                  <a href={selectedSchool.properties.link}>
                    {selectedSchool.properties.link}
                  </a>
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}
export default App;
