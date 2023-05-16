import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Svg, Image as ImageSvg } from "react-native-svg";

const locationsOfInterest = [
  {
    title: "Primero",
    location: {
      latitude: -34.59519198769251,
      longitude: -58.43092191964387,
    },
    description: "Mi primer Marker",
  },
  {
    title: "Segundo",
    location: {
      latitude: -34.662483928360295,
      longitude: -58.464171420782804,
    },
    description: "Mi Segundo Marker",
  },
];

interface Prop {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}

export default function App() {
  const [markerRefs, setMarkerRefs] = useState([]);

  const numberOfMarkers = [0].length;

  useEffect(() => {
    setMarkerRefs((markerRefs) =>
      Array(numberOfMarkers)
        .fill()
        .map((_, i) => markerRefs[i] || React.createRef())
    );
  }, [numberOfMarkers]);

  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    latitude: -34.622846283449505,
    longitude: -58.421195391565554,
  });

  const onRegionChange = (region: Prop) => {
    //console.log(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: -34.60053094260835,
          latitudeDelta: 0.37473382005100575,
          longitude: -58.41538690030575,
          longitudeDelta: 0.25581903755664115,
        }}
      >
        {locationsOfInterest.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={item.location}
              title={item.title}
              description={item.description}
            />
          );
        })}
        <Marker
          draggable
          coordinate={draggableMarkerCoord}
          onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
          pinColor="violet"
        />
        {[0].map((item, index) => {
          return (
            <Marker
              key={index}
              pinColor="green"
              ref={markerRefs[index]}
              onPress={() => {
                setTimeout(() => {
                  markerRefs[index].current.hideCallout();
                  markerRefs[index].current.showCallout();
                }, 200);
              }}
              coordinate={{
                latitude: -34.59046502600148,
                longitude: -58.51814953610302,
              }}
            >
              <Callout>
                <Text>Hola</Text>
                <Svg width={240} height={120}>
                  <ImageSvg
                    width={"100%"}
                    height={"100%"}
                    preserveAspectRatio="xMidYMid slice"
                    href={{
                      uri: "https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844226_640.png",
                    }}
                  />
                </Svg>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
