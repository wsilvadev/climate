import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { weatherConditions } from "../../utils/WeatherConditions";
import styles from "./style";

const Weather = ({ weather, temperature, address, onPress }) => {
  if (weather != null) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color },
        ]}
      >
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={weatherConditions[weather].color}
          translucent={true}
        />
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={weatherConditions[weather].icon}
            color={"#fff"}
          />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <Text style={styles.addressText}>{address}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weather].subtitle}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Oh no, something went wrong</Text>
      </View>
    );
  }
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
};
export default Weather;
