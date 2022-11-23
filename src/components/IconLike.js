import React from "react";

import Icon_ION from "react-native-vector-icons/Ionicons";

export default function IconLike({ onPress }) {
  const [testeLike, setTesteLike] = React.useState(false);
  return (
    <Icon_ION
      name={testeLike ? "ios-heart" : "ios-heart-outline"}
      size={25}
      color="red"
      onPress={() => {
        setTesteLike(!testeLike);
        onPress();
      }}
    />
  );
}
