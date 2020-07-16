import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

import { API_KEY } from "../utils/WeatherApiKey";

import Weather from "../components/Weather";
import Geocoder from "react-native-geocoding";
import styles from "./style";

const UserLocation = () => {
  const [isLoading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [Address, setAddress] = useState([]);
  const [lat, setLatitude] = useState(0);
  const [lng, setLongitude] = useState(0);
  const [hour, setHour] = useState(0);

  useEffect(() => {
    let date = new Date();
    let hours = date.getHours();
    Geocoder.init("YOU API KEY HERE", {
      language: "pt",
    });
    setHour(hours);
    handleFetch();
  }, [handleFetch]);

  const handleFetch = () => {
    setLoading(true);
    fetchWeather();
    fetchGeolocation();
    fetchUserLocation();
    return setLoading(false);
  };

  const fetchGeolocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setError(
        "Localização não permitida, clique aqui para permitir novamente!"
      );
      return setLoading(true);
    } else {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setError(
            "Erro ao obter condições meteorológicas, ative sua localização ou verifique se há conexão com a internet e depois clique aqui!"
          );
          setLoading(true);
        }
      );
      setLoading(false);
    }
  };

  const fetchUserLocation = async () => {
    await Geocoder.from(lat, lng)
      .then((json) => {
        const address = json.results[0].formatted_address;
        setAddress(address);
      })
      .catch((error) => {
        setLoading(true);
        setError(
          "Error ao tentar buscar localização na api Geocoding mas é só clicar aqui que pode ser resolvido"
        );
      });
  };

  const fetchWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&cnt=9&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.weather[0].main === "Clear") {
          if (hour < 18) {
            setWeather("ClearDay");
          } else {
            setWeather("ClearNight");
          }
        } else {
          setWeather(json.weather[0].main);
        }
        setTemperature(json.main.temp);
      });
  };

  let textLoading = "Buscando ..";
  if (error) {
    textLoading = error;
  }

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <Weather
          weather={weatherCondition}
          temperature={temperature}
          address={Address}
          onPress={handleFetch}
        />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleFetch}>
            <Text style={styles.text}>{textLoading}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UserLocation;
