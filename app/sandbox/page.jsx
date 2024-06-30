import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions';
import {
  RulerControl,
  StylesControl,
  CompassControl,
  ZoomControl,
} from 'mapbox-gl-controls';
import 'mapbox-gl-controls/lib/controls.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g';

class App extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-73.985664, 40.748514],
      zoom: 12,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    // Directions
    map.addControl(directions, 'top-left');

    // Ruler
    map.addControl(new RulerControl(), 'top-right');
    map.on('ruler.on', () => console.log('ruler: on'));
    map.on('ruler.off', () => console.log('ruler: off'));

    // Styles
    map.addControl(new StylesControl(), 'bottom-left');

    // Compass
    map.addControl(new CompassControl(), 'top-right');

    // Zoom
    map.addControl(new ZoomControl(), 'top-right');
  }
  render() {
    return <div className="mapWrapper" id="map" />;
  }
}
export default App;
